'use client';

export default function GuaranteeBadge() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 12,
      padding: '10px 14px',
      background: 'rgba(201,168,76,0.08)',
      border: '1px solid rgba(201,168,76,0.25)',
      borderRadius: 8,
    }}>
      <span style={{ fontSize: 20, flexShrink: 0 }}>🛡️</span>
      <p style={{
        fontSize: 12,
        lineHeight: 1.5,
        color: 'rgba(201,168,76,0.8)',
        margin: 0,
      }}>
        <strong style={{ color: 'var(--gold, #c9a84c)', display: 'block', marginBottom: 1 }}>
          7-Day Money-Back Guarantee
        </strong>
        Not happy? Email us within 7 days for a full refund. No questions asked.
      </p>
    </div>
  );
}