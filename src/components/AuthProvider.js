'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

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
            setProfile(data || { plan: 'free', runs_this_month: 0 });
        } catch (err) {
            console.error('Failed to load profile:', err);
            setProfile({ plan: 'free', runs_this_month: 0 });
        }
    }

    async function refreshProfile() {
        if (user) await loadProfile(user.id);
    }

    useEffect(() => {
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

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
    };

    return (
        <AuthContext.Provider value={{ user, profile, loading, signOut, refreshProfile, supabase }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
