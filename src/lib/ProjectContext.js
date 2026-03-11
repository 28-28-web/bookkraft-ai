'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';

const ProjectContext = createContext({});

export function ProjectProvider({ children }) {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProjectState] = useState(null);
    const [loadingProjects, setLoadingProjects] = useState(false);

    // Load project list when user logs in
    const refreshProjects = useCallback(async () => {
        if (!user) { setProjects([]); return; }
        setLoadingProjects(true);
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (err) {
            console.error('Failed to load projects:', err);
        } finally {
            setLoadingProjects(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) refreshProjects();
    }, [user, refreshProjects]);

    // Restore last selected project from localStorage
    useEffect(() => {
        if (projects.length > 0 && !currentProject) {
            const savedId = localStorage.getItem('bk_active_project');
            const found = projects.find(p => p.id === savedId);
            if (found) setCurrentProjectState(found);
        }
    }, [projects, currentProject]);

    const setCurrentProject = (project) => {
        setCurrentProjectState(project);
        if (project) {
            localStorage.setItem('bk_active_project', project.id);
        } else {
            localStorage.removeItem('bk_active_project');
        }
    };

    // Load full project text (raw_html) for tool pre-fill
    const loadProjectText = useCallback(async (projectId) => {
        try {
            const res = await fetch(`/api/projects/${projectId}`);
            if (res.ok) {
                const data = await res.json();
                return data.raw_html || '';
            }
        } catch (err) {
            console.error('Failed to load project text:', err);
        }
        return '';
    }, []);

    // Create a new project
    const createProject = async (title, author) => {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, author }),
            });
            if (res.ok) {
                const data = await res.json();
                await refreshProjects();
                setCurrentProject(data);
                return data;
            }
        } catch (err) {
            console.error('Failed to create project:', err);
        }
        return null;
    };

    // Upload .docx to project
    const uploadToProject = async (projectId, file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch(`/api/projects/${projectId}/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                await refreshProjects();
            }
            return data;
        } catch (err) {
            console.error('Upload to project failed:', err);
            return { error: 'Upload failed' };
        }
    };

    // Update last_tool on project
    const updateLastTool = async (projectId, toolSlug) => {
        try {
            await fetch(`/api/projects/${projectId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ last_tool: toolSlug }),
            });
        } catch (err) {
            console.error('Failed to update last_tool:', err);
        }
    };

    // Delete a project
    const deleteProject = async (projectId) => {
        try {
            const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
            if (res.ok) {
                if (currentProject?.id === projectId) setCurrentProject(null);
                await refreshProjects();
                return true;
            }
        } catch (err) {
            console.error('Failed to delete project:', err);
        }
        return false;
    };

    return (
        <ProjectContext.Provider value={{
            projects, currentProject, setCurrentProject, loadingProjects,
            refreshProjects, createProject, uploadToProject,
            loadProjectText, updateLastTool, deleteProject,
        }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    return useContext(ProjectContext);
}
