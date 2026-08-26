import Link from 'next/link';

const requiredElements = [
  {
    element: '© Year Author Name',
    detail: 'The copyright symbol, publication year, and the legal name of the copyright holder. If publishing under a pen name, the pen name goes here. Example: © 2025 Sarah Mitchell',
  },
  {
    element: '"All rights reserved" statement',
    detail: 'The standard phrase asserting that no part of the book may be reproduced without permission. Most authors use the full boilerplate: "No part of this publication may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the publisher."',
  },
  {
    element: 'Publisher or imprint name',
    detail: 'For self-published authors: create an imprint name (e.g., "Inkwell Press" or "Riverside Publishing") or use your own name. Do not use "Self-published" — it is technically accurate but looks amateurish in the listing.',
  },
  {
    element: 'Edition statement',
    detail: 'For a first publication: "First published 2025" or "First edition." For a revised rerelease: "Second edition" or "Revised edition." Omit if this is your first and only version and you find it redundant.',
  },
  {
    element: 'ISBN (optional for KDP ebooks)',
    detail: "Amazon assigns an ASIN automatically — a KDP ebook does not require an ISBN. If you purchased one from Bowker or received a free KDP print ISBN, include it here in the format: ISBN: 978-x-xxx-xxxxx-x.",
  },
];

const fictionDisclaimer =
  'This is a work of fiction. Names, characters, businesses, places, events, locales, and incidents are either the products of the author\'s imagination or used in a fictitious manner. Any resemblance to actual persons, living or dead, or actual events is purely coincidental.';

const nonfictionDisclaimer =
  'The information in this book is provided for educational and informational purposes only. It is not intended as, and should not be taken as, professional [legal/medical/financial] advice. Readers should consult a qualified professional before making any decisions based on the information in this book.';

const faqs = [
  {
    q: 'What must appear on a copyright page?',
    a: "A self-published book copyright page requires: the copyright symbol with the year of publication and the copyright holder's legal name (© 2025 Jane Smith), an \"All rights reserved\" statement, your publisher or imprint name, and an edition statement. An ISBN is optional for KDP ebooks — Amazon assigns its own ASIN. For print-on-demand, include the country of manufacture.",
  },
  {
    q: 'Can I use a pen name on the copyright page?',
    a: 'Yes. Most self-published authors writing under a pen name list the pen name in the copyright notice (© 2025 Pen Name) to maintain the fiction consistently. If you want to assert your legal rights explicitly, add "Writing as Legal Name" on a separate line below. Either approach is legally valid. For formal copyright registration with the U.S. Copyright Office, you can list both your legal name and pen name on the registration form.',
  },
  {
    q: 'Do I need an ISBN on my copyright page?',
    a: "No — not for a KDP ebook. Amazon assigns an ASIN automatically, and KDP ebooks do not require an ISBN. If you have one (either purchased from Bowker or provided free by KDP for print), include it on the copyright page. If you're publishing on multiple platforms and want one ISBN across all of them, buy your own from Bowker rather than using a KDP-assigned ISBN, which is exclusive to Amazon.",
  },
  {
    q: 'Where does the copyright page go in the book?',
    a: 'The copyright page goes immediately after the title page — the second page of the front matter in standard publishing convention. In an EPUB, it should be the second XHTML file in the spine, right after the title page file. Amazon displays it in the "Look Inside" preview, so readers see it before purchase.',
  },
  {
    q: "What's the difference between a copyright page for fiction vs. nonfiction?",
    a: "The core legal language is the same. Fiction books typically add a disclaimer stating that characters, events, and places are fictitious. Nonfiction may add a disclaimer noting that the book is not professional advice (medical, legal, financial) if applicable. Both need the same copyright notice, \"All rights reserved\" statement, and publisher information.",
  },
];

