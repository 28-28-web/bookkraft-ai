'use client';

import { AuthContext, useAuth } from '@/components/AuthProvider';
import { TOOL_CREDIT_COSTS } from '@/lib/toolCosts';
import { TOOLS } from '@/lib/tools';

// Free-tool set — single source of truth is lib/tools.js (t.free), the same
// derivation the server uses in lib/toolAccess.js. Access-neutral: client
// checkToolAccess only decides non-free tools (ToolPageClient short-circuits
// free tools via tool.free before this list is consulted).
const FREE_TOOLS = TOOLS.filter((t) => t.free).map((t) => t.slug);

const LOGIC_TOOLS = [
    'kindle-format-fixer', 'epub-formatter', 'toc-generator',
    'front-matter-generator', 'css-snippet-generator',
];

// Re-provides AuthContext with the tool-access helpers added, so useAuth()
// callers under the (app) route group keep working unchanged. Kept out of the
// root AuthProvider because lib/tools.js is ~28 KB gz on every page.
export function ToolAccessProvider({ children }) {
    const auth = useAuth();
    const { profile } = auth;

    function checkToolAccess(toolSlug) {
        if (FREE_TOOLS.includes(toolSlug)) return true;
        if (!profile) return false;
        if (profile.has_full_access || profile.is_lifetime) return true;

        if (LOGIC_TOOLS.includes(toolSlug)) {
            return profile.has_logic_bundle === true;
        }

        const cost = TOOL_CREDIT_COSTS[toolSlug];
        if (cost) {
            return (profile.credits_balance || 0) >= cost;
        }
        return false;
    }

    function hasCredits(toolSlug) {
        if (!profile) return false;
        if (profile.is_lifetime) return true;
        const cost = TOOL_CREDIT_COSTS[toolSlug];
        if (!cost) return true;
        return (profile.credits_balance || 0) >= cost;
    }

    function getToolAccessState(toolSlug) {
        if (FREE_TOOLS.includes(toolSlug)) return 'free';
        if (!profile) return 'locked';
        if (profile.has_full_access || profile.is_lifetime) return 'full_access';

        if (LOGIC_TOOLS.includes(toolSlug)) {
            return profile.has_logic_bundle ? 'logic_owned' : 'logic_locked';
        }

        const cost = TOOL_CREDIT_COSTS[toolSlug];
        if (cost) {
            return (profile.credits_balance || 0) >= cost ? 'ai_enough' : 'ai_short';
        }
        return 'locked';
    }

    return (
        <AuthContext.Provider value={{ ...auth, checkToolAccess, hasCredits, getToolAccessState }}>
            {children}
        </AuthContext.Provider>
    );
}
