'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { TOOL_CREDIT_COSTS } from '@/lib/constants';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    async function loadProfile(userId) {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single();
            if (error) console.warn('Profile load error:', error.message);
            setProfile(data || {
                credits_balance: 0,
                has_logic_bundle: false,
                has_full_access: false,
                is_lifetime: false,
                is_admin: false,
            });
        } catch (err) {
            console.error('Failed to load profile:', err);
            setProfile({
                credits_balance: 0,
                has_logic_bundle: false,
                has_full_access: false,
                is_lifetime: false,
                is_admin: false,
            });
        }
    }

    async function refreshProfile() {
        if (user) await loadProfile(user.id);
    }

    // v8.0: Check if user can access a tool
    function checkToolAccess(toolSlug) {
        const freeTools = ['epub-validator', 'metadata-builder'];
        if (freeTools.includes(toolSlug)) return true;
        if (!profile) return false;
        if (profile.has_full_access || profile.is_lifetime) return true;

        // Logic tools: require Essentials Bundle
        const logicTools = [
            'kindle-format-fixer', 'epub-formatter', 'toc-generator',
            'front-matter-generator', 'css-snippet-generator',
        ];
        if (logicTools.includes(toolSlug)) {
            return profile.has_logic_bundle === true;
        }

        // AI tools: require sufficient credits
        const cost = TOOL_CREDIT_COSTS[toolSlug];
        if (cost) {
            return (profile.credits_balance || 0) >= cost;
        }

        return false;
    }

    // v8.0: Check if user has enough credits for a specific tool
    function hasCredits(toolSlug) {
        if (!profile) return false;
        if (profile.is_lifetime) return true;
        const cost = TOOL_CREDIT_COSTS[toolSlug];
        if (!cost) return true; // logic/free tools don't need credits
        return (profile.credits_balance || 0) >= cost;
    }

    // v8.0: Get access state for tool card badge
    function getToolAccessState(toolSlug) {
        const freeTools = ['epub-validator', 'metadata-builder'];
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
        const timeout = setTimeout(() => {
            setLoading((prev) => {
                if (prev) console.warn('Auth loading timed out after 5s');
                return false;
            });
        }, 5000);

        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    setUser(session.user);
                    await loadProfile(session.user.id);
                }
            } catch (err) {
                console.error('Session error:', err);
            } finally {
                clearTimeout(timeout);
                setLoading(false);
            }
        };
        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setUser(session.user);
                    await loadProfile(session.user.id);
                } else {
                    setUser(null);
                    setProfile(null);
                }
                setLoading(false);
            }
        );

        return () => {
            clearTimeout(timeout);
            subscription.unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut({ scope: 'global' });
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

export function useAuth() {
    return useContext(AuthContext);
}
