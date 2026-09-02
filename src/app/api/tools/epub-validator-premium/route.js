import { NextResponse } from 'next/server';
import { checkToolAccess, callClaude, deductCredits, saveHistory, TOOL_CREDIT_COSTS } from '@/lib/toolAccess';

export async function POST(request) {
    try {
        const access = await checkToolAccess('epub-validator-premium');
        if (!access.allowed) return access.response;

        const { filename, results } = await request.json();
        if (!filename || !results) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        // Deduct credits after validation is complete
        if (access.user && access.profile && !access.profile.is_lifetime) {
            await deductCredits(access.user.id, 'epub-validator-premium');
        }

        // Save to history
        if (access.user) {
            await saveHistory({
                userId: access.user.id,
                toolSlug: 'epub-validator-premium',
                inputs: { filename },
                output: results,
                wordCount: 0,
                creditsSpent: access.profile?.is_lifetime ? 0 : TOOL_CREDIT_COSTS['epub-validator-premium'],
            });
        }

        // AI store-specific report — included in existing 3-credit price
        let storeReport = null;
        try {
            const checksContext = Array.isArray(results.checks)
                ? results.checks.map(c => `${c.name}: ${c.status.toUpperCase()} — ${c.detail}`).join('\n')
                : `${results.passCount}/${results.total} checks passed, no detail available`;

            storeReport = await callClaude({
                system: `You are generating a plain-language validation summary for an author who just ran their EPUB through structural checks.

You will receive: a list of structural check results (pass/fail/warning) and the specific validation errors found, including detected file size, manifest item count, cover presence, and any duplicate ID conflicts.

For each of these 4 stores — Amazon KDP, Apple Books, Google Play Books, IngramSpark — determine whether the file's current issues (if any) would cause a rejection, a warning, or no problem at all, based on each platform's known distinct requirements (e.g. IngramSpark requires an ISBN and stricter print-cover bleed specs that KDP and pure-ebook stores don't enforce).

Write the summary in plain language a non-technical author can act on. For each flagged issue, state: what it is, why it matters for that specific store, and the concrete fix.

Do not invent requirements you're not confident are accurate for a given store — if uncertain, say the check is inconclusive rather than asserting a pass or fail.

Return ONLY valid JSON. No markdown. No text outside the JSON.`,
                user: `EPUB validation results for "${filename}":

${checksContext}

Return ONLY this JSON:
{
  "amazonKdp": {
    "status": "pass|warn|fail",
    "summary": "one to two sentence plain-language verdict for this store",
    "issues": [{"check": "Check Name", "severity": "blocking|advisory", "fix": "concrete action to take"}]
  },
  "appleBooks": {
    "status": "pass|warn|fail",
    "summary": "...",
    "issues": [...]
  },
  "googlePlayBooks": {
    "status": "pass|warn|fail",
    "summary": "...",
    "issues": [...]
  },
  "ingramSpark": {
    "status": "pass|warn|fail",
    "summary": "...",
    "issues": [...]
  }
}

issues array must be empty [] when status is "pass". status must be "fail" only for checks that would cause an actual store rejection, "warn" for advisory issues, "pass" when the file is ready to upload.`,
                toolSlug: 'epub-validator-premium',
                temperature: 0,
            });
        } catch (aiErr) {
            console.error('EPUB store report AI error:', aiErr);
            // storeReport stays null — frontend shows graceful fallback
        }

        return NextResponse.json({ success: true, storeReport });

    } catch (err) {
        console.error('EPUB validator premium error:', err);
        return NextResponse.json({ error: 'server_error', message: err.message }, { status: 500 });
    }
}