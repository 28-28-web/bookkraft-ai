// Client-safe: no dependency on tools.js (which carries large seoContent strings).
// Update this whenever a tool's creditCost changes in tools.js.
export const TOOL_CREDIT_COSTS = {
  'manuscript-cleanup':    1,
  'print-to-digital':      1,
  'back-matter-generator': 3,
  'epub-validator-premium':2,
  'style-sheet-auditor':   1,
  'kdp-keyword-finder':    2,
};
