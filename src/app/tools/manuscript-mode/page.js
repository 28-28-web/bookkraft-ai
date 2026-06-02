import ManuscriptModeClient from '@/components/ManuscriptModeClient';

export const metadata = {
    title: 'Full Manuscript Mode — BookKraft AI',
    description: 'Upload your .docx or .txt manuscript and get a publish-ready EPUB in one step. Automatic formatting fixes, chapter detection, and EPUB 3.0 export.',
};

export default function ManuscriptModePage() {
    return <ManuscriptModeClient />;
}
