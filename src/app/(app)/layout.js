import { ToolAccessProvider } from '@/components/ToolAccessProvider';
import { ProjectProvider } from '@/lib/ProjectContext';

// Route group for the logged-in app (dashboard + tools). Providers here stay
// off the homepage and marketing pages. One shared layout (not per-folder) so
// the selected project survives navigating between dashboard and tools.
export default function AppLayout({ children }) {
  return (
    <ToolAccessProvider>
      <ProjectProvider>{children}</ProjectProvider>
    </ToolAccessProvider>
  );
}
