// Auto-derived from tools.js — the single source of truth for credit costs.
// Do NOT hand-edit this; change creditCost in tools.js instead.
import { TOOLS } from './tools';
export const TOOL_CREDIT_COSTS = Object.fromEntries(
    TOOLS.filter((t) => t.accessType === 'ai').map((t) => [t.slug, t.creditCost])
);
