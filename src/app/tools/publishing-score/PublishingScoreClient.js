'use client';
import { useState } from 'react';
import ScoreCard from './ScoreCard';

export default function PublishingScoreClient() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileText = await file.text();
    const stripped = fileText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    setText(stripped.slice(0, 6000));
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
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{maxWidth:'680px',margin:'0 auto',padding:'48px 24px',fontFamily:'inherit'}}>
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

      {result && <ScoreCard data={result} />}
    </main>
  );
}