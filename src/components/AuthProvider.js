'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { TOOL_CREDIT_COSTS } from '@/lib/toolCosts';
import { TOOLS } from '@/lib/tools';

// Free-tool set — single source of truth is lib/tools.js (t.free), the same
// derivation the server uses in lib/toolAccess.js. Access-neutral: client
// checkToolAccess only decides non-free tools (ToolPageClient short-circuits
// free tools via tool.free before this list is consulted).
const FREE_TOOLS = TOOLS.filter((t) => t.free).map((t) => t.slug);

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [supabase, setSupabase] = useState(null);

    // Defer the Supabase browser client (~49 KB gz) off the initial bundle:
    // dynamic-import it once the browser is idle so it never competes with the
    // homepage LCP. `loading` stays true until the client resolves and the
    // first auth event fires — so the nav shows a neutral slot (no
    // Sign-in→credits flicker) and tool pages keep their spinner instead of
    // flashing a premature "Sign in to use" lock.
    useEffect(() => {
        let cancelled = false;
        const boot = () =>
            import('@/lib/supabase/client')
                .then((m) => {
                    if (!cancelled) setSupabase(m.createClient());
                })
                .catch((err) => {
                    // Chunk failed to load — don't strand the UI in `loading`
                    // forever; fall back to the signed-out state.
                    console.error('Supabase client load failed:', err);
                    if (!cancelled) setLoading(false);
                });
        const idle =
            typeof window !== 'undefined' && 'requestIdleCallback' in window
                ? window.requestIdleCallback(boot, { timeout: 2000 })
                : setTimeout(boot, 0);
        return () => {
            cancelled = true;
            if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
                window.cancelIdleCallback(idle);
            } else {
                clearTimeout(idle);
            }
        };
    }, []);

    const FALLBACK_PROFILE = {
        credits_balance: 0,
        has_logic_bundle: false,
        has_full_access: false,
        is_lifetime: false,
        is_admin: false,
    };

    async function loadProfile(userId) {
        if (!supabase) return;
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('profile_timeout')), 10_000)
        );
        try {
            const { data, error } = await Promise.race([
                supabase.from('users').select('*').eq('id', userId).single(),
                timeout,
            ]);
            if (error) console.warn('Profile load error:', error.message);
            setProfile(data || FALLBACK_PROFILE);
        } catch (err) {
            if (err?.message === 'profile_timeout') {
                console.warn('loadProfile: 10s timeout — using fallback');
            } else {
                console.error('Failed to load profile:', err);
            }
            setProfile(FALLBACK_PROFILE);
        }
    }

    async function refreshProfile() {
        if (user) await loadProfile(user.id);
    }

    function checkToolAccess(toolSlug) {
        const freeTools = FREE_TOOLS;
        if (freeTools.includes(toolSlug)) return true;
        if (!profile) return false;
        if (profile.has_full_access || profile.is_lifetime) return true;

        const logicTools = [
            'kindle-format-fixer', 'epub-formatter', 'toc-generator',
            'front-matter-generator', 'css-snippet-generator',
        ];
        if (logicTools.includes(toolSlug)) {
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
        const freeTools = FREE_TOOLS;
        if (freeTools.includes(toolSlug)) return 'free';
        if (!profile) return 'locked';
        if (profile.has_full_access || profile.is_lifetime) return 'full_access';

        const logicTools = [
            'kindle-format-fixer', 'epub-formatter', 'toc-generator',
            'front-matter-generator', 'css-snippet-generator',
        ];
        if (logicTools.includes(toolSlug)) {
            return profile.has_logic_bundle ? 'logic_owned' : 'logic_locked';
        }

        const cost = TOOL_CREDIT_COSTS[toolSlug];
        if (cost) {
            return (profile.credits_balance || 0) >= cost ? 'ai_enough' : 'ai_short';
        }
        return 'locked';
    }

    useEffect(() => {
        if (!supabase) return;
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (session?.user) {
                    setUser(session.user);
                    setLoading(false);
                    loadProfile(session.user.id); // fire-and-forget; profile re-renders when ready
                } else {
                    setUser(null);
                    setProfile(null);
                    setLoading(false);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    const signOut = async () => {
        if (supabase) await supabase.auth.signOut({ scope: 'local' });
        setUser(null);
        setProfile(null);
    };

    return (
        <AuthContext.Provider value={{
            user, profile, loading, signOut,
            refreshProfile, checkToolAccess, hasCredits,
            getToolAccessState, supabase,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
