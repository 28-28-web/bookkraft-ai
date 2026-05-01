'use client';
import { useState } from 'react';
import ScoreCard from './ScoreCard';
import UpsellBanner from '@/components/UpsellBanner';
import StickyUpgradeBanner from '@/components/StickyUpgradeBanner';

export default function PublishingScoreClient() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // step: 'input' | 'email' | 'report'
  const [step, setStep] = useState('input');
  const [pendingResult, setPendingResult] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

 const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.name.toLowerCase().endsWith('.epub')) {
        try {
            const JSZip = (await import('jszip')).default;
            const zip = await JSZip.loadAsync(file);
            let extractedText = '';

            const allFiles = Object.keys(zip.files);

            // Try html/xhtml first, then any xml file
            const textFiles = allFiles.filter(name =>
                name.match(/\.(html|xhtml|htm|xml)$/i) &&
                !name.includes('META-INF') &&
                !name.includes('.opf') &&
                !name.includes('.ncx')
            );

            for (const filename of textFiles) {
                try {
                    const content = await zip.files[filename].async('string');
                    // Strip all tags and decode entities
                    const stripped = content
                        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                        .replace(/<[^>]+>/g, ' ')
                        .replace(/&nbsp;/g, ' ')
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/\s+/g, ' ')
                        .trim();

                    if (stripped.length > 100) {
                        extractedText += stripped + ' ';
                    }
                } catch (e) {
                    // skip unreadable files
                }
                if (extractedText.length > 6000) break;
            }

            if (extractedText.trim().length < 100) {
                setError('Could not extract readable text from this EPUB. Try pasting your text directly.');
                return;
            }

            setText(extractedText.slice(0, 6000));
        } catch (err) {
            setError('Could not read EPUB file. Try pasting your text directly.');
        }
    } else {
        const fileText = await file.text();
        const stripped = fileText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
        setText(stripped.slice(0, 6000));
    }
};

  const analyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/tools/publishing-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setPendingResult(data);
      setStep('email');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');

    await fetch('/api/send-publishing-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, result: pendingResult }),
    });

    setEmailSent(true);
    setResult(pendingResult);
    setStep('report');
  };

  // Calculate overall score for the email gate teaser
  const overallScore = pendingResult?.overallScore || pendingResult?.overall_score || null;

  return (
    <main style={{maxWidth:'680px',margin:'0 auto',padding:'48px 24px',fontFamily:'inherit'}}>

      {/* ── STEP 1: Input ── */}
      {step === 'input' && (
        <>
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <span style={{fontSize:'11px',fontWeight:'600',color:'#8B6914',letterSpacing:'2px',textTransform:'uppercase'}}>
              Free Tool — No Login Required
            </span>
            <h1 style={{fontSize:'36px',fontWeight:'800',marginTop:'12px',marginBottom:'12px',color:'#1a1a1a'}}>
              Is Your Book Publish-Ready?
            </h1>
            <p style={{color:'#666',fontSize:'16px',lineHeight:'1.6'}}>
              Paste your manuscript or upload your EPUB. Get an instant score across 6 publishing categories.
            </p>
          </div>

          <div style={{background:'#fff',border:'1px solid #e5e0d8',borderRadius:'12px',padding:'24px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            <textarea
              style={{width:'100%',border:'1px solid #d1cbc0',borderRadius:'8px',padding:'16px',fontSize:'14px',height:'180px',resize:'none',outline:'none',boxSizing:'border-box',fontFamily:'inherit'}}
              placeholder='Paste your manuscript here (500+ words recommended)...'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div style={{display:'flex',alignItems:'center',gap:'12px',margin:'16px 0'}}>
              <div style={{flex:1,borderTop:'1px solid #e5e0d8'}} />
              <span style={{fontSize:'12px',color:'#999'}}>or upload file</span>
              <div style={{flex:1,borderTop:'1px solid #e5e0d8'}} />
            </div>
            <label style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',border:'2px dashed #d1cbc0',borderRadius:'8px',padding:'16px',cursor:'pointer'}}>
              <span style={{fontSize:'14px',color:'#888'}}>Upload EPUB, TXT, or DOCX</span>
              <input type='file' accept='.epub,.txt,.docx' style={{display:'none'}} onChange={handleFileUpload} />
            </label>
            {text && (
              <p style={{fontSize:'12px',color:'#888',marginTop:'8px'}}>
                {text.length.toLocaleString()} characters loaded
              </p>
            )}
            <button
              onClick={analyze}
              disabled={!text.trim() || loading}
              style={{width:'100%',background: text.trim() && !loading ? '#2D6A4F' : '#ccc',color:'#fff',fontWeight:'700',padding:'14px',borderRadius:'8px',border:'none',cursor: text.trim() && !loading ? 'pointer' : 'not-allowed',fontSize:'15px',marginTop:'16px',transition:'background 0.2s'}}
            >
              {loading ? 'Analyzing your manuscript...' : 'Get My Publishing Score'}
            </button>
            {error && (
              <p style={{color:'#c0392b',fontSize:'14px',textAlign:'center',marginTop:'8px'}}>{error}</p>
            )}
          </div>
        </>
      )}

      {/* ── STEP 2: Email Gate ── */}
      {step === 'email' && (
        <div style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:'12px',padding:'32px',maxWidth:'480px',margin:'0 auto',textAlign:'center'}}>
          <div style={{fontSize:'2.5rem',marginBottom:'12px'}}>📊</div>
          <h2 style={{fontSize:'1.25rem',fontWeight:700,marginBottom:'8px'}}>
            Your publishing score is ready
          </h2>
          {overallScore !== null && (
            <div style={{fontSize:'3rem',fontWeight:800,color:'#2D6A4F',margin:'16px 0'}}>{overallScore}<span style={{fontSize:'1.5rem',color:'#9ca3af'}}>/100</span></div>
          )}
          <p style={{color:'#6b7280',fontSize:'0.95rem',marginBottom:'24px'}}>
            Enter your email to see the full breakdown across all 6 categories — and we'll send you a copy to review later.
          </p>
          <form onSubmit={handleEmailSubmit} style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            <input
              type="text"
              placeholder="Your first name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{padding:'12px 16px',border:'1px solid #d1d5db',borderRadius:'8px',fontSize:'0.95rem',outline:'none'}}
            />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{padding:'12px 16px',border:`1px solid ${emailError ? '#fca5a5' : '#d1d5db'}`,borderRadius:'8px',fontSize:'0.95rem',outline:'none'}}
            />
            {emailError && <p style={{color:'#c53030',fontSize:'0.85rem',margin:0}}>{emailError}</p>}
            <button
              type="submit"
              style={{background:'#2D6A4F',color:'#fff',padding:'13px',borderRadius:'8px',fontWeight:600,fontSize:'1rem',border:'none',cursor:'pointer'}}
            >
              See My Full Score →
            </button>
            <p style={{color:'#9ca3af',fontSize:'0.8rem',margin:0}}>No spam. One email with your results.</p>
          </form>
        </div>
      )}

      {/* ── STEP 3: Full Report ── */}
      {step === 'report' && result && (
        <>
          {emailSent && (
            <div style={{background:'#f0fdf4',border:'1px solid #86efac',borderRadius:'8px',padding:'12px 16px',marginBottom:'20px',fontSize:'0.9rem',color:'#166534'}}>
              📬 Report sent to <strong>{email}</strong> — check your inbox.
            </div>
          )}
          <ScoreCard data={result} />
          <div style={{background:'#faf9f7',border:'2px solid #C9933A',borderRadius:'12px',padding:'20px',margin:'20px 0',textAlign:'center'}}>
            <p style={{fontWeight:600,marginBottom:'4px',fontSize:'0.95rem'}}>Want to fix these issues automatically?</p>
            <p style={{color:'#6b7280',fontSize:'0.88rem',marginBottom:'14px'}}>BookKraft Pro includes all 12 tools + auto-fix for formatting, metadata, TOC and more.</p>
            <a href="/signup?plan=pro" style={{display:'inline-block',background:'#C9933A',color:'#fff',padding:'11px 24px',borderRadius:'8px',textDecoration:'none',fontWeight:600,fontSize:'0.95rem'}}>
              Upgrade to Pro — $9.99
            </a>
          </div>
          <UpsellBanner toolName="Publishing Score" />
        </>
      )}

      <StickyUpgradeBanner />
    </main>
  );
}