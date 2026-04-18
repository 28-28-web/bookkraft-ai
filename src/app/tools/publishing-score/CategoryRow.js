const statusBg = { good: '#e8f5e9', warning: '#fff8e1', critical: '#fdecea' };
const statusColor = { good: '#2D6A4F', warning: '#b45309', critical: '#c0392b' };
const barColor = { good: '#2D6A4F', warning: '#f59e0b', critical: '#e74c3c' };
const statusIcon = { good: 'check', warning: 'warn', critical: 'x' };

export default function CategoryRow({ category }) {
  const { label, score, max, status, insight, tool, toolUrl } = category;
  const pct = Math.round((score / max) * 100);
  return (
    <div style={{padding:'16px 24px',borderBottom:'1px solid #f0ece4'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontSize:'12px',fontWeight:'700',padding:'4px 10px',borderRadius:'999px',background:statusBg[status],color:statusColor[status]}}>
          {statusIcon[status]} {label}
        </span>
        <span style={{fontSize:'14px',fontWeight:'700',color:'#333'}}>{score}<span style={{color:'#aaa',fontWeight:'400'}}>/{max}</span></span>
      </div>
      <div style={{background:'#f0ece4',borderRadius:'999px',height:'6px',marginBottom:'8px'}}>
        <div style={{background:barColor[status],borderRadius:'999px',height:'6px',width:pct+'%',transition:'width 0.7s'}} />
      </div>
      <p style={{fontSize:'13px',color:'#555',marginBottom:'6px'}}>{insight}</p>
      {status !== 'good' && (
        <a href={toolUrl} style={{fontSize:'12px',color:'#2D6A4F',fontWeight:'600',textDecoration:'none'}}>
          Fix with {tool}
        </a>
      )}
    </div>
  );
}