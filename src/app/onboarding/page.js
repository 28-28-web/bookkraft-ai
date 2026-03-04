'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/components/Toast';
import { ONBOARD_STEPS } from '@/lib/constants';

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const router = useRouter();
    const { supabase, user, refreshProfile } = useAuth();
    const { showToast } = useToast();

    const currentStep = ONBOARD_STEPS[step];

    const selectOption = (key, value) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    const handleNext = async () => {
        if (step < ONBOARD_STEPS.length - 1) {
            setStep(step + 1);
        } else {
            // Save and go to dashboard
            try {
                if (user) {
                    await supabase.from('users').update(answers).eq('id', user.id);
                    await refreshProfile();
                }
                router.push('/dashboard');
            } catch (err) {
                showToast('Failed to save preferences', 'error');
                router.push('/dashboard');
            }
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="onboard-wrap">
            <div className="onboard-card">
                <div className="onboard-step-dots">
                    {ONBOARD_STEPS.map((_, i) => (
                        <div
                            key={i}
                            className={`onboard-dot ${i < step ? 'done' : i === step ? 'active' : ''}`}
                        ></div>
                    ))}
                    <div className="onboard-dot"></div>
                </div>

                <h2 style={{ fontSize: '1.5rem', marginBottom: '.4rem' }}>{currentStep.title}</h2>
                <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '1.5rem' }}>{currentStep.subtitle}</p>

                <div className="onboard-options">
                    {currentStep.options.map((opt) => (
                        <div
                            key={opt.value}
                            className={`onboard-option ${answers[currentStep.key] === opt.value ? 'selected' : ''}`}
                            onClick={() => selectOption(currentStep.key, opt.value)}
                        >
                            <div className="onboard-option-icon">{opt.icon}</div>
                            <div className="onboard-option-label">{opt.label}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '.75rem', marginTop: '2rem' }}>
                    {step > 0 && (
                        <button className="btn btn-outline" onClick={handleBack}>Back</button>
                    )}
                    <button
                        className="btn btn-primary"
                        onClick={handleNext}
                        style={{ flex: 1, justifyContent: 'center' }}
                    >
                        {step === ONBOARD_STEPS.length - 1 ? 'Go to Dashboard →' : 'Continue →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
