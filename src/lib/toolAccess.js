// BookKraft AI v8.0 — Server-side tool access, credits, and Claude API

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { TOOLS } from '@/lib/tools';

// Derived from TOOLS (single source of truth) — see lib/tools.js.
const FREE_TOOLS = TOOLS.filter((t) => t.free).map((t) => t.slug);
const LOGIC_TOOLS = TOOLS.filter((t) => t.accessType === 'logic').map((t) => t.slug);

// ── Word counting ──
export function countWords(text) {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

// ── Credit costs per AI tool ──
// Derived from TOOLS (single source of truth). For the three chunked tools
// (manuscript-cleanup, print-to-digital, style-sheet-auditor) this is the
// PER-10K-WORDS rate, not a flat run cost — see calculateCreditCost. A base
// of 1 means an 80k-word novel (8 chunks) costs 8 credits, not 24. Verified
// against Starter (40 credits = 5 full 80k-word runs) and Pro (200 credits
// = 25 full runs) before shipping; do not raise these without rerunning
// that math.
export const TOOL_CREDIT_COSTS = Object.fromEntries(
    TOOLS.filter((t) => t.accessType === 'ai').map((t) => [t.slug, t.creditCost])
);

// ── Word limits per tool ──
// manuscript-cleanup, style-sheet-auditor, and print-to-digital no longer have
// a hard limit — long manuscripts go through the chunked job pipeline
// (see src/lib/ai/chunker.ts, src/lib/ai/runner.ts) instead of being rejected.
export const TOOL_WORD_LIMITS = {
    'kdp-keyword-finder': 500,
    'back-matter-generator': 500,
};

/**
 * Credit cost for a chunked job, scaled by manuscript length.
 * ceil(wordCount / 10000) * baseCreditsForTool, minimum 1.
 */
export function calculateCreditCost(toolSlug, wordCount) {
    const base = TOOL_CREDIT_COSTS[toolSlug];
    if (!base) return 0;
    return Math.max(1, Math.ceil(wordCount / 10000) * base);
}

// ── Max tokens per tool for Claude ──
const TOOL_MAX_TOKENS = {
    'manuscript-cleanup': 16000,  // cleaned_text ≈ input length; ~3000-word chunks need ~4500-12000 tokens; 16000 gives safe headroom within Haiku 4.5's 64000-token ceiling
    'back-matter-generator': 2000,
    'style-sheet-auditor': 3000,
    'print-to-digital': 4000,
    'kdp-keyword-finder': 1500,
};

function denyResponse(error, status, extra = {}) {
    return { allowed: false, response: NextResponse.json({ error, ...extra }, { status }) };
}

/**
 * Check if a user has access to a specific tool.
 * Returns { allowed: true, user, profile } or { allowed: false, response }.
 *
 * Fails closed: any unexpected error (auth lookup, profile fetch, unknown
 * tool slug) denies access. Never falls through to "allowed: true" on
 * exception or missing data.
 *
 * Access order, each short-circuiting before the next:
 *   1. Free tools — no auth needed.
 *   2. is_lifetime — unlimited, unconditional (job-level concurrency/24h
 *      word caps are enforced separately in lib/ai/jobs.js for chunked runs).
 *   3. has_full_access — legacy grandfathered accounts from the retired
 *      "Full Access" tier. Unconditional, no rate limit, exactly as before.
 *      No purchase flow sets this flag anymore; only pre-existing rows have it.
 *   4. has_logic_bundle — unlocks logic tools only, never touches credits.
 *   5. credits_balance — the real, enforced balance for everyone else
 *      (Starter/Pro purchasers and legacy credit-pack-only accounts).
 */
export async function checkToolAccess(toolSlug) {
    try {
        if (FREE_TOOLS.includes(toolSlug)) {
            return { allowed: true, user: null, profile: null };
        }

        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return denyResponse('unauthorized', 401);
        }

        const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('credits_balance, has_logic_bundle, has_full_access, is_lifetime, is_admin')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            return denyResponse('no_profile', 401);
        }

        // Lifetime — unconditional, unlimited. Concurrency + rolling 24h word
        // caps live in lib/ai/jobs.js createJob(), not here.
        if (profile.is_lifetime) {
            return { allowed: true, user, profile };
        }

        // Grandfathered legacy Full Access — unconditional, no rate limit,
        // exactly the behavior these accounts already had. Never set by new
        // purchases; only pre-existing rows carry this flag.
        if (profile.has_full_access) {
            return { allowed: true, user, profile };
        }

        // Logic tools never touch credits — has_logic_bundle alone unlocks them.
        if (LOGIC_TOOLS.includes(toolSlug)) {
            if (profile.has_logic_bundle) {
                return { allowed: true, user, profile };
            }
            return denyResponse('bundle_required', 403, { purchase_url: '/pricing' });
        }

        // AI tools — real, enforced credit balance. An unrecognized toolSlug
        // (no known cost) fails closed instead of silently allowing.
        const cost = TOOL_CREDIT_COSTS[toolSlug];
        if (!cost) {
            return denyResponse('unknown_tool', 400);
        }
        if (typeof profile.credits_balance !== 'number' || profile.credits_balance < cost) {
            return denyResponse('insufficient_credits', 402, {
                credits_needed: cost,
                credits_balance: profile.credits_balance ?? 0,
                purchase_url: '/pricing',
                message: `This tool costs ${cost} credit(s). You have ${profile.credits_balance ?? 0}.`,
            });
        }

        return { allowed: true, user, profile };
    } catch (err) {
        console.error('checkToolAccess failed closed:', err);
        return denyResponse('access_check_failed', 500);
    }
}

