'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useProject } from '@/lib/ProjectContext';
import { TOOLS } from '@/lib/tools';
import { TOOL_CATEGORIES, TOOL_CREDIT_COSTS } from '@/lib/constants';
import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
    const { user, profile, loading } = useAuth();
    const { projects, currentProject, setCurrentProject, createProject, uploadToProject, deleteProject } = useProject();
    const [activeCategory, setActiveCategory] = useState('all');
    const [showNewBook, setShowNewBook] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [creating, setCreating] = useState(false);
    const [uploading, setUploading] = useState(null); // projectId being uploaded to
    const fileRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                    <div className="loading-state"><div className="spinner" /> Loading...</div>
                </main>
            </div>
        );
    }

    if (!user) return null;

    const filteredTools = activeCategory === 'all'
        ? TOOLS
        : TOOLS.filter((t) => t.category === activeCategory);

    const getToolState = (tool) => {
        if (tool.free) return 'free';
        if (profile?.is_lifetime || profile?.has_full_access) return 'full_access';
        if (tool.accessType === 'logic') {
            return profile?.has_logic_bundle ? 'logic_owned' : 'logic_locked';
        }
        const cost = TOOL_CREDIT_COSTS[tool.slug] || 0;
        const balance = profile?.credits_balance || 0;
        return balance >= cost ? 'ai_enough' : 'ai_short';
    };

    const getStateBadge = (state, tool) => {
        const cost = TOOL_CREDIT_COSTS[tool.slug] || 0;
        switch (state) {
            case 'free': return <span className="badge badge-free">FREE</span>;
            case 'full_access': return <span className="badge" style={{ background: 'var(--gold)', color: 'var(--ink)', fontSize: '10px', padding: '2px 8px', borderRadius: '100px' }}>Unlocked</span>;
            case 'logic_owned': return <span className="badge" style={{ background: 'var(--gold-light)', color: 'var(--gold)', fontSize: '10px', padding: '2px 8px', borderRadius: '100px' }}>Owned</span>;
            case 'logic_locked': return <span className="badge" style={{ background: 'var(--border)', color: 'var(--mid)', fontSize: '10px', padding: '2px 8px', borderRadius: '100px' }}>$4.99 Bundle</span>;
            case 'ai_enough': return <span className="badge badge-ai">{cost} credit{cost !== 1 ? 's' : ''}</span>;
            case 'ai_short': return <span className="badge" style={{ background: '#FEF2F2', color: 'var(--rust)', fontSize: '10px', padding: '2px 8px', borderRadius: '100px' }}>Top Up</span>;
            default: return null;
        }
    };

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const name = user?.email?.split('@')[0] || 'there';

    const handleCreateBook = async () => {
        if (!newTitle.trim()) return;
        setCreating(true);
        const project = await createProject(newTitle, newAuthor);
        if (project) {
            setNewTitle('');
            setNewAuthor('');
            setShowNewBook(false);
        }
        setCreating(false);
    };

    const handleUpload = async (projectId, file) => {
        if (!file) return;
        setUploading(projectId);
        await uploadToProject(projectId, file);
        setUploading(null);
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                {/* Greeting + credit bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>{greeting}, {name}.</h1>
                        <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)' }}>
                            {profile?.is_lifetime
                                ? 'Lifetime Access — all tools unlocked.'
                                : profile?.has_full_access
                                    ? 'Full Access — all tools unlocked.'
                                    : 'Your eBook formatting toolkit.'}
                        </p>
                    </div>
                    {!profile?.is_lifetime && (
                        <Link href="/pricing#credits" style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '8px 16px', background: 'var(--gold-light)',
                            border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                            textDecoration: 'none', color: 'var(--ink)',
                        }}>
                            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 'var(--text-lg)' }}>
                                {profile?.credits_balance || 0}
                            </span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)' }}>credits</span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)', fontWeight: 600 }}>Top Up</span>
                        </Link>
                    )}
                </div>

                {/* ── My Books Section ── */}
                <div style={{ marginBottom: 'var(--space-8)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                        <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>My Books</h2>
                        <button className="btn btn-outline btn-sm" onClick={() => setShowNewBook(!showNewBook)}>
                            {showNewBook ? 'Cancel' : '+ New Book'}
                        </button>
                    </div>

                    {/* New book form */}
                    {showNewBook && (
                        <div style={{
                            padding: 'var(--space-4)', background: 'var(--cream)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)', marginBottom: 'var(--space-4)',
                        }}>
                            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                                <input className="form-input" placeholder="Book title" value={newTitle}
                                    onChange={e => setNewTitle(e.target.value)} style={{ flex: 2 }} />
                                <input className="form-input" placeholder="Author (optional)" value={newAuthor}
                                    onChange={e => setNewAuthor(e.target.value)} style={{ flex: 1 }} />
                            </div>
                            <button className="btn btn-gold btn-sm" onClick={handleCreateBook}
                                disabled={creating || !newTitle.trim()}>
                                {creating ? 'Creating...' : 'Create Book Project'}
                            </button>
                        </div>
                    )}

                    {/* Project cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                        {projects.map(p => (
                            <div key={p.id} style={{
                                padding: 'var(--space-4)', background: 'var(--white)',
                                border: currentProject?.id === p.id ? '2px solid var(--gold)' : '1px solid var(--border)',
                                borderRadius: 'var(--radius)', position: 'relative',
                            }}>
                                {currentProject?.id === p.id && (
                                    <span style={{
                                        position: 'absolute', top: '-8px', right: '12px',
                                        background: 'var(--gold)', color: 'var(--ink)', fontSize: '10px',
                                        fontWeight: 700, padding: '2px 8px', borderRadius: '100px',
                                    }}>ACTIVE</span>
                                )}
                                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '4px' }}>{p.title}</h3>
                                {p.author && <p style={{ fontSize: '12px', color: 'var(--mid)', marginBottom: '8px' }}>by {p.author}</p>}

                                <div style={{ fontSize: '12px', color: 'var(--mid)', marginBottom: '12px' }}>
                                    {p.has_text ? (
                                        <span style={{ color: 'var(--sage)' }}>{p.word_count.toLocaleString()} words uploaded</span>
                                    ) : (
                                        <span>No manuscript uploaded</span>
                                    )}
                                    {p.last_tool && <span> · Last: {p.last_tool}</span>}
                                </div>

                                {/* Upload button */}
                                {!p.has_text && (
                                    <div style={{ marginBottom: '8px' }}>
                                        <input type="file" accept=".docx,.txt" hidden ref={fileRef}
                                            onChange={e => handleUpload(p.id, e.target.files[0])} />
                                        <button className="btn btn-outline btn-sm" style={{ width: '100%' }}
                                            onClick={() => fileRef.current?.click()}
                                            disabled={uploading === p.id}>
                                            {uploading === p.id ? 'Uploading...' : 'Upload .docx or .txt'}
                                        </button>
                                    </div>
                                )}

                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button className="btn btn-gold btn-sm" style={{ flex: 1 }}
                                        onClick={() => { setCurrentProject(p); router.push('/tools/manuscript-cleanup'); }}>
                                        {p.has_text ? 'Continue' : 'Select'}
                                    </button>
                                    <button className="btn btn-outline btn-sm" style={{ flex: 0, padding: '6px 10px', color: 'var(--mid)' }}
                                        onClick={async () => { if (confirm('Delete this book project?')) await deleteProject(p.id); }}>
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Empty state */}
                        {projects.length === 0 && !showNewBook && (
                            <div style={{
                                padding: 'var(--space-6)', background: 'var(--cream)', border: '1px dashed var(--border)',
                                borderRadius: 'var(--radius)', textAlign: 'center', gridColumn: '1 / -1',
                            }}>
                                <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
                                    Create a book project to upload your manuscript once and use it across all tools.
                                </p>
                                <button className="btn btn-gold btn-sm" onClick={() => setShowNewBook(true)}>
                                    + Create Your First Book
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Category filter */}
                <div className="cat-filter">
                    {TOOL_CATEGORIES.map((c) => (
                        <button key={c.id} className={`cat-btn ${activeCategory === c.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(c.id)}>{c.label}</button>
                    ))}
                </div>

                {/* Tool grid */}
                <div className="dash-tools-grid" style={{ marginTop: 'var(--space-6)' }}>
                    {filteredTools.map((tool) => {
                        const state = getToolState(tool);
                        const isLocked = state === 'logic_locked';
                        const href = tool.free || state === 'full_access' || state === 'logic_owned' || state === 'ai_enough' || state === 'ai_short'
                            ? `/tools/${tool.slug}`
                            : '/pricing';

                        return (
                            <Link href={href} key={tool.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="tool-card" style={{
                                    opacity: isLocked ? 0.7 : 1,
                                    position: 'relative',
                                }}>
                                    <div className="tool-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {getStateBadge(state, tool)}
                                    </div>
                                    <h3 style={{ fontSize: 'var(--text-base)', marginTop: 'var(--space-3)' }}>{tool.name}</h3>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)', lineHeight: 1.5, marginTop: 'var(--space-2)', flex: 1 }}>
                                        {tool.desc}
                                    </p>
                                    <div className="tool-card-bottom" style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: 'var(--text-sm)', color: isLocked ? 'var(--mid)' : 'var(--gold)', fontWeight: 600 }}>
                                            {isLocked ? 'Locked' : 'Open'}
                                        </span>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>&#8594;</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

