const fs = require('fs');
const filePath = 'src/app/page.js';
let content = fs.readFileSync(filePath, 'utf8');

// Wrap the LandingPage import with dynamic import but with SSR
if (content.includes('import LandingPage')) {
  content = content.replace(
    /import LandingPage from '\.\/landingpage';/,
    "import dynamic from 'next/dynamic';\nconst LandingPage = dynamic(() => import('./landingpage'), { ssr: true, loading: () => <div style={{ minHeight: '100vh', background: 'var(--ink)' }} /> });"
  );
}

fs.writeFileSync(filePath, content);
console.log('✅ Added dynamic import with SSR for landing page');
