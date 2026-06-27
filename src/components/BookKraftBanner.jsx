'use client';

import { useEffect, useRef } from 'react';

export default function BookKraftBanner() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.width;
    const H = canvas.height;

    const CX = W * 0.75;
    const CY = H * 0.5;
    const CR = H * 0.42;

    const GOLD = 'rgba(218,165,32,1)';
    const LIGHT_GOLD = 'rgba(255,215,0,0.75)';
    const GRID = 'rgba(40,40,40,1)';
    const BG = 'rgba(20,20,20,1)';

    const NUM = 1500;
    const particles = [];

    for (let i = 0; i < NUM; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * CR,
        speed: 0.5 + Math.random() * 2,
        tail: 2 + Math.random() * 6,
      });
    }

    let mx = -999, my = -999;

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = W / rect.width;
      const scaleY = H / rect.height;
      mx = (e.clientX - rect.left) * scaleX;
      my = (e.clientY - rect.top) * scaleY;
    };
    const onLeave = () => { mx = -999; my = -999; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    function draw() {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = GRID;
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 25) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 25) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      ctx.fillStyle = GOLD;
      ctx.textBaseline = 'alphabetic';

      ctx.font = 'bold 58px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('BookKraft AI', 50, 145);

      ctx.font = '20px system-ui, sans-serif';
      ctx.fillText('Professional eBook Formatting Tools for Indie Authors', 50, 190);

      const tags = ['12 Tools', 'No Subscription', 'KDP Ready', 'EPUB · MOBI · PDF'];
      const tagWidths = [100, 150, 120, 170];
      ctx.font = '13px system-ui, sans-serif';
      ctx.lineWidth = 1;
      let tx = 50;
      tags.forEach((tag, i) => {
        const tw = tagWidths[i];
        const th = 28;
        const ty = 215;
        ctx.strokeStyle = GOLD;
        ctx.strokeRect(tx, ty, tw, th);
        ctx.fillStyle = GOLD;
        ctx.textAlign = 'center';
        ctx.fillText(tag, tx + tw / 2, ty + 18);
        tx += tw + 10;
      });

      ctx.fillStyle = GOLD;
      ctx.font = '15px system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('bookkraftai.com', 50, 290);

      const mdist = Math.hypot(mx - CX, my - CY);
      const mouseIn = mdist < CR;

      for (const p of particles) {
        p.dist += p.speed;
        if (p.dist > CR) p.dist = 0;

        if (mouseIn) {
          const px = CX + Math.cos(p.angle) * p.dist;
          const py = CY + Math.sin(p.angle) * p.dist;
          const d = Math.hypot(mx - px, my - py);
          if (d < 50) {
            const force = (50 - d) / 50 * 1;
            p.dist = Math.max(0, p.dist - force * 2);
          }
        }

        const x1 = CX + Math.cos(p.angle) * p.dist;
        const y1 = CY + Math.sin(p.angle) * p.dist;
        const x2 = CX + Math.cos(p.angle) * (p.dist - p.tail);
        const y2 = CY + Math.sin(p.angle) * (p.dist - p.tail);

        ctx.strokeStyle = LIGHT_GOLD;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div style={{ width: '100%', background: '#141414', padding: '0' }}>
      <canvas
        ref={canvasRef}
        width={1000}
        height={320}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  );
}
