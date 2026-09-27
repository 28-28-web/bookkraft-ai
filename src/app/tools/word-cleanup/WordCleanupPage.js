'use client';

import { useState, useRef, useEffect } from 'react';
import ToolResultsCTA from '@/components/ToolResultsCTA';
import ReadinessReportCTA from '@/components/ReadinessReportCTA';
import { track } from '@/lib/analytics';
import { scanDocx } from '@/lib/wordChecks';

const TOOL = 'word-cleanup';

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

const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) window.gtag(...args);
};

const fileSizeRange = (bytes) => {
  if (!bytes) return 'unknown';
  if (bytes < 1024 * 1024) return '0-1MB';
  if (bytes < 5 * 1024 * 1024) return '1-5MB';
  if (bytes < 10 * 1024 * 1024) return '5-10MB';
  return '10MB+';
};

export default function WordCleanupPage({ children, faqItems = [] }) {
  const [fileName, setFileName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    gtag('event', 'tool_view', { tool_name: 'word_cleanup' });
  }, []);

  useEffect(() => {
    if (result) {
      track('report_completed', {
        tool: TOOL,
        status: result.overallStatus,
        issue_count: result.checks.filter((c) => c.status !== 'pass').length,
      });
      gtag('event', 'result_view', { tool_name: 'word_cleanup', overall_status: result.overallStatus });
    }
  }, [result]);

  const handleFile = async (file) => {
    if (!file) return;

    track('tool_start', { tool: TOOL, file_size_range: fileSizeRange(file.size) });
    gtag('event', 'tool_start', { tool_name: 'word_cleanup' });
    gtag('event', 'file_upload_start', { tool_name: 'word_cleanup', file_size_range: fileSizeRange(file.size) });

    if (!file.name.toLowerCase().endsWith('.docx')) {
      const ext = file.name.split('.').pop().toLowerCase();
      setError(`"${ext}" files aren't supported here. Please upload a .docx file — re-save from Word or Google Docs if needed.`);
      gtag('event', 'file_upload_failed', { tool_name: 'word_cleanup', error_type: 'invalid_format' });
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);
    setFileName(file.name);

    try {
      const scan = await scanDocx(file);
      setResult(scan);
      track('file_processed', { tool: TOOL, status: scan.overallStatus, issue_count: scan.checks.filter((c) => c.status !== 'pass').length });
      gtag('event', 'file_upload_success', { tool_name: 'word_cleanup' });
      gtag('event', 'tool_complete', { tool_name: 'word_cleanup', overall_status: scan.overallStatus });
    } catch (err) {
      const msg = err.message?.includes('word/document.xml')
        ? "We couldn't read this file. Make sure it's a valid .docx — older .doc files must be re-saved first."
        : "We couldn't parse this file — it may be corrupted. Try re-saving as .docx and uploading again.";
      setError(msg);
      console.error('word-cleanup scan error:', err);
      gtag('event', 'file_upload_failed', { tool_name: 'word_cleanup', error_type: 'parse_error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 20px 0' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,40px)', marginBottom: 12 }}>
          Reformat Your Word Manuscript — Free Cleanup Checker
        </h1>
        <p style={{ fontSize: 17, color: 'var(--text-secondary, #666)', marginBottom: 32 }}>
          When you reformat a Word document for Kindle or EPUB, the hidden issues — double spaces between sentences, straight quotes, stacked blank paragraphs, stray bold or italic runs — follow the file unless you catch them first. Upload your .docx and this Word Manuscript Cleanup Checker flags every instance in seconds, so you can fix them before converting. Free, no signup, runs entirely in your browser.
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
          <div style={{ marginTop: 20, padding: '14px 16px', background: 'rgba(255,107,91,0.08)', border: '1px solid rgba(255,107,91,0.3)', borderRadius: 8 }}>
            <p style={{ color: '#FF6B5B', fontSize: 14, margin: '0 0 10px' }}>{error}</p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                style={{ fontSize: 13, fontWeight: 600, color: '#C9933A', background: 'none', border: '1px solid #C9933A', borderRadius: 5, padding: '4px 12px', cursor: 'pointer' }}
                onClick={() => { setError(''); inputRef.current?.click(); }}
              >
                Try Again
              </button>
              <a href="#faq" style={{ fontSize: 13, color: '#888', textDecoration: 'underline' }}>See supported file types</a>
            </div>
          </div>
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

            <ReadinessReportCTA sourceTool="word-cleanup" />

            <ToolResultsCTA
              toolSlug="word-cleanup"
              subjectNoun="manuscript"
              issueCount={result.checks.filter((c) => c.status !== 'pass').length}
              fixTool={{ slug: 'manuscript-cleanup', label: 'AI Manuscript Cleanup' }}
            />
          </div>
        )}
      </div>

      {children}

      {faqItems.length > 0 && (
        <div id="faq" style={{ maxWidth: 800, margin: '2rem auto 0', padding: '0 1rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--ink)' }}>
            Common questions
          </h2>
          <div role="list">
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`faq-item${isOpen ? ' open' : ''}`} role="listitem">
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    id={`wc-faq-btn-${i}`}
                    aria-controls={`wc-faq-ans-${i}`}
                  >
                    {item.name}
                    <span className="faq-chevron" aria-hidden="true">▾</span>
                  </button>
                  <div
                    id={`wc-faq-ans-${i}`}
                    className="faq-answer"
                    role="region"
                    aria-labelledby={`wc-faq-btn-${i}`}
                  >
                    {item.acceptedAnswer.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
