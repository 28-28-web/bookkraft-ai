import CategoryRow from './CategoryRow';

export default function ScoreCard({ data }) {
  const { total, categories } = data;
  const label = total >= 85 ? 'Almost Publish-Ready' : total >= 65 ? 'Good Progress' : total >= 40 ? 'Needs Some Work' : 'Not Ready Yet';
  const bg = total >= 85 ? '#2D6A4F' : total >= 65 ? '#52796F' : total >= 40 ? '#B5541A' : '#922B21';
  return (
    <div style={{marginTop:'32px',background:'#fff',border:'1px solid #e5e0d8',borderRadius:'12px',overflow:'hidden',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
      <div style={{background:bg,color:'#fff',textAlign:'center',padding:'40px 24px'}}>
        <p style={{fontSize:'11px',letterSpacing:'2px',textTransform:'uppercase',opacity:0.8,marginBottom:'8px'}}>Publishing Readiness Score</p>
        <div style={{fontSize:'80px',fontWeight:'900',lineHeight:1}}>{total}</div>
        <div style={{opacity:0.7,marginTop:'4px'}}>out of 100</div>
        <div style={{marginTop:'8px',fontSize:'18px',fontWeight:'600'}}>{label}</div>
        <div style={{marginTop:'16px',background:'rgba(255,255,255,0.2)',borderRadius:'999px',height:'10px',maxWidth:'280px',margin:'16px auto 0'}}>
          <div style={{background:'#fff',borderRadius:'999px',height:'10px',width:total+'%',transition:'width 1s'}} />
        </div>
      </div>
      <div>
        {categories.map((cat) => (
          <CategoryRow key={cat.id} category={cat} />
        ))}
      </div>
      <div style={{background:'#f9f7f4',padding:'24px',textAlign:'center'}}>
        <p style={{fontSize:'14px',color:'#666',marginBottom:'12px'}}>Fix every issue above and get your book to 100 — KDP-ready.</p>
        <a href='/pricing' style={{display:'inline-block',background:'#2D6A4F',color:'#fff',fontWeight:'700',padding:'12px 28px',borderRadius:'8px',textDecoration:'none',fontSize:'14px'}}>
          Get Full Access - $9.99
        </a>
      </div>
    </div>
  );
}