'use client';

const TICKER_ITEMS = [
  { text: 'EPUB validated in 3 seconds', author: 'Sarah M., Romance Author' },
  { text: '200+ formatting errors fixed instantly', author: 'James C., Sci-Fi' },
  { text: 'KDP rejection gone after cleanup', author: 'Priya S., Non-fiction' },
  { text: 'TOC generated for 24-chapter novel', author: 'David P., Thriller' },
  { text: 'Switched from Vellum — works on Windows', author: 'Emma R., Childrens' },
  { text: 'Metadata ready for 4 platforms in 2 min', author: 'Michael T., Wide' },
  { text: 'Style sheet audited, 11 issues found', author: 'Laura K., Literary' },
  { text: 'Print-to-digital adapted a 380-page book', author: 'Chris W., History' },
  { text: 'KDP keyword rank jumped from page 4 to 1', author: 'Aisha B., Fantasy' },
  { text: 'Back matter generated in one click', author: 'Tom N., Mystery' },
];

// Duplicate for seamless infinite loop
const ALL_ITEMS = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function SocialProofTicker() {
  return (
    <div className="ticker-section" aria-hidden="true">
      <div className="ticker-inner">
        {ALL_ITEMS.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-item-dot" />
            <span>
              <strong>"{item.text}"</strong>
              {' — '}{item.author}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
