// src/app/tools/[slug]/layout.js (or page wrapper)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    alternates: {
      canonical: `https://bookkraftai.com/tools/${slug}`,
    },
  };
}

export default function ToolLayout({ children }) {
  return children;
}
