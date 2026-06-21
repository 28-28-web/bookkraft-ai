'use client';

import { useRef, useState, useEffect } from 'react';

export default function ValidationBadge({ filename }) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const bookTitle = (filename || 'My Book').replace(/\.epub$/i, '');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 1200, H = 630;
    canvas.width = W;
    canvas.height = H;

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#12141C');
    bg.addColorStop(1, '#1c1f2b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const glow1 = ctx.createRadialGradient(W * 0.18, H * 0.2, 0, W * 0.18, H * 0.2, 320);
    glow1.addColorStop(0, 'rgba(61,220,151,0.18)');
    glow1.addColorStop(1, 'rgba(61,220,151,0)');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, W, H);

    const glow2 = ctx.createRadialGradient(W * 0.85, H * 0.85, 0, W * 0.85, H * 0.85, 360);
    glow2.addColorStop(0, 'rgba(201,147,58,0.18)');
    glow2.addColorStop(1, 'rgba(201,147,58,0)');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, W, H);

    const cardX = 60, cardY = 60, cardW = W - 120, cardH = H - 120, cardR = 28;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cardX + cardR, cardY);
    ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardH, cardR);
    ctx.arcTo(cardX + cardW, cardY + cardH, cardX, cardY + cardH, cardR);
    ctx.arcTo(cardX, cardY + cardH, cardX, cardY, cardR);
    ctx.arcTo(cardX, cardY, cardX + cardW, cardY, cardR);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    const cx = W / 2, cy = 250, r = 70;
    const ringGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    ringGrad.addColorStop(0, '#3DDC97');
    ringGrad.addColorStop(1, '#2bb87d');
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(61,220,151,0.12)';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = ringGrad;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx - 28, cy + 2);
    ctx.lineTo(cx - 8, cy + 24);
    ctx.lineTo(cx + 32, cy - 26);
    ctx.lineWidth = 9;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#3DDC97';
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 40px Georgia, serif';
    const titleText = bookTitle.length > 38 ? bookTitle.slice(0, 35) + '…' : bookTitle;
    ctx.fillText(titleText, cx, 370);

    ctx.font = '700 22px Arial, sans-serif';
    ctx.fillStyle = '#3DDC97';
    ctx.fillText('PASSED EPUB VALIDATION', cx, 415);

    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText('Structure, metadata, and content checks complete', cx, 448);

    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cardX + 60, cardY + cardH - 70);
    ctx.lineTo(cardX + cardW - 60, cardY + cardH - 70);
    ctx.stroke();

    ctx.font = '700 18px Arial, sans-serif';
    ctx.fillStyle = '#C9933A';
    ctx.fillText('Validated by BookKraft AI', cx, cardY + cardH - 30);
    ctx.font = '13px Arial, sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText('bookkraftai.com/tools/epub-validator', cx, cardY + cardH - 10);

  }, [bookTitle]);

  const downloadBadge = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'bookkraft-validation-badge.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const embedCode = `<a href="https://bookkraftai.com/tools/epub-validator" target="_blank"><img src="YOUR-UPLOADED-BADGE-URL.png" alt="Passed BookKraft AI EPUB Validation" width="300" /></a>`;

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(61,220,151,0.25)',
      borderRadius: 16,
      padding: 22,
      marginTop: 16,
      marginBottom: 20,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <span style={{ color: '#1a1a1a', fontWeight: 700, fontSize: 14 }}>
          🏅 Share your validation badge
        </span>
      </div>

      <div style={{
        borderRadius: 12, overflow: 'hidden', marginBottom: 16,
        boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      }}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          onClick={downloadBadge}
          style={{
            background: '#C9933A', color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: 8, fontWeight: 700, fontSize: '0.88rem',
            cursor: 'pointer',
          }}
        >
          Download PNG
        </button>
        <button
          onClick={copyEmbed}
          style={{
            background: 'transparent', color: '#1a1a1a', border: '1px solid rgba(0,0,0,0.2)',
            padding: '10px 20px', borderRadius: 8, fontWeight: 600, fontSize: '0.88rem',
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copied!' : 'Copy Embed Code'}
        </button>
      </div>
      <p style={{ fontSize: '0.78rem', color: '#666', marginTop: 10 }}>
        Download the badge and upload it anywhere — your book&apos;s landing page, social posts, or KDP author bio link.
      </p>
    </div>
  );
}