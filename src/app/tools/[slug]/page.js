'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/components/Toast';
import Sidebar from '@/components/Sidebar';
import Modal from '@/components/Modal';
import { TOOLS } from '@/lib/tools';
import { PLAN_LIMITS, FREE_TOOLS } from '@/lib/constants';

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function ToolPage() {
    const { slug } = useParams();
    const tool = TOOLS.find((t) => t.id === slug);
    const { user, profile, refreshProfile, supabase } = useAuth();
    const { showToast } = useToast();

    const [fieldValues, setFieldValues] = useState({});
    const [output, setOutput] = useState('');
    const [generating, setGenerating] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    useEffect(() => {
        if (tool) {
            const initial = {};
            tool.fields.forEach((f) => {
                initial[f.id] = f.type === 'select' ? f.options[0] : '';
            });
            setFieldValues(initial);
        }
    }, [slug]);

    if (!tool) {
        return (
            <div className="app-layout">
                <Sidebar />
                <div className="main-content">
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <h3>Tool not found</h3>
                        <p>This tool doesn&apos;t exist.</p>
                        <Link href="/dashboard" className="btn btn-primary btn-sm" style={{ marginTop: '1rem', textDecoration: 'none' }}>
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const plan = profile?.plan || 'free';
    const locked = plan === 'free' && !FREE_TOOLS.includes(tool.id);

    const handleFieldChange = (fieldId, value) => {
        setFieldValues((prev) => ({ ...prev, [fieldId]: value }));
    };

    const handleGenerate = async () => {
        const runs = profile?.runs_this_month || 0;
        const limit = PLAN_LIMITS[plan] || 10;
        if (runs >= limit) { setShowUpgradeModal(true); return; }

        // Check required fields
        const hasEmpty = tool.fields.some((f) => f.type !== 'select' && !fieldValues[f.id]?.trim());
        if (hasEmpty) { showToast('Please fill in all fields before generating.', 'error'); return; }

        setGenerating(true);
        setOutput('');

        const prompt = tool.prompt(fieldValues);

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.error === 'limit_reached') { setShowUpgradeModal(true); return; }
                throw new Error(data.error || 'Generation failed');
            }

            setOutput(data.content);
            await refreshProfile();
            showToast('Content generated ✨');
        } catch (err) {
            setOutput('');
            showToast('Generation failed: ' + err.message, 'error');
        } finally {
            setGenerating(false);
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output).then(() => showToast('Copied to clipboard ✓'));
    };

    const handleSave = async () => {
        if (!output) return;
        try {
            await fetch('/api/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tool_slug: tool.id, inputs: fieldValues, output })
            });
            showToast('Saved to history ✓');
        } catch (err) {
            showToast('Failed to save', 'error');
        }
    };

    if (locked) {
        return (
            <div className="app-layout">
                <Sidebar />
                <div className="main-content">
                    <div className="tool-page-wrap">
                        <div className="empty-state">
                            <div className="empty-state-icon">🔒</div>
                            <h3>{tool.name} is locked</h3>
                            <p>Upgrade to a paid plan to use this tool.</p>
                            <Link href="/upgrade" className="btn btn-gold btn-sm" style={{ marginTop: '1rem', textDecoration: 'none' }}>
                                Upgrade Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <div className="tool-page-wrap">
                    <div className="tool-page-header">
                        <Link href="/dashboard" className="back-btn">← Back to Dashboard</Link>
                        <h1>{tool.name}</h1>
                        <p>{tool.desc}</p>
                    </div>
                    <div className="tool-layout">
                        <div className="tool-input-card">
                            <h3>Your Details</h3>
                            {tool.fields.map((f) => (
                                <div className="form-group" key={f.id}>
                                    <label className="form-label">{f.label}</label>
                                    {f.type === 'select' ? (
                                        <select
                                            className="form-select"
                                            value={fieldValues[f.id] || ''}
                                            onChange={(e) => handleFieldChange(f.id, e.target.value)}
                                        >
                                            {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    ) : f.type === 'textarea' ? (
                                        <textarea
                                            className="form-textarea"
                                            placeholder={f.placeholder || ''}
                                            value={fieldValues[f.id] || ''}
                                            onChange={(e) => handleFieldChange(f.id, e.target.value)}
                                        ></textarea>
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder={f.placeholder || ''}
                                            value={fieldValues[f.id] || ''}
                                            onChange={(e) => handleFieldChange(f.id, e.target.value)}
                                        />
                                    )}
                                </div>
                            ))}
                            <button
                                className="btn btn-primary generate-btn"
                                onClick={handleGenerate}
                                disabled={generating}
                            >
                                {generating ? (
                                    <><div className="spinner"></div> Generating...</>
                                ) : (
                                    '✨ Generate'
                                )}
                            </button>
                        </div>
                        <div className="tool-output-card">
                            <h3>Generated Content</h3>
                            <div>
                                {generating ? (
                                    <div className="loading-state">
                                        <div className="spinner"></div> Generating your content...
                                    </div>
                                ) : output ? (
                                    <div className="output-area" dangerouslySetInnerHTML={{ __html: escapeHtml(output) }}></div>
                                ) : (
                                    <div className="output-placeholder">
                                        Your AI-generated content will appear here. Fill in the fields and click Generate.
                                    </div>
                                )}
                            </div>
                            {output && !generating && (
                                <div className="output-actions">
                                    <button className="btn btn-outline btn-sm" onClick={handleCopy}>📋 Copy</button>
                                    <button className="btn btn-outline btn-sm" onClick={handleSave}>💾 Save</button>
                                    <button className="btn btn-outline btn-sm" onClick={handleGenerate}>🔄 Regenerate</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)}>
                <h3>You&apos;ve used all your free runs 🎉</h3>
                <p>You&apos;ve hit the limit for your plan this month. Upgrade to get more runs and access to all tools.</p>
                <div className="modal-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => setShowUpgradeModal(false)}>Maybe Later</button>
                    <Link href="/upgrade" className="btn btn-gold btn-sm" style={{ textDecoration: 'none' }}>Upgrade Now →</Link>
                </div>
            </Modal>
        </div>
    );
}
