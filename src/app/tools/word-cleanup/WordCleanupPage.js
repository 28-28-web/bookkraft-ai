'use client';

import { useState, useRef } from 'react';
import JSZip from 'jszip';
import ToolResultsCTA from '@/components/ToolResultsCTA';

const faqs = [
  {
    q: 'Does this tool edit or fix my manuscript?',
    a: 'No — this is a read-only scanner. It reports formatting issues (double spaces, straight quotes, blank paragraphs, stray bold/italic) so you can decide what to fix. Automatic cleanup is coming in a future update.',
  },
  {
    q: 'What file types are supported?',
    a: 'Only .docx (Microsoft Word format) is supported right now. Older .doc files and Google Docs exports must be re-saved as .docx first.',
  },
  {
    q: 'Does this tool upload my manuscript anywhere?',
    a: 'No. The file is read and scanned entirely in your browser using JSZip. Nothing is uploaded to a server.',
  },
  {
    q: 'Why do straight quotes matter?',
    a: 'Most ebook and print formatters expect curly (typographic) quotes. Straight quotes left over from plain-text drafting or copy-pasting can look unprofessional and trip up some conversion tools.',
  },
];


function severityForCount(count, warnAt, failAt) {
  if (count >= failAt) return 'fail';
  if (count >= warnAt) return 'warning';
  return 'pass';
}

