const fs = require('fs');
const filePath = 'src/app/landingpage.js';
let content = fs.readFileSync(filePath, 'utf8');

if (!content.startsWith("'use client'")) {
  content = "'use client';\n" + content;
}

const heroStart = content.indexOf('function HeroSection() {');
const heroEnd = content.indexOf('function TickerSection()');
const beforeHero = content.substring(0, heroStart);
const afterHero = content.substring(heroEnd);

const newHero = `function HeroSection() {
  const [animate] = useState(false);
  return (
    <section
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(96px,10vh,128px) clamp(20px,4vw,48px) clamp(64px,8vh,96px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-label="Hero"
    >
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.62)',
        zIndex: 0,
      }} />
      <div style={{ maxWidth:1160, margin:'0 auto', width:'100%', position:'relative', zIndex:1 }}>
        <p style={{
          fontFamily:"'JetBrains Mono',monospace", fontSize:11,
          color:'var(--gold)', letterSpacing:'2.5px', textTransform:'uppercase',
          marginBottom:20, opacity:1,
        }}>
          ✦ Professional eBook Formatting
        </p>
        <h1
          aria-label="Format like a pro. Price like a newcomer."
          style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:'clamp(48px,7vw,96px)',
            fontWeight:700, fontStyle:'italic',
            lineHeight:1.05, letterSpacing:'-1px',
            color:'var(--cream)', marginBottom:24,
          }}
        >
          {HEADLINE_WORDS.map((w, i) => (
            <React.Fragment key={i}>
              <span
                style={{
                  color: w.gold ? 'var(--gold)' : 'var(--cream)',
                  display: 'inline-block',
                  opacity: 1,
                  transform: 'translateY(0)',
                }}
              >
                {w.text}
              </span>
              {i < HEADLINE_WORDS.length - 1 && ' '}
            </React.Fragment>
          ))}
        </h1>
        <p style={{
          fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(16px,1.3vw,22px)',
          color:'rgba(255,248,235,0.75)', maxWidth:560, marginBottom:32,
          lineHeight:1.6, opacity:1,
        }}>
          Upload your manuscript. Pick a tool. Download KDP-ready EPUB, PDF, or DOCX in seconds.
          Start with two free tools — no account needed.
        </p>
        <div style={{ display:'flex', flexWrap:'wrap', gap:14, opacity:1 }}>
          
            href="/free-tools"
            style={{
              display:'inline-block', padding:'14px 36px',
              background:'var(--gold)', color:'var(--ink)',
              fontFamily:"'DM Sans',sans-serif", fontWeight:600,
              borderRadius:6, fontSize:16, textDecoration:'none',
            }}
          >
            Start for Free →
          </a>
          
            href="/pricing"
            style={{
              display:'inline-block', padding:'14px 28px',
              border:'1.5px solid rgba(255,248,235,0.25)',
              color:'var(--cream)', borderRadius:6,
              fontFamily:"'DM Sans',sans-serif", fontSize:16,
              textDecoration:'none',
            }}
          >
            See Pricing
          </a>
        </div>
      </div>
    </section>
  );
}`;

content = beforeHero + newHero + afterHero;
fs.writeFileSync(filePath, content);
console.log('✅ Hero background image applied');