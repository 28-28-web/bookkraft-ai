'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { FREE_TOOLS } from '@/lib/constants';

export default function ToolCard({ tool, linkToSignup }) {
    const router = useRouter();
    const { profile } = useAuth();
    const plan = profile?.plan || 'free';
    const locked = plan === 'free' && !FREE_TOOLS.includes(tool.id);

    const handleClick = () => {
        if (linkToSignup) {
            router.push('/signup');
        } else if (locked) {
            router.push('/upgrade');
        } else {
            router.push(`/tools/${tool.id}`);
        }
    };

    return (
        <div className="tool-card" onClick={handleClick}>
            {locked && <div className="tool-lock">🔒</div>}
            <div className={`tool-icon ${tool.category}`}>{tool.icon}</div>
            <h3>{tool.name}</h3>
            <p>{tool.desc}</p>
            <span className={`tool-badge badge-${tool.category}`}>{tool.category}</span>
        </div>
    );
}