async function scanDocx(file) {
  const zip = await JSZip.loadAsync(file);
  const docXml = await zip.file('word/document.xml')?.async('text');
  if (!docXml) throw new Error('Could not find word/document.xml — is this a valid .docx file?');

  const parser = new DOMParser();
  const doc = parser.parseFromString(docXml, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('Could not parse this .docx file — it may be corrupted.');

  const paragraphs = Array.from(doc.getElementsByTagName('w:p'));

  let doubleSpaces = 0;
  let trailingSpaces = 0;
  let doubleHyphens = 0;
  let straightQuotes = 0;
  let directBoldItalic = 0;
  let blankParaCount = 0;
  let maxConsecutiveBlank = 0;
  let runningBlank = 0;
  let totalWords = 0;

  for (const p of paragraphs) {
    const textNodes = Array.from(p.getElementsByTagName('w:t'));
    const paraText = textNodes.map((t) => t.textContent).join('');

    if (paraText.trim() === '') {
      blankParaCount += 1;
      runningBlank += 1;
      maxConsecutiveBlank = Math.max(maxConsecutiveBlank, runningBlank);
    } else {
      runningBlank = 0;
    }

    totalWords += paraText.split(/\s+/).filter(Boolean).length;
    doubleSpaces += (paraText.match(/ {2,}/g) || []).length;
    doubleHyphens += (paraText.match(/(?<!-)--(?!-)/g) || []).length;
    straightQuotes += (paraText.match(/["']/g) || []).length;

    if (textNodes.length > 0) {
      const lastRunText = textNodes[textNodes.length - 1].textContent;
      if (/ $/.test(lastRunText) && paraText.trim() !== '') trailingSpaces += 1;
    }

    const pStyleEl = p.getElementsByTagName('w:pStyle')[0];
    const styleVal = pStyleEl?.getAttribute('w:val') || '';
    const isHeading = /^Heading/i.test(styleVal) || /^Title/i.test(styleVal);

    if (!isHeading) {
      const runs = Array.from(p.getElementsByTagName('w:r'));
      for (const r of runs) {
        const rPr = r.getElementsByTagName('w:rPr')[0];
        if (!rPr) continue;
        const hasBold = rPr.getElementsByTagName('w:b').length > 0;
        const hasItalic = rPr.getElementsByTagName('w:i').length > 0;
        const runText = Array.from(r.getElementsByTagName('w:t')).map((t) => t.textContent).join('');
        if ((hasBold || hasItalic) && runText.trim() !== '') directBoldItalic += 1;
      }
    }
  }

  const checks = [
    {
      label: 'Double spaces',
      count: doubleSpaces,
      status: severityForCount(doubleSpaces, 1, 15),
      detail: doubleSpaces === 0
        ? 'No double spaces found.'
        : `${doubleSpaces} instance${doubleSpaces === 1 ? '' : 's'} of two or more consecutive spaces.`,
    },
    {
      label: 'Blank paragraphs',
      count: blankParaCount,
      status: severityForCount(maxConsecutiveBlank, 2, 4),
      detail: maxConsecutiveBlank <= 1
        ? `${blankParaCount} blank paragraph${blankParaCount === 1 ? '' : 's'} total — no stacked runs.`
        : `${blankParaCount} blank paragraphs total, up to ${maxConsecutiveBlank} stacked in a row.`,
    },
    {
      label: 'Trailing spaces',
      count: trailingSpaces,
      status: severityForCount(trailingSpaces, 1, 15),
      detail: trailingSpaces === 0
        ? 'No paragraphs end with a trailing space.'
        : `${trailingSpaces} paragraph${trailingSpaces === 1 ? '' : 's'} end with a trailing space.`,
    },
    {
      label: 'Double hyphens (--)',
      count: doubleHyphens,
      status: severityForCount(doubleHyphens, 1, 10),
      detail: doubleHyphens === 0
        ? 'No "--" found — em dashes look consistent.'
        : `${doubleHyphens} instance${doubleHyphens === 1 ? '' : 's'} of "--" that may need to be an em dash (—).`,
    },
    {
      label: 'Straight quotes',
      count: straightQuotes,
      status: severityForCount(straightQuotes, 1, 20),
      detail: straightQuotes === 0
        ? 'No straight quote marks found.'
        : `${straightQuotes} straight quote mark${straightQuotes === 1 ? '' : 's'} (" or ') — most formatters expect curly quotes.`,
    },
    {
      label: 'Direct bold/italic formatting',
      count: directBoldItalic,
      status: severityForCount(directBoldItalic, 1, 25),
      detail: directBoldItalic === 0
        ? 'No manually-applied bold or italic runs outside heading styles.'
        : `${directBoldItalic} run${directBoldItalic === 1 ? '' : 's'} of manually-applied bold/italic — can cause inconsistent styling on conversion.`,
    },
  ];

  const failCount = checks.filter((c) => c.status === 'fail').length;
  const warnCount = checks.filter((c) => c.status === 'warning').length;
  const overallStatus = failCount > 0 ? 'fail' : warnCount > 0 ? 'warning' : 'pass';

  return {
    checks,
    overallStatus,
    paragraphCount: paragraphs.length,
    wordCount: totalWords,
  };
}

function StatusPill({ status }) {
  const styles = {
    pass: { bg: 'rgba(61,220,151,0.12)', border: 'rgba(61,220,151,0.4)', color: '#3DDC97', label: 'PASS' },
    warning: { bg: 'rgba(255,193,7,0.12)', border: 'rgba(255,193,7,0.4)', color: '#D4A017', label: 'WARNING' },
    fail: { bg: 'rgba(255,107,91,0.12)', border: 'rgba(255,107,91,0.4)', color: '#FF6B5B', label: 'FAIL' },
  };
  const s = styles[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600,
      padding: '4px 10px', borderRadius: 6, letterSpacing: '0.05em',
    }}>
      {s.label}
    </span>
  );
}

export default function WordCleanupPage() {
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.docx')) {
      setError('Please upload a .docx file. Older .doc files are not supported.');
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);
    setFileName(file.name);

    try {
      const scan = await scanDocx(file);
      setResult(scan);
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'word_cleanup_scan', {
          event_category: 'tools',
          event_label: scan.overallStatus,
        });
      }
    } catch (err) {
      setError(err.message || 'Something went wrong reading this file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 20px 0' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,40px)', marginBottom: 12 }}>
          Word Manuscript Cleanup Checker
        </h1>
        <p style={{ fontSize: 17, color: 'var(--text-secondary, #666)', marginBottom: 32 }}>
          Upload your .docx manuscript to scan for double spaces, straight quotes, stacked blank paragraphs, and stray formatting — free, no signup, runs entirely in your browser.
        </p>

        <div
          className={`drop-zone${dragOver ? ' drop-zone-active' : ''}`}
          style={{
            border: `2px dashed ${dragOver ? '#3DDC97' : '#ccc'}`,
            borderRadius: 12, padding: '48px 24px', textAlign: 'center',
            cursor: 'pointer', transition: 'border-color 0.15s ease',
          }}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
        >
          <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
            {fileName ? fileName : 'Drop your .docx file here, or click to browse'}
          </p>
          <p style={{ fontSize: 13, color: '#888' }}>.docx only — processed locally, never uploaded</p>
          <input
            id="word-cleanup-file-input"
            ref={inputRef}
            type="file"
            accept=".docx"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        {loading && (
          <p style={{ marginTop: 20, fontSize: 14, color: '#888' }}>Scanning manuscript…</p>
        )}

        {error && (
          <p style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(255,107,91,0.08)', border: '1px solid rgba(255,107,91,0.3)', borderRadius: 8, color: '#FF6B5B', fontSize: 14 }}>
            {error}
          </p>
        )}

        {result && (
          <div style={{ marginTop: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 20, marginBottom: 4 }}>Scan results</h2>
                <p style={{ fontSize: 13, color: '#888' }}>
                  {result.paragraphCount} paragraphs · {result.wordCount.toLocaleString()} words
                </p>
              </div>
              <StatusPill status={result.overallStatus} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {result.checks.map((c) => (
                <div key={c.label} style={{
                  border: '1px solid #e5e5e5', borderRadius: 10, padding: '14px 18px',
                  display: 'flex', flexDirection: 'column', gap: 6,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{c.label}</span>
                    <StatusPill status={c.status} />
                  </div>
                  <p style={{ fontSize: 14, color: '#666', margin: 0 }}>{c.detail}</p>
                </div>
              ))}
            </div>

            <p style={{ marginTop: 20, fontSize: 13, color: '#888' }}>
              This scan reports issues only — it does not modify your file.
            </p>

            <ToolResultsCTA
              toolSlug="word-cleanup"
              subjectNoun="manuscript"
              issueCount={result.checks.filter((c) => c.status !== 'pass').length}
              fixTool={{ slug: 'manuscript-cleanup', label: 'AI Manuscript Cleanup' }}
            />
          </div>
        )}
      </div>

      <div className="seo-content" style={{ maxWidth: 800, margin: '3rem auto', padding: '0 1rem' }}>
        <h2>Free Word Manuscript Cleanup Checker</h2>
        <p>Before you send a manuscript to a formatter, editor, or KDP, run it through a quick technical scan. This tool reads your .docx file directly in your browser and reports formatting issues that are easy to miss after months of writing and revising — double spaces, straight quotes, stacked blank paragraphs, and manually-applied bold or italic formatting.</p>

        <h2>What This Tool Checks</h2>
        <p>Six checks run automatically: double spaces, blank paragraph stacking, trailing spaces at the end of paragraphs, double hyphens that should likely be em dashes, straight quote marks instead of curly quotes, and text runs with bold or italic applied directly rather than through a heading style.</p>

        <h2>Read-Only, Runs Entirely in Your Browser</h2>
        <p>Your file never leaves your device. It's parsed with JavaScript in your browser tab and discarded when you close or refresh the page. This is a report-only tool for now — it flags issues but doesn't rewrite your file.</p>

        <h2>Who This Is For</h2>
        <p>Authors doing a final technical check before formatting or upload. Freelance editors validating a manuscript before handing it back to a client. Anyone who wants a fast, free second opinion on a .docx file before it goes further down the pipeline.</p>

        <h2>Frequently Asked Questions</h2>
        {faqs.map((f) => (
          <div key={f.q} style={{ marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, marginBottom: 4 }}>{f.q}</h3>
            <p style={{ margin: 0 }}>{f.a}</p>
          </div>
        ))}
    </div>
    </>
  );
}
