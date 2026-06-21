'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const faqs = [
  {
    q: 'What size should my KDP ebook cover be?',
    a: 'Amazon recommends 2560 x 1600 pixels for Kindle covers, a 1.6:1 height-to-width ratio. The minimum accepted is 1000 pixels on the longest side, but anything below the recommended size will look soft on high-resolution screens.',
  },
  {
    q: 'Does KDP accept PNG covers?',
    a: 'No. KDP requires JPEG format for ebook covers. PNG files are not accepted, even if the dimensions are correct.',
  },
  {
    q: 'What size does Apple Books require?',
    a: 'Apple Books requires a minimum of 1400 pixels on the shortest side of your cover image.',
  },
  {
    q: 'Does this tool upload my cover anywhere?',
    a: 'No. The image is read and measured entirely in your browser. Nothing is uploaded to a server.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const KDP_MIN_SHORT_SIDE = 500;
const KDP_MAX_FILE_SIZE_MB = 5;
const KDP_RECOMMENDED_LONG_SIDE = 2500;
const KDP_RATIO = 1.6;
const KDP_RATIO_TOLERANCE = 0.08;
const APPLE_MIN_SHORT_SIDE = 1400;

function checkKDP(width, height, fileType, fileSizeMB) {
  const longSide = Math.max(width, height);
  const shortSide = Math.min(width, height);
  const ratio = longSide / shortSide;
  const isPortrait = height >= width;

  const checks = [];

  checks.push({
    label: 'Format',
    pass: fileType === 'image/jpeg' || fileType === 'image/jpg',
    detail: fileType === 'image/jpeg' || fileType === 'image/jpg'
      ? 'JPEG — accepted'
      : `${fileType.replace('image/', '').toUpperCase()} — KDP requires JPEG, not PNG`,
  });

  checks.push({
    label: 'Orientation',
    pass: isPortrait,
    detail: isPortrait ? 'Portrait — correct' : 'Landscape or square — covers must be portrait',
  });

  checks.push({
    label: 'Minimum size',
    pass: shortSide >= KDP_MIN_SHORT_SIDE,
    detail: `${shortSide}px shortest side — minimum is ${KDP_MIN_SHORT_SIDE}px (covers below this won't display on Amazon)`,
  });

  checks.push({
    label: 'Recommended size',
    pass: longSide >= KDP_RECOMMENDED_LONG_SIDE,
    detail: longSide >= KDP_RECOMMENDED_LONG_SIDE
      ? `${longSide}px — meets the ${KDP_RECOMMENDED_LONG_SIDE}px recommendation`
      : `${longSide}px — below the ${KDP_RECOMMENDED_LONG_SIDE}px recommendation, may look soft on high-res screens`,
    warning: longSide < KDP_RECOMMENDED_LONG_SIDE && shortSide >= KDP_MIN_SHORT_SIDE,
  });
  checks.push({
    label: 'Aspect ratio',
    pass: Math.abs(ratio - KDP_RATIO) <= KDP_RATIO_TOLERANCE,
    detail: `${ratio.toFixed(2)}:1 — ideal is ${KDP_RATIO}:1`,
  });

  if (fileSizeMB !== undefined) {
    checks.push({
      label: 'File size',
      pass: fileSizeMB <= KDP_MAX_FILE_SIZE_MB,
      detail: `${fileSizeMB.toFixed(2)}MB — KDP limit is ${KDP_MAX_FILE_SIZE_MB}MB`,
    });
  }

  const hardFails = checks.filter(c => !c.pass && !c.warning).length;
  return { checks, status: hardFails === 0 ? 'pass' : 'fail' };
}

function checkApple(width, height) {
  const shortSide = Math.min(width, height);
  const checks = [{
    label: 'Minimum width',
    pass: shortSide >= APPLE_MIN_SHORT_SIDE,
    detail: `${shortSide}px shortest side — minimum is ${APPLE_MIN_SHORT_SIDE}px`,
  }];
  return { checks, status: checks[0].pass ? 'pass' : 'fail' };
}

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
      fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600,
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
        <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
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
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG or PNG).');
      return;
    }
    setError('');
    if (file.size > 20 * 1024 * 1024) {
      setError('File too large to check — try an image under 20MB.');
      return;
    }
    setFileType(file.type);
    setFileName(file.name);
    setFileSizeMB(file.size / (1024 * 1024));
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      setDims({ width: img.naturalWidth, height: img.naturalHeight });
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
              fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px,5vw,48px)',
              fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 14,
            }}>
              Cover Dimension Checker
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
              Upload your cover. Check it against Amazon KDP and Apple Books requirements before you upload it anywhere.
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
                    fontFamily: "'JetBrains Mono', monospace", color: '#C9933A',
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
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: '#fff', fontWeight: 700, marginBottom: 14 }}>
              KDP and Apple Books cover requirements
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
              Amazon recommends 2560 x 1600 pixels for Kindle ebook covers, a 1.6:1 ratio, saved as JPEG. The minimum accepted size is 1000 pixels on the longest side, but covers below 2500px on the longest side often look soft on high-resolution Kindle devices. Apple Books requires a minimum of 1400 pixels on the shortest side. This tool checks your cover against both sets of requirements before you upload it anywhere, entirely in your browser.
            </p>

            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: '#fff', fontWeight: 700, marginBottom: 14 }}>
              Frequently asked questions
            </h2>
            {faqs.map((f, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{f.q}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>{f.a}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
