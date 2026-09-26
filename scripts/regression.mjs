// Regression: prove extracted lib == original inline logic.
// EPUB: run original block vs runEpubChecks on a sample EPUB.
// Cover: run original checkKDP/checkApple vs lib over dimension cases.
// Run from repo root: node scripts/regression.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import JSZip from 'jszip';
import { runEpubChecks } from '../src/lib/epubChecks.js';
import { checkKDP as kdpAfter, checkApple as appleAfter } from '../src/lib/coverChecks.js';

const ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');

// ---------- ORIGINAL EPUB logic (verbatim from EpubValidator.js before edit) ----------
async function epubBefore(zip, fileSize) {
  const checks = []; let passCount = 0;
  const mimetype = zip.file('mimetype');
  if (mimetype) {
    const content = await mimetype.async('string');
    if (content.trim() === 'application/epub+zip') { checks.push({ name: 'Mimetype', status: 'pass', detail: 'Valid mimetype present.' }); passCount++; }
    else { checks.push({ name: 'Mimetype', status: 'fail', detail: "KDP can't read your file type. Your EPUB is corrupted or was exported incorrectly.", fixLink: '/epub-errors/invalid-mimetype', fixTool: 'Fix Guide' }); }
  } else { checks.push({ name: 'Mimetype', status: 'fail', detail: "KDP can't read your file type. Your EPUB is corrupted or was exported with wrong settings.", fixLink: '/epub-errors/invalid-mimetype', fixTool: 'Fix Guide' }); }
  const container = zip.file('META-INF/container.xml');
  let opfPath = 'OEBPS/content.opf';
  if (container) { const cx = await container.async('string'); const m = cx.match(/full-path="([^"]+)"/); if (m) opfPath = m[1]; checks.push({ name: 'Container', status: 'pass', detail: `container.xml found, rootfile: ${opfPath}` }); passCount++; }
  else { checks.push({ name: 'Container', status: 'fail', detail: "Your EPUB is missing its internal structure file. This usually happens when exporting from Word or Calibre with wrong settings.", fixLink: '/tools/kindle-format-fixer', fixTool: 'Kindle Format Fixer' }); }
  const opf = zip.file(opfPath); let opfContent = '';
  if (opf) { opfContent = await opf.async('string'); checks.push({ name: 'OPF Package', status: 'pass', detail: `Found at ${opfPath}` }); passCount++; }
  else { checks.push({ name: 'OPF Package', status: 'fail', detail: "Your book's table of contents and metadata are missing. KDP requires these to process your upload.", fixLink: '/tools/metadata-builder', fixTool: 'Metadata Builder' }); }
  if (opfContent) {
    const hasTitle = /<dc:title/i.test(opfContent); const hasLang = /<dc:language/i.test(opfContent); const hasId = /<dc:identifier/i.test(opfContent);
    if (hasTitle && hasLang && hasId) { checks.push({ name: 'Required Metadata', status: 'pass', detail: 'Title, language, and identifier present.' }); passCount++; }
    else { const missing = []; if (!hasTitle) missing.push('title'); if (!hasLang) missing.push('language'); if (!hasId) missing.push('identifier');
      let metaFixLink = '/tools/metadata-builder'; let metaFixTool = 'Metadata Builder';
      if (!hasId) { metaFixLink = '/epub-errors/unique-identifier-not-found'; metaFixTool = 'Fix Guide'; } else if (!hasLang) { metaFixLink = '/epub-errors/missing-language-declaration'; metaFixTool = 'Fix Guide'; }
      checks.push({ name: 'Required Metadata', status: 'fail', detail: `Missing ${missing.join(', ')} — KDP will reject uploads without complete metadata.`, fixLink: metaFixLink, fixTool: metaFixTool }); }
  } else { checks.push({ name: 'Required Metadata', status: 'skip', detail: 'Skipped — OPF not found' }); }
  if (opfContent) {
    const spineMatch = opfContent.match(/<spine[^>]*>([\s\S]*?)<\/spine>/);
    if (spineMatch) { const idrefs = [...spineMatch[1].matchAll(/idref="([^"]+)"/g)].map(m=>m[1]);
      if (idrefs.length>0) { checks.push({ name: 'Spine', status: 'pass', detail: `${idrefs.length} items in spine.` }); passCount++; }
      else { checks.push({ name: 'Spine', status: 'fail', detail: "No reading order defined — readers won't know which chapter comes first.", fixLink: '/tools/toc-generator', fixTool: 'TOC Generator' }); }
    } else { checks.push({ name: 'Spine', status: 'fail', detail: 'No reading order found in your EPUB. KDP requires a defined chapter sequence.', fixLink: '/tools/toc-generator', fixTool: 'TOC Generator' }); }
  }
  if (opfContent) {
    const hrefs = [...opfContent.matchAll(/href="([^"#]+)"/g)].map(m=>m[1]);
    const opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/')+1) : '';
    let missing=0; for (const h of hrefs) { const fp=opfDir+h; if (!zip.file(fp)&&!zip.file(h)) missing++; }
    if (missing===0) { checks.push({ name: 'Manifest Files', status: 'pass', detail: `All ${hrefs.length} manifest items found.` }); passCount++; }
    else { checks.push({ name: 'Manifest Files', status: 'warn', detail: `${missing} files referenced in your EPUB are missing. This causes blank pages or broken images on Kindle.`, fixLink: '/epub-errors/missing-manifest-resource', fixTool: 'Fix Guide' }); }
  }
  if (opfContent) {
    const emfHrefs = [...opfContent.matchAll(/href="([^"]+\.(?:emf|wmf))"/gi)].map(m=>m[1]);
    const emfMime = /media-type="image\/(?:x-)?(?:emf|wmf)"/i.test(opfContent);
    if (emfHrefs.length===0 && !emfMime) { checks.push({ name: 'EMF/WMF Images', status: 'pass', detail: 'No Windows-only image formats detected.' }); passCount++; }
    else { const count=emfHrefs.length||1; checks.push({ name: 'EMF/WMF Images', status: 'warn', detail: `${count} EMF/WMF image${count>1?'s':''} found. KDP and Apple Books reject EPUBs with Windows-only image formats — re-save these as PNG or JPG in your source document before re-exporting.`, fixLink: '/epub-errors/emf-image-fallback', fixTool: 'Fix Guide' }); }
  }
  if (opfContent) {
    const normPath = (p)=>p.split('/').reduce((acc,seg)=>{if(seg==='..')acc.pop();else if(seg!=='.')acc.push(seg);return acc;},[]).join('/');
    const cssHrefs = [...opfContent.matchAll(/href="([^"]+\.css)"/gi)].map(m=>m[1]);
    const opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/')+1) : '';
    let totalFontRefs=0, missingFonts=0;
    for (const cssHref of cssHrefs) { const cssPath=opfDir+cssHref; const cssFile=zip.file(cssPath)||zip.file(cssHref); if(!cssFile)continue;
      const cssContent=await cssFile.async('string');
      const fontUrls=[...cssContent.matchAll(/url\(['"]?([^'")\s]+\.(?:woff2?|ttf|otf|eot))['"]?\)/gi)].map(m=>m[1]);
      for (const fu of fontUrls) { if (fu.startsWith('http')||fu.startsWith('//')) continue; totalFontRefs++;
        const cssDir=cssPath.includes('/')?cssPath.substring(0,cssPath.lastIndexOf('/')+1):''; const rp=normPath(cssDir+fu);
        if(!zip.file(rp)&&!zip.file(fu)) missingFonts++; } }
    if (totalFontRefs===0) { checks.push({ name: 'Font Files', status: 'pass', detail: 'No custom fonts embedded — device default font will be used.' }); passCount++; }
    else if (missingFonts===0) { checks.push({ name: 'Font Files', status: 'pass', detail: `${totalFontRefs} embedded font${totalFontRefs>1?'s':''} verified.` }); passCount++; }
    else { checks.push({ name: 'Font Files', status: 'warn', detail: `${missingFonts} font file${missingFonts>1?'s':''} referenced in CSS but missing from the package. KDP and Apple Books may reject or mangle the layout.`, fixLink: '/epub-errors/font-link-validation', fixTool: 'Fix Guide' }); }
  }
  if (opfContent) {
    const hasNav=/properties="[^"]*nav[^"]*"/.test(opfContent); const hasNcx=/media-type="application\/x-dtbncx\+xml"/.test(opfContent);
    if (hasNav||hasNcx) { checks.push({ name: 'Navigation', status: 'pass', detail: `${hasNav?'EPUB3 nav':''}${hasNav&&hasNcx?' + ':''}${hasNcx?'NCX':''} found.` }); passCount++; }
    else { checks.push({ name: 'Navigation', status: 'warn', detail: "No table of contents found — readers can't jump between chapters on Kindle.", fixLink: '/epub-errors/missing-nav-document', fixTool: 'Fix Guide' }); }
  }
  if (opfContent) {
    const hasCover=/properties="[^"]*cover-image[^"]*"/.test(opfContent)||/name="cover"/.test(opfContent);
    if (hasCover) { checks.push({ name: 'Cover Image', status: 'pass', detail: 'Cover image referenced in metadata.' }); passCount++; }
    else { checks.push({ name: 'Cover Image', status: 'warn', detail: 'No cover image detected — some stores require this for listing.', fixLink: '/epub-errors/cover-image-not-declared', fixTool: 'Fix Guide' }); }
  }
  const sizeMB=(fileSize/1024/1024).toFixed(1);
  if (fileSize < 650*1024*1024) { checks.push({ name: 'File Size', status: 'pass', detail: `${sizeMB} MB (KDP limit: 650 MB)` }); passCount++; }
  else { checks.push({ name: 'File Size', status: 'fail', detail: `${sizeMB} MB exceeds KDP 650 MB limit. Compress images or split into volumes.` }); }
  return { checks, passCount, total: checks.length };
}

// ---------- ORIGINAL cover logic (verbatim before extraction) ----------
const KDP_MIN_WIDTH=625, KDP_MIN_HEIGHT=1000, KDP_MAX_FILE_SIZE_MB=50, KDP_RECOMMENDED_LONG_SIDE=2560, KDP_RATIO=1.6, KDP_RATIO_TOLERANCE=0.08, APPLE_MIN_SHORT_SIDE=1400;
function kdpBefore(width,height,fileType,fileSizeMB){
  const longSide=Math.max(width,height), shortSide=Math.min(width,height), ratio=longSide/shortSide, isPortrait=height>=width; const checks=[];
  checks.push({label:'Format',pass:fileType==='image/jpeg'||fileType==='image/jpg',detail:fileType==='image/jpeg'||fileType==='image/jpg'?'JPEG — accepted':`${fileType.replace('image/','').toUpperCase()} — KDP requires JPEG, not PNG`});
  checks.push({label:'Orientation',pass:isPortrait,detail:isPortrait?'Portrait — correct':'Landscape or square — covers must be portrait'});
  checks.push({label:'Minimum size',pass:width>=KDP_MIN_WIDTH&&height>=KDP_MIN_HEIGHT,detail:`${width}×${height}px — minimum is ${KDP_MIN_WIDTH}×${KDP_MIN_HEIGHT}px (width and height checked independently)`});
  checks.push({label:'Recommended size',pass:longSide>=KDP_RECOMMENDED_LONG_SIDE,detail:longSide>=KDP_RECOMMENDED_LONG_SIDE?`${longSide}px — meets the ${KDP_RECOMMENDED_LONG_SIDE}px recommendation`:`${longSide}px — below the ${KDP_RECOMMENDED_LONG_SIDE}px recommendation, may look soft on high-res screens`,warning:longSide<KDP_RECOMMENDED_LONG_SIDE&&width>=KDP_MIN_WIDTH&&height>=KDP_MIN_HEIGHT});
  checks.push({label:'Aspect ratio',pass:Math.abs(ratio-KDP_RATIO)<=KDP_RATIO_TOLERANCE,detail:`${ratio.toFixed(2)}:1 — ideal is ${KDP_RATIO}:1`});
  if (fileSizeMB!==undefined) checks.push({label:'File size',pass:fileSizeMB<=KDP_MAX_FILE_SIZE_MB,detail:`${fileSizeMB.toFixed(2)}MB — KDP limit is ${KDP_MAX_FILE_SIZE_MB}MB`});
  const hardFails=checks.filter(c=>!c.pass&&!c.warning).length; return {checks,status:hardFails===0?'pass':'fail'};
}
function appleBefore(width,height){ const shortSide=Math.min(width,height); const checks=[{label:'Minimum width',pass:shortSide>=APPLE_MIN_SHORT_SIDE,detail:`${shortSide}px shortest side — minimum is ${APPLE_MIN_SHORT_SIDE}px`}]; return {checks,status:checks[0].pass?'pass':'fail'}; }

const eq = (a,b) => JSON.stringify(a) === JSON.stringify(b);
let allPass = true;

// EPUB
const epubPath = path.join(ROOT, 'private/downloads/kindle-formatting-handbook-sampler.epub');
const buf = fs.readFileSync(epubPath);
const zip = await JSZip.loadAsync(buf);
const before = await epubBefore(zip, buf.length);
const zip2 = await JSZip.loadAsync(buf);
const after = await runEpubChecks(zip2, buf.length);
console.log(`EPUB sample: ${path.basename(epubPath)}  (${before.passCount}/${before.total} pass)`);
for (let i=0;i<before.checks.length;i++){
  const b=before.checks[i], a=after.checks[i];
  const same = eq(b,a);
  if (!same) allPass=false;
  console.log(`  ${same?'OK ':'DIFF'} ${b.name}: ${b.status}`);
  if(!same){ console.log('     before:', JSON.stringify(b)); console.log('     after :', JSON.stringify(a)); }
}
console.log(`  scores match: passCount ${before.passCount}=${after.passCount} total ${before.total}=${after.total}\n`);

// COVER — a spread of cases incl. pass, fail, warning
const cases = [
  [2560,1600,'image/jpeg',3.2],
  [1600,2560,'image/jpeg',5.0],
  [800,1200,'image/png',0.5],
  [1200,1600,'image/jpeg',60],
  [2000,3000,'image/jpeg',2.1],
];
console.log('COVER cases (KDP + Apple):');
for (const [w,h,t,mb] of cases){
  const kOk = eq(kdpBefore(w,h,t,mb), kdpAfter(w,h,t,mb));
  const aOk = eq(appleBefore(w,h), appleAfter(w,h));
  if(!kOk||!aOk) allPass=false;
  console.log(`  ${(kOk&&aOk)?'OK ':'DIFF'} ${w}x${h} ${t} ${mb}MB  kdp=${kdpAfter(w,h,t,mb).status} apple=${appleAfter(w,h).status}`);
}

console.log(`\n${allPass ? 'ALL IDENTICAL — extraction is behavior-preserving.' : 'MISMATCH FOUND (see DIFF lines above).'}`);
