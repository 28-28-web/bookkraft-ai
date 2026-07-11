const fs = require('fs');
const filePath = 'src/app/globals.css';
let css = fs.readFileSync(filePath, 'utf8');

// Fix Playfair Display with important
css = css.replace(
  /font-family: 'Playfair Display', serif !important;/g,
  'font-family: var(--font-playfair), serif !important;'
);

fs.writeFileSync(filePath, css);
console.log('✅ Fixed remaining Playfair Display references');
