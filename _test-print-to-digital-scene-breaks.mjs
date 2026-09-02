// Manual test: Print-to-Digital scene break and section divider handling
// Run: node _test-print-to-digital-scene-breaks.mjs
// Requires: ANTHROPIC_API_KEY in environment (same as production)
//
// Covers two distinct cases for standalone "---" lines:
//   Case 1: scene break between two ordinary paragraphs → should become "* * *"
//   Case 2: section divider immediately before a heading → heading preserved, "---" removed

import { config } from 'dotenv';
config({ path: '.env.local' });

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) { console.error('Missing ANTHROPIC_API_KEY'); process.exit(1); }

// Mirrors the buildUserPrompt logic in src/lib/ai/runner.ts
function buildPrompt(chunkText) {
    return `Convert this section of a larger print-formatted manuscript to eBook-ready digital format.
Apply these adaptations: all
Footnote format preference: endnotes
This is one chunk of a longer manuscript — adapt it on its own terms, do not reference other chunks.

For page references: use context to infer chapter. Replace "see page N" with "see [Chapter Name]".

For scene breaks and section dividers: a standalone line containing only "---" requires context-sensitive handling based on what immediately follows it.
- If the very next non-blank line looks like a section heading (short line, all-caps or title-cased, no terminal punctuation — e.g. "ENDNOTES", "APPENDIX", "Chapter Two", "Bibliography"): the "---" is a section divider, not a scene break. Remove the "---" entirely and preserve the heading on its own line with a blank line before it. Do NOT fuse the "---" with the heading text. Log in conversions with type "section_divider", original "---\\n[heading]", replacement "[heading] (section divider removed)".
- Otherwise, when "---" sits between two ordinary paragraphs: convert it to "* * *" (the standard eBook scene break convention). Log in conversions with type "scene_break", original "---", replacement "* * *".

For tables: a pipe-delimited table (lines starting with | or containing | separators) is a fixed-width print table.
- Simple tables (3 or fewer columns, no merged cells): convert to a semantic HTML table in the adapted text. Use <table><caption>Table: [inferred subject]</caption><thead>...</thead><tbody>...</tbody></table>. Log in conversions with type "table".
- Complex tables (4+ columns, merged cells, or unclear structure): leave the original table text unchanged and add an entry to needs_review with item: "Table: [first few words of table]" and reason: "Complex table requires manual reformatting for eBook accessibility; consider simplifying to 3 columns or converting to a list.".

TEXT:
${chunkText}

Return ONLY: {
  "adapted_text": "the full adapted text for this chunk",
  "conversions": [{"type": "page_reference|footnote|running_header|table|scene_break|section_divider|figure_ref", "original": "string", "replacement": "string"}],
  "needs_review": [{"item": "string", "reason": "string"}]
}`;
}

async function callClaude(userPrompt) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 2000,
            temperature: 0,
            system: 'You are an expert in converting print books to digital eBook format. Return ONLY valid JSON. No markdown.',
            messages: [{ role: 'user', content: userPrompt }],
        }),
    });
    const data = await res.json();
    const text = data.content?.map(b => b.text || '').join('') || '';
    return JSON.parse(text.replace(/```json\s*|\n?```\s*/g, '').trim());
}

// ── Test Case 1: scene break between two ordinary paragraphs ──────────────
const CASE_1_INPUT = `She set the letter down and did not pick it up again.

---

The morning came in through the curtains the same as always, indifferent to everything that had changed overnight.`;

// ── Test Case 2: "---" immediately before a heading (section divider) ──────
const CASE_2_INPUT = `...single most common source of formatting errors in converted manuscripts.

---

ENDNOTES

1. This distinction between print and digital layout is covered in detail in the Chicago Manual of Style, 17th edition, section 2.4.`;

async function run() {
    console.log('=== Case 1: scene break between paragraphs ===');
    console.log('Input:\n', CASE_1_INPUT, '\n');
    const r1 = await callClaude(buildPrompt(CASE_1_INPUT));
    console.log('adapted_text:\n', r1.adapted_text);
    console.log('conversions:', JSON.stringify(r1.conversions, null, 2));
    const ok1 = r1.adapted_text.includes('* * *') && !r1.adapted_text.includes('---');
    console.log(ok1 ? '✅ PASS: --- converted to * * *' : '❌ FAIL: expected * * * in adapted_text');

    console.log('\n=== Case 2: section divider before heading ===');
    console.log('Input:\n', CASE_2_INPUT, '\n');
    const r2 = await callClaude(buildPrompt(CASE_2_INPUT));
    console.log('adapted_text:\n', r2.adapted_text);
    console.log('conversions:', JSON.stringify(r2.conversions, null, 2));
    const ok2a = !r2.adapted_text.includes('---ENDNOTES');
    const ok2b = r2.adapted_text.includes('ENDNOTES');
    console.log(ok2a ? '✅ PASS: heading not fused with ---' : '❌ FAIL: ---ENDNOTES fusion found');
    console.log(ok2b ? '✅ PASS: ENDNOTES heading preserved' : '❌ FAIL: ENDNOTES heading missing');
}

run().catch(err => { console.error(err); process.exit(1); });
