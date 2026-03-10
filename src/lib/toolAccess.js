// BookKraft AI v8.0 — Server-side tool access, credits, and Claude API

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const FREE_TOOLS = ['epub-validator', 'metadata-builder'];
const LOGIC_TOOLS = [
    'kindle-format-fixer', 'epub-formatter', 'toc-generator',
    'front-matter-generator', 'css-snippet-generator',
];

// ── Word counting ──
export function countWords(text) {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

// ── Credit costs per AI tool ──
export const TOOL_CREDIT_COSTS = {
    'kdp-keyword-finder': 1,
    'back-matter-generator': 2,
    'manuscript-cleanup': 3,
    'print-to-digital': 3,
    'style-sheet-auditor': 3,
};

// ── Word limits per tool ──
export const TOOL_WORD_LIMITS = {
    'manuscript-cleanup': 3000,
    'style-sheet-auditor': 5000,
    'print-to-digital': 4000,
    'kdp-keyword-finder': 500,
    'back-matter-generator': 500,
};

// ── Max tokens per tool for Claude ──
const TOOL_MAX_TOKENS = {
    'manuscript-cleanup': 4000,
    'back-matter-generator': 2000,
    'style-sheet-auditor': 3000,
    'print-to-digital': 4000,
    'kdp-keyword-finder': 1500,
};

/**
 * Check if a user has access to a specific tool.
 * Returns { allowed: true, user, profile } or a NextResponse error.
 */
export async function checkToolAccess(toolSlug) {
    // Free tools — no auth needed
    if (FREE_TOOLS.includes(toolSlug)) {
        return { allowed: true, user: null, profile: null };
    }

    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return {
            allowed: false,
            response: NextResponse.json({ error: 'unauthorized' }, { status: 401 }),
        };
    }

    const { data: profile } = await supabase
        .from('users')
        .select('credits_balance, has_logic_bundle, has_full_access, is_lifetime, is_admin')
        .eq('id', user.id)
        .single();

    if (!profile) {
        return {
            allowed: false,
            response: NextResponse.json({ error: 'no_profile' }, { status: 401 }),
        };
    }

    // Full Access or Lifetime — always allowed
    if (profile.has_full_access || profile.is_lifetime) {
        return { allowed: true, user, profile };
    }

    // Logic tools — require Essentials Bundle (has_logic_bundle)
    if (LOGIC_TOOLS.includes(toolSlug)) {
        if (profile.has_logic_bundle) {
            return { allowed: true, user, profile };
        }
        return {
            allowed: false,
            response: NextResponse.json(
                { error: 'bundle_required', purchase_url: '/pricing#essentials' },
                { status: 403 }
            ),
        };
    }

    // AI tools — require credits
    const cost = TOOL_CREDIT_COSTS[toolSlug];
    if (cost && profile.credits_balance < cost) {
        return {
            allowed: false,
            response: NextResponse.json(
                {
                    error: 'insufficient_credits',
                    credits_needed: cost,
                    credits_balance: profile.credits_balance,
                    purchase_url: '/pricing#credits',
                    message: `This tool costs ${cost} credit(s). You have ${profile.credits_balance}.`,
                },
                { status: 402 }
            ),
        };
    }

    return { allowed: true, user, profile };
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
