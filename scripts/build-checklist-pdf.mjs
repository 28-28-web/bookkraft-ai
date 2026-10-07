// Build a checklist PDF from its entry in src/lib/checklists.js, so the web
// page and the PDF never drift apart.
//
//   node scripts/build-checklist-pdf.mjs [slug] [out.pdf]
//   default: kdp-pre-launch-checklist → public/kdp-preflight-checklist.pdf
//
// Prints via headless Chrome/Edge ("Save as PDF"), so no PDF library is needed.
// Set CHROME_PATH if your browser isn't in a standard location.
import { readFileSync, writeFileSync, existsSync, statSync, mkdtempSync, rmSync } from 'fs';
import { dirname, join } from 'path';
import { tmpdir } from 'os';
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2] || 'kdp-pre-launch-checklist';
const out = join(root, process.argv[3] || 'public/kdp-preflight-checklist.pdf');

// Same loader as scripts/content-check.mjs: checklists.js is static data.
function loadChecklists() {
  let src = readFileSync(join(root, 'src/lib/checklists.js'), 'utf8');
  src = src.replace(/\nexport function[\s\S]*/m, '');
  src = src.replace(/^export const \w+ = /m, 'return ');
  return new Function(src)();
}

const c = loadChecklists().find((x) => x.slug === slug);
if (!c) throw new Error(`No checklist with slug "${slug}"`);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const kdpId = (url) => url.match(/topic\/(\w+)/)?.[1];
const dateText = c.dateModified
  ? new Date(`${c.dateModified}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
  : '';

const sectionHtml = c.sections.map((s) => {
  const hints = [];
  if (s.tools?.length) hints.push(`Free tool${s.tools.length > 1 ? 's' : ''}: ${s.tools.map((t) => `bookkraftai.com/tools/${t.slug}`).join(', ')}`);
  if (s.guides?.length) hints.push(`Guide${s.guides.length > 1 ? 's' : ''}: ${s.guides.map((g) => `bookkraftai.com${g.href}`).join(', ')}`);
  if (s.paidTool) hints.push(`Optional paid tool: bookkraftai.com/tools/${s.paidTool.slug}`);
  if (s.sources?.length) hints.push(`Based on: ${s.sources.map((x) => (kdpId(x.url) ? `KDP help ${kdpId(x.url)}` : x.label)).join(', ')}`);
  return `<section>
  <h2>${esc(s.heading)}</h2>
  <ul>${s.items.map((i) => `<li><span class="box"></span><span>${esc(i)}</span></li>`).join('')}</ul>
  ${hints.map((h) => `<p class="hint">${esc(h)}</p>`).join('')}
</section>`;
}).join('\n');

const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(c.pdfTitle || c.title)}</title>
<style>
  @page { size: Letter; margin: 0.5in 0.6in; }
  body { font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; font-size: 10.5pt; line-height: 1.4; margin: 0; }
  h1 { font-size: 22pt; margin: 0 0 4px; text-align: center; }
  .sub { text-align: center; color: #555; margin: 0 0 2px; }
  .brand { text-align: center; color: #9c7f35; font-weight: 700; margin: 0 0 14px; padding-bottom: 10px; border-bottom: 2px solid #c9a84c; }
  section { margin: 0 0 10px; break-inside: avoid; }
  h2 { background: #1a1a1a; color: #fff; font-size: 10.5pt; letter-spacing: 0.06em; text-transform: uppercase; padding: 6px 10px; border-radius: 4px; margin: 0 0 4px; }
  ul { list-style: none; margin: 0; padding: 0; }
  li { display: flex; gap: 9px; padding: 4px 8px; break-inside: avoid; }
  li:nth-child(odd) { background: #f6f2ea; }
  .box { flex: none; width: 11px; height: 11px; margin-top: 2px; border: 1.4px solid #c9a84c; border-radius: 2px; }
  .hint { margin: 3px 8px 0; color: #7a6a45; font-size: 8.5pt; font-style: italic; }
  footer { break-before: avoid; margin-top: 6px; padding-top: 6px; border-top: 1px solid #ddd; color: #777; font-size: 8.5pt; text-align: center; }
</style></head><body>
<h1>${esc(c.pdfTitle || c.title)}</h1>
<p class="sub">What to check before you upload a Kindle eBook to KDP — based on KDP's help pages</p>
<p class="brand">BookKraft AI — bookkraftai.com/checklist/${esc(c.slug)}</p>
${sectionHtml}
<footer>BookKraft AI · bookkraftai.com${dateText ? ` · Checked against KDP help pages, ${esc(dateText)}` : ''} · Items KDP's help pages don't cover are our advice.</footer>
</body></html>`;

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error('No Chrome/Edge found. Set CHROME_PATH to a Chromium-based browser.');
  return found;
}

const dir = mkdtempSync(join(tmpdir(), 'checklist-pdf-'));
try {
  const htmlPath = join(dir, 'checklist.html');
  writeFileSync(htmlPath, html);
  execFileSync(findBrowser(), [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--print-to-pdf-no-header',
    `--user-data-dir=${join(dir, 'profile')}`, `--print-to-pdf=${out}`, pathToFileURL(htmlPath).href,
  ], { stdio: 'ignore' });
} finally {
  rmSync(dir, { recursive: true, force: true });
}
const size = statSync(out).size;
if (size < 2000) throw new Error(`PDF looks empty (${size} bytes)`);
console.log(`Wrote ${out} (${Math.round(size / 1024)} KB) from checklist "${slug}"`);
