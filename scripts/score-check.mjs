// Self-check for readinessScore. Run: node scripts/score-check.mjs
import assert from 'node:assert';
import { sectionScore, overallScore, coverStatus, SECTION_WEIGHTS } from '../src/lib/readinessScore.js';

// sectionScore: pass=full, warn=half, fail=zero, skip excluded from denominator
assert.strictEqual(sectionScore(['pass', 'pass']), 100);
assert.strictEqual(sectionScore(['pass', 'fail']), 50);
assert.strictEqual(sectionScore(['pass', 'warn']), 75); // (1 + 0.5)/2
assert.strictEqual(sectionScore(['pass', 'fail', 'skip']), 50); // skip dropped
assert.strictEqual(sectionScore(['skip', 'skip']), null); // nothing countable

// coverStatus mapping
assert.strictEqual(coverStatus({ pass: true }), 'pass');
assert.strictEqual(coverStatus({ pass: false }), 'fail');
assert.strictEqual(coverStatus({ pass: false, warning: true }), 'warn');

// overallScore: weight-normalized over present sections
assert.strictEqual(overallScore([{ score: 100, weight: 40 }, { score: 40, weight: 20 }]), 80); // (4000+800)/60
assert.strictEqual(overallScore([{ score: 90, weight: 40 }, { score: null, weight: 20 }]), 90); // cover absent → EPUB only
assert.strictEqual(overallScore([{ score: null, weight: 40 }]), null);

assert.strictEqual(SECTION_WEIGHTS.epub, 40);
assert.strictEqual(SECTION_WEIGHTS.cover, 20);

console.log('score-check: all assertions passed.');
