// Shared scoring for the readiness report. Each section normalizes its own
// checks to 0-100; the overall is a weight-normalized blend of present sections.
// Status vocabulary: 'pass' | 'warn' | 'fail' | 'skip' (skip = not countable).

// Section weights (design doc). Only the sections actually present count toward
// the overall, so weights renormalize automatically when some are absent.
export const SECTION_WEIGHTS = { epub: 40, cover: 20 };

export function sectionScore(statuses) {
  const countable = statuses.filter((s) => s !== 'skip');
  if (countable.length === 0) return null; // nothing to score → "Not assessed"
  const pass = countable.filter((s) => s === 'pass').length;
  const warn = countable.filter((s) => s === 'warn').length;
  return Math.round(((pass + 0.5 * warn) / countable.length) * 100);
}

// sections: [{ score: number|null, weight: number }]. Sections with score null
// (not assessed) are excluded from both numerator and denominator.
export function overallScore(sections) {
  const present = sections.filter((s) => s.score != null);
  const weightSum = present.reduce((a, s) => a + s.weight, 0);
  if (weightSum === 0) return null;
  return Math.round(present.reduce((a, s) => a + s.score * s.weight, 0) / weightSum);
}

// Map a cover check ({ pass, warning }) to the shared status vocabulary.
export function coverStatus(check) {
  if (check.warning) return 'warn';
  return check.pass ? 'pass' : 'fail';
}