/**
 * Check word limit for a tool. Returns null if OK, or NextResponse error.
 */
export function checkWordLimit(toolSlug, text) {
    const limit = TOOL_WORD_LIMITS[toolSlug];
    if (!limit) return null;

    const wc = countWords(text || '');
    if (wc > limit) {
        return NextResponse.json(
            {
                error: 'word_limit_exceeded',
                message: `Input is ${wc} words. Limit is ${limit}.`,
                word_count: wc,
                limit,
            },
            { status: 400 }
        );
    }
    return null;
}

/**
 * Deduct credits after a successful AI tool run.
 * Call this ONLY after Claude returns a successful response.
 */
export async function deductCredits(userId, toolSlug) {
    const cost = TOOL_CREDIT_COSTS[toolSlug];
    if (!cost) return;

    const supabase = await createClient();
    await supabase.rpc('deduct_credits', {
        p_user_id: userId,
        p_cost: cost,
        p_tool_slug: toolSlug,
        p_history_id: null,
    });
}

/**
 * Save tool run to history table.
 */
export async function saveHistory({ userId, projectId, toolSlug, inputs, output, wordCount, creditsSpent, isSample }) {
    const supabase = await createClient();
    await supabase.from('history').insert({
        user_id: userId,
        project_id: projectId || null,
        tool_slug: toolSlug,
        inputs: inputs || {},
        output: typeof output === 'string' ? output : JSON.stringify(output),
        word_count: wordCount || 0,
        credits_spent: creditsSpent || 0,
        is_sample: isSample || false,
    });
}

/**
 * Call Claude API with structured JSON prompt.
 * Uses claude-haiku-4-5-20251001 as specified in v8.0.
 */
export async function callClaude({ system, user: userPrompt, maxTokens = 4000, temperature = 0, toolSlug }) {
    // Use tool-specific max_tokens if available
    const tokens = toolSlug && TOOL_MAX_TOKENS[toolSlug]
        ? TOOL_MAX_TOKENS[toolSlug]
        : maxTokens;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: tokens,
            temperature,
            system,
            messages: [{ role: 'user', content: userPrompt }],
        }),
    });

    if (!response.ok) {
        const errBody = await response.text();
        console.error('Anthropic API error:', errBody);
        throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.stop_reason === 'max_tokens') {
        console.error('Claude response truncated at token limit. Tool:', toolSlug, 'Limit:', tokens);
        throw new Error('Response truncated at token limit');
    }

    const text = data.content?.map((b) => b.text || '').join('') || '';

    // Parse JSON — strip markdown code fences if present
    const cleaned = text.replace(/```json\s*|\n?```\s*/g, '').trim();
    try {
        return JSON.parse(cleaned);
    } catch (err) {
        console.error('JSON parse error. Raw text:', text);
        throw new Error('Failed to parse AI response as JSON');
    }
}