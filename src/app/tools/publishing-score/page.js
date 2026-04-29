import PublishingScoreClient from './PublishingScoreClient';

export const metadata = {
  title: 'Publishing Readiness Score — BookKraft AI',
  description: 'See how publish-ready your eBook really is. Get a scored breakdown across formatting, metadata, structure, and more.',
  alternates: { canonical: 'https://bookkraftai.com/tools/publishing-score' },
  robots: 'index, follow',
};

export default function PublishingScorePage() {
  return <PublishingScoreClient />;
}