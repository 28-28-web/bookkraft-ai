'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ToolResultsCTA from '@/components/ToolResultsCTA';
import ReadinessReportCTA from '@/components/ReadinessReportCTA';
import StickyUpgradeBanner from '@/components/StickyUpgradeBanner';
import { track } from '@/lib/analytics';
import { checkKDP, checkApple } from '@/lib/coverChecks';

const TOOL = 'cover-checker';

const faqs = [
  {
    q: 'What size should my KDP ebook cover be?',
    a: 'KDP\'s eBook cover requirements give ideal dimensions of 2,560 pixels tall × 1,600 pixels wide, an ideal height-to-width ratio of at least 1.6:1, and a minimum of 1,000 pixels tall × 625 pixels wide, as a TIFF or JPEG file. Anything below the ideal size can look soft on high-resolution screens.',
  },
  {
    q: 'Does KDP accept PNG covers?',
    a: 'KDP\'s eBook cover requirements list TIFF or JPEG files. PNG is not on that list, so export your cover as a JPEG or TIFF before uploading, even if the dimensions are correct.',
  },
  {
    q: 'What size does Apple Books require?',
    a: 'Apple Books requires a minimum of 1400 pixels on the shortest side of your cover image.',
  },
  {
    q: 'Does this tool upload my cover anywhere?',
    a: 'No. The image is read and measured entirely in your browser. Nothing is uploaded to a server.',
  },
  {
    q: 'What is the maximum file size KDP accepts for covers?',
    a: 'KDP\'s eBook cover requirements say the cover image must be less than 50MB. In practice, a JPEG cover at 2560 × 1600px saved at high quality is typically 2–8 MB — well within the limit. If your file is over 50 MB, re-export at a lower JPEG quality setting (85–90 is sufficient for print-level sharpness).',
  },
  {
    q: 'Does my cover need to be RGB or can it be CMYK?',
    a: 'RGB (specifically sRGB) is required for all ebook covers on KDP and Apple Books. CMYK is a print color space — it will cause colors to display incorrectly on screen and may cause your cover to be rejected. If you designed in CMYK for a print edition, convert to sRGB before exporting the ebook cover.',
  },
  {
    q: 'My aspect ratio flagged a warning — how close does the ratio need to be?',
    a: "This tool uses a tolerance of ±0.08 around KDP's 1.6:1 recommended ratio (height ÷ width). A ratio between 1.52 and 1.68 passes. Outside that range the tool flags a warning, but KDP will still accept the cover as long as it meets minimum dimensions — it just may not display optimally in search results and on product pages where covers are shown at a fixed ratio.",
  },
  {
    q: 'Is the cover size the same for KDP print books?',
    a: 'No. KDP print covers (for paperback and hardcover) have completely different requirements — the cover file must include front, spine, and back at a print-ready resolution (300 DPI), with exact dimensions calculated from your trim size and page count. KDP provides a cover template generator for print. This tool checks ebook covers only.',
  },
];


function StatusPill({ status }) {
  const styles = {
    pass: { bg: 'rgba(61,220,151,0.12)', border: 'rgba(61,220,151,0.4)', color: '#3DDC97', label: 'PASS' },
    fail: { bg: 'rgba(255,107,91,0.12)', border: 'rgba(255,107,91,0.4)', color: '#FF6B5B', label: 'FAIL' },
  };
  const s = styles[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      fontFamily: "var(--font-jetbrains), monospace", fontSize: 12, fontWeight: 600,
      padding: '4px 10px', borderRadius: 6, letterSpacing: '0.05em',
    }}>
      {s.label}
    </span>
  );
}

