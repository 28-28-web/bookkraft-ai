import FreeToolsPage from './FreeToolsPage';
import { FREE_TOOLS } from '@/lib/constants';

export const metadata = {
  title: 'Free eBook Tools — EPUB Validator, Metadata Builder & More | BookKraft AI',
  description:
    `${FREE_TOOLS.length} free tools, no signup needed. Validate your EPUB, check your cover, build platform metadata, convert to EPUB, and scan your Word manuscript for formatting issues instantly.`,
  alternates: {
    canonical: 'https://bookkraftai.com/free-tools',
  },
};

export default function Page() {
  return <FreeToolsPage />;
}