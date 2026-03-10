'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/components/Toast';
import Sidebar from '@/components/Sidebar';
import { TOOLS } from '@/lib/tools';

export default function HistoryPage() {
    const { user, loading: authLoading } = useAuth();
    const { showToast } = useToast();
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && user) loadHistory();
    }, [authLoading, user]);

    const loadHistory = async () => {
        try {
            const res = await fetch('/api/history');
            if (res.ok) {
                const data = await res.json();
                setHistory(data.map((h) => ({
                    ...h,
                    tool_name: TOOLS.find((t) => t.id === h.tool_slug)?.name || h.tool_slug
                })));
            }
        } catch (err) {
            console.error('Failed to load history:', err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = history.filter((h) =>
        !search || h.tool_name?.toLowerCase().includes(search.toLowerCase())
    );

    const copyItem = (item) => {
        navigator.clipboard.writeText(item.output);
        showToast('Copied ✓');
    };

    const deleteItem = async (id) => {
        try {
            await fetch(`/api/history?id=${id}`, { method: 'DELETE' });
            setHistory((prev) => prev.filter((h) => h.id !== id));
            showToast('Deleted');
        } catch (err) {
            showToast('Failed to delete', 'error');
        }
    };

    const downloadAll = () => {
        if (!history.length) { showToast('No history to download', 'error'); return; }
        const txt = history.map((h) =>
            `Tool: ${h.tool_name || h.tool_slug}\nDate: ${h.created_at}\n\n${h.output}\n\n${'─'.repeat(60)}\n`
        ).join('\n');
        const blob = new Blob([txt], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'bookkraft-history.txt';
        a.click();
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', marginBottom: '.25rem' }}>Output History</h1>
                        <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>All your saved AI-generated content.</p>
                    </div>
                    <button className="btn btn-outline btn-sm" onClick={downloadAll}>Download All</button>
                </div>
                <div className="history-search">
                    <input
                        className="form-input"
                        placeholder="Search by tool name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {loading ? (
                    <div className="loading-state"><div className="spinner"></div> Loading history...</div>
                ) : !filtered.length ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📭</div>
                        <h3>No saved outputs yet</h3>
                        <p>Generate some content and click Save to History.</p>
                    </div>
                ) : (
                    <div className="history-table">
                        <div className="history-row header">
                            <span>Tool</span><span>Credits</span><span>Date</span><span>Preview</span><span>Actions</span>
                        </div>
                        {filtered.map((h) => (
                            <div className="history-row" key={h.id}>
                                <span className="history-tool">{h.tool_name || h.tool_slug}</span>
                                <span style={{ color: h.credits_spent ? 'var(--gold)' : 'var(--mid)', fontWeight: 600, fontSize: '.8rem' }}>
                                    {h.credits_spent ? `${h.credits_spent} cr` : 'Free'}
                                </span>
                                <span style={{ color: 'var(--mid)', fontSize: '.8rem' }}>
                                    {new Date(h.created_at).toLocaleDateString()}
                                </span>
                                <span className="history-preview">{(h.output || '').substring(0, 80)}...</span>
                                <span>
                                    <button className="btn-icon" onClick={() => copyItem(h)} title="Copy">📋</button>
                                    <button className="btn-icon" onClick={() => deleteItem(h.id)} title="Delete">🗑️</button>
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
