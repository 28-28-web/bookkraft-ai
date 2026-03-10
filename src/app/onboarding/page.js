'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { ONBOARD_STEPS, TOOL_RECOMMENDATIONS } from '@/lib/constants';
import { TOOLS } from '@/lib/tools';
import Link from 'next/link';

export default function OnboardingPage() {
    const { user, loading, supabase } = useAuth();
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
    }, [loading, user, router]);

    if (loading) return <div className="loading-state" style={{ paddingTop: '120px' }}><div className="spinner" /> Loading...</div>;
    if (!user) return null;

    const currentStep = ONBOARD_STEPS[step];
    const isLastFormStep = step === ONBOARD_STEPS.length - 1;
    const showRecommendations = step === ONBOARD_STEPS.length;

    const handleSelect = async (value) => {
        const newAnswers = { ...answers, [currentStep.key]: value };
        setAnswers(newAnswers);

        if (isLastFormStep) {
            // Save formatting_goal to profile
            try {
                await supabase.from('users').update({ formatting_goal: newAnswers.formatting_goal }).eq('id', user.id);
            } catch (err) {
                console.error('Failed to save onboarding:', err);
            }
            setStep(step + 1); // Show recommendations
        } else {
            setStep(step + 1);
        }
    };

    // Get recommendations
    const goal = answers.formatting_goal || 'unsure';
    const stage = answers.writing_stage || 'starting';
    const recommendedSlugs = TOOL_RECOMMENDATIONS[goal]?.[stage] || TOOL_RECOMMENDATIONS.unsure.starting;
    const recommendedTools = recommendedSlugs.map((s) => TOOLS.find((t) => t.slug === s)).filter(Boolean);

    if (showRecommendations) {
        return (
            <div className="onboard-wrap">
                <div className="onboard-card" style={{ maxWidth: '640px' }}>
                    <div className="onboard-step-dots">
                        {ONBOARD_STEPS.map((_, i) => <div key={i} className="onboard-dot done" />)}
                        <div className="onboard-dot active" />
                    </div>
                    <h2>Here&apos;s where to start</h2>
                    <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Based on your answers, we recommend these tools:</p>

                    <div className="recommended-tools">
                        {recommendedTools.map((tool) => (
                            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="recommended-tool" style={{ textDecoration: 'none' }}>
                                <span className="recommended-icon">{tool.icon}</span>
                                <div>
                                    <h4>{tool.name}</h4>
                                    <p>{tool.desc}</p>
                                </div>
                                <span className={`recommended-badge ${tool.free ? 'free' : 'paid'}`}>
                                    {tool.free ? 'Free' : `$${tool.price}`}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '.75rem', marginTop: '1.5rem' }}>
                        <Link href="/dashboard" className="btn btn-primary btn-full" style={{ textDecoration: 'none' }}>
                            Go to Dashboard →
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="onboard-wrap">
            <div className="onboard-card">
                <div className="onboard-step-dots">
                    {ONBOARD_STEPS.map((_, i) => (
                        <div key={i} className={`onboard-dot ${i < step ? 'done' : i === step ? 'active' : ''}`} />
                    ))}
                    <div className="onboard-dot" />
                </div>
                <h2>{currentStep.title}</h2>
                <p style={{ color: 'var(--muted)' }}>{currentStep.subtitle}</p>
                <div className="onboard-options">
                    {currentStep.options.map((opt) => (
                        <div key={opt.value} className={`onboard-option ${answers[currentStep.key] === opt.value ? 'selected' : ''}`}
                            onClick={() => handleSelect(opt.value)}>
                            <div className="onboard-option-icon">{opt.icon}</div>
                            <div className="onboard-option-label">{opt.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
