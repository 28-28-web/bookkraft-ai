#!/usr/bin/env node
// Usage: npm run content-check
// Checks all three content data files before committing new entries.
// Checks: minimum prose length, empty related[] regression, Jaccard overlap.

import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Data loading ──────────────────────────────────────────────────────────────
// The source files use ESM export syntax (no "type":"module" in package.json),
// so we strip the export keywords and eval via Function constructor.
// Safe here: files contain only static literal data, no imports or variable refs.

function loadDataArray(relPath) {
  let src = readFileSync(join(__dirname, '..', relPath), 'utf8');
  // Drop the helper function (getXBySlug) and everything after it
  src = src.replace(/\nexport function[\s\S]*/m, '');
  // Replace "export const NAME = " with "return "
  src = src.replace(/^export const \w+ = /m, 'return ');
  return new Function(src)();
}

const epubErrors        = loadDataArray('src/lib/epubErrors.js');
const platformRejections = loadDataArray('src/lib/platformRejections.js');
const vsAlternatives    = loadDataArray('src/lib/vsAlternatives.js');
const checklists        = loadDataArray('src/lib/checklists.js');
const mistakes          = loadDataArray('src/lib/mistakes.js');

// ── Prose extraction ──────────────────────────────────────────────────────────

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&\w+;/g, ' ');
}

function epubErrorProse(e) {
  return stripHtml(`${e.cause} ${e.fixSteps}`);
}

function platformRejectionProse(r) {
  const reasons = r.topReasons.map((t) => `${t.title} ${t.description}`).join(' ');
  return stripHtml(`${r.intro} ${reasons}`);
}

function alternativeProse(a) {
  const why = a.whySwitch.map((w) => `${w.title} ${w.description}`).join(' ');
  return stripHtml(`${a.intro} ${why}`);
}

function checklistProse(c) {
  const items = c.sections.map((s) => `${s.heading} ${s.items.join(' ')}`).join(' ');
  return stripHtml(`${c.intro} ${items}`);
}

function mistakeProse(m) {
  const items = m.mistakes.map((i) => `${i.title} ${i.description}`).join(' ');
  return stripHtml(`${m.intro} ${items}`);
}

// ── Unified entry list ────────────────────────────────────────────────────────

const entries = [
  ...epubErrors.map((e) => ({
    id: `epub-errors/${e.slug}`,
    prose: epubErrorProse(e),
    related: e.related,
  })),
  ...platformRejections.map((r) => ({
    id: `platform-rejection/${r.slug}`,
    prose: platformRejectionProse(r),
    related: r.related,
  })),
  ...vsAlternatives.map((a) => ({
    id: `alternatives/${a.slug}`,
    prose: alternativeProse(a),
    related: a.related,
  })),
  ...checklists.map((c) => ({
    id: `checklist/${c.slug}`,
    prose: checklistProse(c),
    related: c.related,
  })),
  ...mistakes.map((m) => ({
    id: `mistakes/${m.slug}`,
    prose: mistakeProse(m),
    related: m.related,
  })),
];

// ── Jaccard utilities ─────────────────────────────────────────────────────────

const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with',
  'by','from','up','about','into','through','is','are','was','were','be',
  'been','being','have','has','had','do','does','did','will','would','shall',
  'should','may','might','can','could','it','its','this','that','these',
  'those','i','you','he','she','we','they','what','which','who','when',
  'where','why','how','not','no','if','as','so','than','then','also',
]);

function tokenize(text) {
  return text.toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function jaccard(tokensA, tokensB) {
  const sa = new Set(tokensA);
  const sb = new Set(tokensB);
  let inter = 0;
  for (const w of sa) if (sb.has(w)) inter++;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 0 : inter / union;
}

// ── Run checks ────────────────────────────────────────────────────────────────

const MIN_PROSE_CHARS = 400;
const OVERLAP_THRESHOLD = 0.35;
let failures = 0;

function fail(msg) {
  console.error(`  FAIL  ${msg}`);
  failures++;
}

console.log(`\nChecking ${entries.length} entries (${epubErrors.length} epub-errors, ${platformRejections.length} platform-rejection, ${vsAlternatives.length} alternatives, ${checklists.length} checklists, ${mistakes.length} mistakes)\n`);

// Check 1: Minimum prose length
console.log(`── Length check (min ${MIN_PROSE_CHARS} chars) ──────────────────────────────────`);
for (const e of entries) {
  const len = e.prose.replace(/\s+/g, ' ').trim().length;
  if (len < MIN_PROSE_CHARS) {
    fail(`${e.id}: ${len} chars (min ${MIN_PROSE_CHARS}) — content too thin`);
  }
}
console.log('   done\n');

// Check 2: Empty related[] regression + unknown type guard
// Entries without a `related` field at all are pre-linking-system — silently skip.
// An entry that has `related: []` explicitly is an error (probably cleared by accident).
const KNOWN_TYPES = new Set(['epub-error', 'platform-rejection', 'alternative', 'checklist', 'mistake', 'flat-alternative', 'cover-requirement']);
console.log('── Related field check ──────────────────────────────────────────────────────');
for (const e of entries) {
  if (Array.isArray(e.related) && e.related.length === 0) {
    fail(`${e.id}: related: [] is empty — add cross-pattern links or remove the field entirely`);
  }
  if (Array.isArray(e.related)) {
    for (const item of e.related) {
      if (!KNOWN_TYPES.has(item.type)) {
        fail(`${e.id}: related[] contains unknown type "${item.type}" — add it to KNOWN_TYPES or fix the typo`);
      }
    }
  }
}
console.log('   done\n');

// Check 3: Jaccard overlap across all pairs
console.log(`── Overlap check (Jaccard ≥ ${OVERLAP_THRESHOLD}) ──────────────────────────────────────`);
const tokenized = entries.map((e) => tokenize(e.prose));
for (let i = 0; i < entries.length; i++) {
  for (let j = i + 1; j < entries.length; j++) {
    const score = jaccard(tokenized[i], tokenized[j]);
    if (score >= OVERLAP_THRESHOLD) {
      fail(
        `${entries[i].id} ↔ ${entries[j].id}\n` +
        `         Jaccard ${score.toFixed(2)} ≥ ${OVERLAP_THRESHOLD} — review for duplicate or near-duplicate content`
      );
    }
  }
}
console.log('   done\n');

// ── Summary ───────────────────────────────────────────────────────────────────
if (failures === 0) {
  console.log(`✓ All checks passed (${entries.length} entries)\n`);
  process.exit(0);
} else {
  console.error(`✗ ${failures} check(s) failed — fix before committing new content entries\n`);
  process.exit(1);
}