function CheckRow({ check }) {
  const color = check.warning ? '#C9933A' : check.pass ? '#3DDC97' : '#FF6B5B';
  const icon = check.warning ? '!' : check.pass ? '\u2713' : '\u2715';
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
        background: `${color}22`, color, fontSize: 11, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2,
      }}>{icon}</span>
      <div>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{check.label}</div>
        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, fontFamily: "var(--font-jetbrains), monospace", marginTop: 2 }}>
          {check.detail}
        </div>
      </div>
    </div>
  );
}
export default function CoverCheckerPage() {
  const [image, setImage] = useState(null);
  const [dims, setDims] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSizeMB, setFileSizeMB] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_view', { tool_name: 'cover_checker' });
    }
  }, []);

  useEffect(() => {
    if (dims) track('report_completed', { tool: TOOL });
  }, [dims]);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG or PNG).');
      return;
    }
    setError('');
    if (file.size > 55 * 1024 * 1024) {
      setError('File too large to check — try an image under 55MB.');
      return;
    }
    track('tool_start', { tool: TOOL });
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_start', { tool_name: 'cover_checker' });
    }
    setFileType(file.type);
    setFileName(file.name);
    setFileSizeMB(file.size / (1024 * 1024));
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      const fsMB = file.size / (1024 * 1024);
      const kdp = checkKDP(w, h, file.type, fsMB);
      const apple = checkApple(w, h);
      const issueCount = [...kdp.checks, ...apple.checks].filter((c) => !c.pass).length;
      const status = kdp.status === 'pass' && apple.status === 'pass' ? 'pass' : 'fail';
      track('file_processed', { tool: TOOL, status, issue_count: issueCount });
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'result_view', { tool_name: 'cover_checker', status });
        window.gtag('event', 'tool_complete', { tool_name: 'cover_checker', issue_count: issueCount });
      }
      setDims({ width: w, height: h });
      setImage(url);
    };
    img.onerror = () => setError('Could not read this image file.');
    img.src = url;
  };

  const reset = () => {
    setImage(null);
    setDims(null);
    setFileType(null);
    setFileName('');
    setFileSizeMB(null);
    setError('');
  };

  const kdpResult = dims ? checkKDP(dims.width, dims.height, fileType, fileSizeMB) : null;
  const appleResult = dims ? checkApple(dims.width, dims.height) : null;

  return (
    <>
    <main style={{ background: '#12141C', minHeight: '100vh', padding: '64px 20px 80px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#C9933A',
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14,
            }}>
              Free Tool — No Signup
            </span>
            <h1 style={{
              fontFamily: "var(--font-playfair), serif", fontSize: 'clamp(32px,5vw,48px)',
              fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 14,
            }}>
              Book Cover Dimensions Checker — KDP & Apple Books
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
              The dimensions of a book cover determine whether Amazon KDP or Apple Books will accept your file. Standard Kindle book cover dimensions recommend at least 2,560 pixels on the long side, a 1.6:1 portrait ratio — plus JPEG format and file size under 50MB. Upload your cover and this Cover Checker measures all of it instantly, in your browser. No upload to a server, no signup.
            </p>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${dragOver ? 'rgba(201,147,58,0.6)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 20,
              padding: image ? 24 : 48,
              textAlign: 'center',
              transition: 'border-color 0.2s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {!image ? (
              <>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%', margin: '0 auto 20px',
                  background: 'rgba(201,147,58,0.12)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 24,
                }}>
                  🖼️
                </div>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
                  Drop your cover image here
                </p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, marginBottom: 20 }}>
                  JPEG or PNG · measured instantly in your browser
                </p>
                <button
                  onClick={() => inputRef.current?.click()}
                  style={{
                    background: '#C9933A', color: '#12141C', border: 'none',
                    padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  Choose File
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
                {error && <p style={{ color: '#FF6B5B', fontSize: 13, marginTop: 16 }}>{error}</p>}
              </>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,160px) 1fr', gap: 24, alignItems: 'center', textAlign: 'left' }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={image}
                    alt="Uploaded cover"
                    style={{
                      width: '100%', borderRadius: 8, display: 'block',
                      boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.4)',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: 8,
                    backgroundImage: 'linear-gradient(rgba(201,147,58,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(201,147,58,0.25) 1px, transparent 1px)',
                    backgroundSize: '20% 20%',
                    pointerEvents: 'none',
                    opacity: 0.5,
                  }} />
                </div>
                <div>
                  <p style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginBottom: 4, wordBreak: 'break-all' }}>{fileName}</p>
                  <p style={{
                    fontFamily: "var(--font-jetbrains), monospace", color: '#C9933A',
                    fontSize: 18, fontWeight: 600, marginBottom: 4,
                  }}>
                    {dims.width} × {dims.height}px
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginBottom: 16 }}>
                    {(Math.max(dims.width, dims.height) / Math.min(dims.width, dims.height)).toFixed(2)}:1 ratio · {fileType?.replace('image/', '').toUpperCase()}
                  </p>
                  <button
                    onClick={reset}
                    style={{
                      background: 'transparent', color: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px',
                      borderRadius: 6, fontSize: 12, cursor: 'pointer',
                    }}
                  >
                    Try another image
                  </button>
                </div>
              </div>
            )}
          </div>

          {dims && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginTop: 24 }}>
              <div style={{
                background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 22,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Amazon KDP</span>
                  <StatusPill status={kdpResult.status} />
                </div>
                {kdpResult.checks.map((c, i) => <CheckRow key={i} check={c} />)}
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 22,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>Apple Books</span>
                  <StatusPill status={appleResult.status} />
                </div>
                {appleResult.checks.map((c, i) => <CheckRow key={i} check={c} />)}
              </div>
            </div>
          )}

          {dims && <ReadinessReportCTA sourceTool="cover-checker" />}

          {dims && (
            <ToolResultsCTA
              toolSlug="cover-checker"
              subjectNoun="cover"
              issueCount={[...kdpResult.checks, ...appleResult.checks].filter((c) => !c.pass).length}
            />
          )}

          {dims && (
            <div style={{
              marginTop: 24, padding: 24, borderRadius: 16, textAlign: 'center',
              background: 'rgba(201,147,58,0.08)', border: '1px solid rgba(201,147,58,0.25)',
            }}>
              <p style={{ color: '#fff', fontSize: 15, marginBottom: 14 }}>
                Cover passed? Validate the rest of your EPUB file before you upload.
              </p>
              <Link href="/tools/epub-validator" style={{
                display: 'inline-block', background: '#C9933A', color: '#12141C',
                padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none',
              }}>
                Validate EPUB Free →
              </Link>
            </div>
          )}

          <div style={{ marginTop: 64, color: 'rgba(255,255,255,0.7)' }}>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 24, color: '#fff', fontWeight: 700, marginBottom: 14 }}>
              KDP and Apple Books cover requirements
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              KDP&apos;s{' '}
              <a href="https://kdp.amazon.com/en_US/help/topic/G200645690" target="_blank" rel="noopener nofollow" style={{ color: '#C9933A', textDecoration: 'underline' }}>eBook cover requirements</a>{' '}
              give ideal dimensions of 2,560 pixels tall × 1,600 pixels wide, an ideal height-to-width ratio of at least 1.6:1, and a minimum of 1,000 pixels tall × 625 pixels wide. The file must be a TIFF or JPEG under 50MB, in RGB color. Covers below 2560px on the longest side often look soft on high-resolution Kindle devices. Apple Books requires a minimum of 1400 pixels on the shortest side. This tool checks your cover against both sets of requirements before you upload it anywhere, entirely in your browser.
            </p>

            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 24, color: '#fff', fontWeight: 700, marginBottom: 14 }}>
              Who this cover checker is for
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              Self-publishing authors checking a cover meets KDP or Apple Books pixel, ratio, and format rules before upload. Anyone whose cover was rejected for being too small or the wrong dimensions. Free, in your browser, no account. For the other reasons covers fail, see the{' '}
              <Link href="/mistakes/ebook-cover-mistakes" style={{ color: '#C9933A', textDecoration: 'underline' }}>
                ebook cover mistakes that get files rejected
              </Link>.
            </p>

            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 24, color: '#fff', fontWeight: 700, marginBottom: 14 }}>
              Frequently asked questions
            </h2>
            <div role="list">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`faq-item${isOpen ? ' open' : ''}`}
                    role="listitem"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <button
                      className="faq-question"
                      style={{ color: '#fff' }}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      id={`cc-faq-btn-${i}`}
                      aria-controls={`cc-faq-ans-${i}`}
                    >
                      {f.q}
                      <span
                        className="faq-chevron"
                        aria-hidden="true"
                        style={{
                          background: isOpen ? '#C9933A' : 'rgba(255,255,255,0.08)',
                          borderColor: isOpen ? '#C9933A' : 'rgba(255,255,255,0.15)',
                          color: isOpen ? '#12141C' : 'rgba(255,255,255,0.55)',
                        }}
                      >▾</span>
                    </button>
                    <div
                      id={`cc-faq-ans-${i}`}
                      className="faq-answer"
                      role="region"
                      aria-labelledby={`cc-faq-btn-${i}`}
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {f.a}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <h2 style={{ fontSize: 16, color: '#fff', fontWeight: 600, marginBottom: 10 }}>Related tools</h2>
            <Link href="/tools/kdp-keyword-finder" style={{ color: '#C9933A', fontSize: 14, textDecoration: 'underline' }}>
              KDP Keyword Finder tool
            </Link>
          </div>

        </div>
    </main>
    <StickyUpgradeBanner />
    </>
  );
}