export default function CopyrightPageTemplatePage() {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
        Copyright Page for a Book — Template and Examples
      </h1>

      <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 40, opacity: 0.9 }}>
        The copyright page is the second page of every published book — after the title page, before the dedication. For self-published authors, it does two things: asserts your ownership of the work and tells Amazon and other platforms that the book has been properly registered as your intellectual property. Getting it wrong doesn&apos;t invalidate your copyright, but an incomplete or amateurish copyright page is one of the things that signals an unpolished self-published book before a reader reaches chapter one.
      </p>

      {/* What goes on a copyright page */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        What goes on a copyright page
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
        Five elements. The first three are essential. The last two depend on your situation.
      </p>
      {requiredElements.map((el, i) => (
        <div key={i} style={{ marginBottom: 20, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{el.element}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{el.detail}</p>
        </div>
      ))}

      {/* Worked example */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 16 }}>
        Copyright page template — self-published ebook (KDP)
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20, opacity: 0.9 }}>
        This is the standard format for a KDP ebook published without an ISBN. Copy it and replace the placeholders.
      </p>
      <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 10, padding: '28px 32px', marginBottom: 16, fontFamily: 'Georgia, serif', fontSize: 15, lineHeight: 2 }}>
        <p style={{ textAlign: 'center', margin: '0 0 24px', fontSize: 16, fontStyle: 'italic', opacity: 0.6 }}>[Title Page precedes this page]</p>
        <p style={{ margin: '0 0 8px' }}>Copyright © 2025 [Author Name or Pen Name]</p>
        <p style={{ margin: '0 0 24px' }}>All rights reserved.</p>
        <p style={{ margin: '0 0 8px', fontSize: 14, opacity: 0.85 }}>No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.</p>
        <p style={{ margin: '24px 0 8px' }}>Published by [Imprint Name]</p>
        <p style={{ margin: '0 0 8px' }}>First published 2025</p>
      </div>
      <p style={{ fontSize: 14, opacity: 0.65, marginBottom: 40 }}>
        For fiction: add a disclaimer below the publisher line. For nonfiction with advice content: add a professional-advice disclaimer.
      </p>

      {/* Disclaimers */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
        Disclaimer language by book type
      </h2>
      <div style={{ display: 'grid', gap: 16, marginBottom: 48 }}>
        <div style={{ padding: '20px 24px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Fiction disclaimer</h3>
          <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.8, fontStyle: 'italic', margin: 0 }}>{fictionDisclaimer}</p>
        </div>
        <div style={{ padding: '20px 24px', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>Nonfiction advisory disclaimer</h3>
          <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.8, fontStyle: 'italic', margin: 0 }}>{nonfictionDisclaimer}</p>
          <p style={{ fontSize: 13, opacity: 0.6, marginTop: 10, marginBottom: 0 }}>Replace [legal/medical/financial] with the relevant field. Omit entirely for general nonfiction (history, memoir, craft) that carries no advisory risk.</p>
        </div>
      </div>

      {/* Pen name section */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
        Publishing under a pen name
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        Two formats are in common use. Choose based on whether you want the pen name to stand alone or whether you need to connect it to your legal identity for contractual or tax reasons:
      </p>
      <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
        <div style={{ padding: '16px 20px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8 }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 15, margin: 0, lineHeight: 1.8 }}>
            Copyright © 2025 [Pen Name]<br />
            <span style={{ fontSize: 13, opacity: 0.65 }}>— pen name only, most common for fiction</span>
          </p>
        </div>
        <div style={{ padding: '16px 20px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8 }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: 15, margin: 0, lineHeight: 1.8 }}>
            Copyright © 2025 [Pen Name]<br />
            Writing as [Legal Name]<br />
            <span style={{ fontSize: 13, opacity: 0.65 }}>— both names, used when legal name needs to be on record</span>
          </p>
        </div>
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, marginBottom: 48 }}>
        Both are legally valid. A copyright held under a pseudonym is enforceable. For U.S. Copyright Office registration, you can list the pen name as the &ldquo;author&rdquo; and include your legal name as the &ldquo;copyright claimant&rdquo; on Form TX — the registration will show both.
      </p>

      {/* EPUB placement */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
        Where the copyright page goes in an EPUB
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        In standard publishing order, the copyright page is the second document in the book — directly after the title page, before the dedication or table of contents:
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 48 }}>
        {['Title page (page 1)', 'Copyright page (page 2) ← this page', 'Dedication (page 3, optional)', 'Epigraph (optional)', 'Table of contents', 'Chapter one'].map((item, i) => (
          <div key={i} style={{ padding: '10px 16px', borderLeft: '3px solid rgba(201,168,76,0.4)', marginBottom: 4, fontSize: 16, opacity: item.includes('←') ? 1 : 0.75, fontWeight: item.includes('←') ? 600 : 400 }}>
            {item}
          </div>
        ))}
      </div>
      <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, marginBottom: 48 }}>
        In an EPUB file, the copyright page should be its own XHTML document in the{' '}
        <code style={{ fontSize: 14, background: 'rgba(201,168,76,0.1)', padding: '1px 5px', borderRadius: 3 }}>spine</code>{' '}
        of the OPF manifest, listed second after the title page file. When the{' '}
        <Link href="/tools/front-matter-generator" style={{ color: '#9c7f35', textDecoration: 'none' }}>Front Matter Generator</Link>
        {' '}produces your copyright page, it outputs the formatted text ready to paste into the correct XHTML file.
      </p>

      {/* CTA */}
      <div style={{ margin: '48px 0', padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
        <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Generate your copyright page — and your full front matter — in one step.</p>
        <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Title page, copyright page, dedication, and disclaimer. Formatted for KDP. Handles pen names and optional ISBNs automatically.</p>
        <Link
          href="/tools/front-matter-generator"
          style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
        >
          Open Front Matter Generator →
        </Link>
      </div>

      {/* FAQ */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 16 }}>
        Frequently asked questions
      </h2>
      {faqs.map((f, i) => (
        <div key={i} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>{f.a}</p>
        </div>
      ))}

      {/* Cross-links */}
      <p style={{ fontSize: 17, lineHeight: 1.7, marginTop: 40, opacity: 0.9 }}>
        The copyright page is one element of the broader front matter structure. For the full front matter order — title page, copyright, dedication, epigraph, TOC, and beyond — see the{' '}
        <Link href="/book-front-matter" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          book front matter guide
        </Link>
        . For the dedication page specifically, including samples and formatting conventions, see{' '}
        <Link href="/book-dedication-page" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          book dedication page examples
        </Link>
        . For EPUB file structure requirements when building your front matter files, see the{' '}
        <Link href="/kindle-epub-format" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          Kindle EPUB format guide
        </Link>
        .
      </p>
    </main>
  );
}
