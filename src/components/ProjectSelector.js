'use client';

import { useState } from 'react';
import { useProject } from '@/lib/ProjectContext';
import { useAuth } from '@/components/AuthProvider';

export default function ProjectSelector() {
    const { user } = useAuth();
    const { projects, currentProject, setCurrentProject, createProject, uploadToProject } = useProject();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [creating, setCreating] = useState(false);

    if (!user || projects.length === 0 && !showNew) return null;

    const handleCreate = async () => {
        if (!newTitle.trim()) return;
        setCreating(true);
        await createProject(newTitle, newAuthor);
        setNewTitle('');
        setNewAuthor('');
        setShowNew(false);
        setCreating(false);
    };

    return (
        <div className="project-selector" style={{ margin: 'var(--space-4) 0', padding: 'var(--space-3)', background: 'var(--cream)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            {/* Current project label */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                onClick={() => setShowDropdown(!showDropdown)}>
                <div>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--mid)', marginBottom: '2px' }}>Active Book</p>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--ink)' }}>
                        {currentProject ? currentProject.title : 'No book selected'}
                    </p>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--mid)' }}>{showDropdown ? '▲' : '▼'}</span>
            </div>

            {/* Dropdown */}
            {showDropdown && (
                <div style={{ marginTop: 'var(--space-3)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-3)' }}>
                    {projects.map(p => (
                        <div key={p.id}
                            onClick={() => { setCurrentProject(p); setShowDropdown(false); }}
                            style={{
                                padding: '8px 10px', borderRadius: 'var(--radius)', cursor: 'pointer',
                                background: currentProject?.id === p.id ? 'var(--gold-light)' : 'transparent',
                                marginBottom: '4px', transition: 'background .15s',
                            }}
                            onMouseEnter={e => { if (currentProject?.id !== p.id) e.target.style.background = '#f5f3ef'; }}
                            onMouseLeave={e => { if (currentProject?.id !== p.id) e.target.style.background = 'transparent'; }}
                        >
                            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{p.title}</p>
                            <p style={{ fontSize: '11px', color: 'var(--mid)' }}>
                                {p.word_count > 0 ? `${p.word_count.toLocaleString()} words` : 'No text uploaded'}
                                {p.last_tool && ` · Last: ${p.last_tool}`}
                            </p>
                        </div>
                    ))}

                    {/* Deselect */}
                    {currentProject && (
                        <button onClick={() => { setCurrentProject(null); setShowDropdown(false); }}
                            style={{ width: '100%', padding: '6px', fontSize: '12px', color: 'var(--mid)', background: 'none', border: 'none', cursor: 'pointer', marginTop: '4px' }}>
                            Clear selection
                        </button>
                    )}

                    {/* New book button */}
                    <button onClick={() => { setShowNew(true); setShowDropdown(false); }}
                        className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: 'var(--space-2)' }}>
                        + New Book
                    </button>
                </div>
            )}

            {/* New book form */}
            {showNew && (
                <div style={{ marginTop: 'var(--space-3)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-3)' }}>
                    <input className="form-input" placeholder="Book title" value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        style={{ fontSize: '13px', marginBottom: '6px' }} />
                    <input className="form-input" placeholder="Author (optional)" value={newAuthor}
                        onChange={e => setNewAuthor(e.target.value)}
                        style={{ fontSize: '13px', marginBottom: '8px' }} />
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-gold btn-sm" onClick={handleCreate} disabled={creating || !newTitle.trim()}
                            style={{ flex: 1 }}>
                            {creating ? 'Creating...' : 'Create'}
                        </button>
                        <button className="btn btn-outline btn-sm" onClick={() => setShowNew(false)} style={{ flex: 1 }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
