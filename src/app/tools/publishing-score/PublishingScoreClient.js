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
        const textFiles = allFiles.filter(name =>
          name.match(/\.(html|xhtml|htm|xml)$/i) &&
          !name.includes('META-INF') &&
          !name.includes('.opf') &&
          !name.includes('.ncx')
        );
        for (const filename of textFiles) {
          try {
            const content = await zip.files[filename].async('string');
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
            if (stripped.length > 100) extractedText += stripped + ' ';
          } catch (e) {}
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
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'publishing_score_generated', { score: data.total });
      }
      setResult(data);
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
      body: JSON.stringify({ email, name, result }),
    });
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'email_captured', { tool_name: 'publishing_score' });
    }
    setEmailSent(true);
  };

  return (
    <main style={{maxWidth:'680px',margin:'0 auto',padding:'48px 24px',fontFamily:'inherit'}}>
      {!result && (
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
            {text && <p style={{fontSize:'12px',color:'#888',marginTop:'8px'}}>{text.length.toLocaleString()} characters loaded</p>}
            <button
              onClick={analyze}
              disabled={!text.trim() || loading}
              style={{width:'100%',background: text.trim() && !loading ? '#2D6A4F' : '#ccc',color:'#fff',fontWeight:'700',padding:'14px',borderRadius:'8px',border:'none',cursor: text.trim() && !loading ? 'pointer' : 'not-allowed',fontSize:'15px',marginTop:'16px',transition:'background 0.2s'}}
            >
              {loading ? 'Analyzing your manuscript...' : 'Get My Publishing Score'}
            </button>
            {error && <p style={{color:'#c0392b',fontSize:'14px',textAlign:'center',marginTop:'8px'}}>{error}</p>}
          </div>
        </>
      )}

      {result && (
        <>
          <ScoreCard data={result} />

          {/* Soft email capture */}
          <div style={{background:'#f9fafb',border:'1px solid #e5e7eb',borderRadius:'12px',padding:'24px',margin:'20px 0'}}>
            {!emailSent ? (
              <>
                <p style={{fontWeight:600,fontSize:'0.95rem',marginBottom:'4px'}}>📬 Want a copy of your score?</p>
                <p style={{color:'#6b7280',fontSize:'0.88rem',marginBottom:'16px'}}>We'll email your full report so you can review it later. No spam.</p>
                <form onSubmit={handleEmailSubmit} style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
                  <input type="text" placeholder="First name (optional)" value={name} onChange={(e) => setName(e.target.value)} style={{padding:'10px 14px',border:'1px solid #d1d5db',borderRadius:'8px',fontSize:'0.9rem',outline:'none',flex:'1',minWidth:'140px'}} />
                  <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{padding:'10px 14px',border:`1px solid ${emailError ? '#fca5a5' : '#d1d5db'}`,borderRadius:'8px',fontSize:'0.9rem',outline:'none',flex:'2',minWidth:'180px'}} />
                  <button type="submit" style={{background:'#2D6A4F',color:'#fff',padding:'10px 20px',borderRadius:'8px',fontWeight:600,fontSize:'0.9rem',border:'none',cursor:'pointer',whiteSpace:'nowrap'}}>Send Report</button>
                </form>
                {emailError && <p style={{color:'#c53030',fontSize:'0.85rem',marginTop:'6px'}}>{emailError}</p>}
              </>
            ) : (
              <p style={{color:'#166534',fontWeight:600,fontSize:'0.95rem',textAlign:'center'}}>
                📬 Report sent to <strong>{email}</strong> — check your inbox.
              </p>
            )}
          </div>

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