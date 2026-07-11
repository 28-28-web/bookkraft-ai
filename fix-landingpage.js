const fs = require('fs');
const filePath = 'src/app/landingpage.js';
let content = fs.readFileSync(filePath, 'utf8');

// Remove the setTimeout that delays animations
content = content.replace(
  /const t = setTimeout\(\(\) => setAnimate\(true\), 260\);/,
  'const t = setTimeout(() => setAnimate(true), 0);'
);

// Remove animation delays from inline styles
content = content.replace(
  /animation:'bkFadeUp 0\.4s ease 0\.5s forwards',/g,
  'animation:\'bkFadeUp 0.4s ease 0s forwards\','
);

content = content.replace(
  /animation:'bkFadeUp 0\.5s ease 1\.1s forwards',/g,
  'animation:\'bkFadeUp 0.5s ease 0s forwards\','
);

content = content.replace(
  /animation:'bkFadeUp 0\.5s ease 1\.3s forwards',/g,
  'animation:\'bkFadeUp 0.5s ease 0s forwards\','
);

content = content.replace(
  /animation:'bkFadeUp 0\.5s ease 1\.5s forwards',/g,
  'animation:\'bkFadeUp 0.5s ease 0s forwards\','
);

// Fix gold line animation delay
content = content.replace(
  /animation:'bkGoldLine 0\.5s ease 1\.2s forwards',/g,
  'animation:\'bkGoldLine 0.5s ease 0s forwards\','
);

// Fix the hero-word animation that uses opacity
content = content.replace(
  /animation: animate\s+\? 'wordSlideUp 0\.5s ease forwards' : 'none',/,
  'animation: animate ? \'wordSlideUp 0.5s ease forwards\' : \'none\','
);

// Make sure hero words start visible, not hidden
content = content.replace(
  /opacity: animate \? 0 : 1,/g,
  'opacity: animate ? 1 : 1,'
);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed animation delays in landingpage.js');
