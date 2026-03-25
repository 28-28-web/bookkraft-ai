'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TOOLS } from '@/lib/tools';
import { FAQS, PRICING } from '@/lib/constants';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <>
      {/* ── HERO (dark) ── */}
      <section className="relative bg-gray-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-amber-400 mb-4">⚡ eBook formatting toolkit</p>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
              Format Your eBook<br />Like a Pro.
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              12 tools for indie authors. Fix Kindle errors, build valid EPUBs, generate TOCs. Start free — no credit card needed.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/tools/epub-validator" className="px-6 py-3 bg-amber-500 text-gray-950 font-semibold rounded-lg hover:bg-amber-400 transition">Try 2 Free Tools</Link>
              <Link href="/pricing" className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition">Get Full Access — $9.99</Link>
            </div>
            <p className="mt-6 text-sm text-gray-400">✦ Trusted by 3,000+ indie authors formatting for Kindle & EPUB</p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="font-bold text-lg text-white mb-2">Kindle Format Fixer</p>
              <p className="text-sm text-green-400 whitespace-pre-line">✓ 47 double spaces fixed
✓ 12 smart quotes converted
✓ 3 tab indents removed</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="font-bold text-lg text-white mb-2">EPUB Validator</p>
              <p className="text-sm text-red-400">✕ Missing nav.xhtml</p>
              <p className="text-sm text-green-400 whitespace-pre-line">✓ Valid container.xml
✓ Mimetype correct</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <p className="font-bold text-lg text-white mb-2">TOC Generator</p>
              <p className="text-sm text-gray-300 whitespace-pre-line">1. Chapter One — The Beginning
2. Chapter Two — Rising Action
3. Chapter Three — Climax</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE TOOLS CALLOUT ── */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-amber-600 font-semibold">START FREE</p>
          <h2 className="text-3xl font-bold mt-2">No Account Needed</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Two tools work immediately. No signup, no credit card. Just open and use.</p>
          <div className="mt-10 grid sm:grid-cols-2 gap-8 text-left">
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold">EPUB Validator</h3>
              <p className="mt-2 text-gray-600">Check your EPUB for errors before uploading. No Java, no signup.</p>
              <Link href="/tools/epub-validator" className="mt-4 inline-block text-amber-600 font-medium hover:underline">Open Free Tool</Link>
            </div>
            <div className="border rounded-xl p-6">
              <h3 className="text-xl font-semibold">Metadata Builder</h3>
              <p className="mt-2 text-gray-600">Create master metadata for KDP, IngramSpark, Draft2Digital, and EPUB OPF.</p>
              <Link href="/tools/metadata-builder" className="mt-4 inline-block text-amber-600 font-medium hover:underline">Open Free Tool</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOL GRID ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-amber-600 font-semibold text-center">THE TOOLKIT</p>
          <h2 className="text-3xl font-bold text-center mt-2">12 Tools. One Workflow.</h2>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">5 instant logic tools + 5 AI-powered tools + 2 free tools. Buy the bundle or pay per AI run.</p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="group">
                <div className="bg-white border rounded-xl p-6 h-full flex flex-col hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{t.icon}</span>
                    {t.free
                      ? <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">FREE</span>
                      : t.accessType === 'ai'
                        ? <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded-full">AI · {t.creditCost} credit{t.creditCost !== 1 ? 's' : ''}</span>
                        : <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Instant</span>
                    }
                  </div>
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p className="mt-2 text-sm text-gray-600 flex-1">{t.desc}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {t.free ? 'Free' : t.accessType === 'ai' ? `${t.creditCost} credit${t.creditCost !== 1 ? 's' : ''}` : 'Bundle'}
                    </span>
                    <span className="text-amber-600 font-medium group-hover:translate-x-1 transition-transform">Open →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPETITOR FRAMING ── */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-amber-600 font-semibold">WHY BOOKKRAFT</p>
          <h2 className="text-3xl font-bold mt-2">What Indie Authors Actually Need</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Vellum costs $249.99 and only runs on Mac. Atticus charges $147. BookKraft gives you the formatting tools you need for a fraction of the price — on any device.</p>
          <div className="mt-12 grid sm:grid-cols-3 gap-8 text-left">
            {[
              { title: 'Run on Any Device', desc: 'Web-based. Works on Mac, Windows, Chromebook, phone. No downloads.' },
              { title: 'Pay Once, Own Forever', desc: 'No subscriptions. Buy the Essentials Bundle or credits — they never expire.' },
              { title: 'AI Where It Matters', desc: '5 instant logic tools + 5 AI tools. AI handles the creative work, logic handles the formatting.' },
            ].map((item, i) => (
              <div key={i} className="border rounded-xl p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW (dark) ── */}
      <section className="bg-gray-950 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-amber-400 font-semibold">THE WORKFLOW</p>
          <h2 className="text-3xl font-bold mt-2">The eBook Formatting Workflow</h2>
          <div className="mt-12 space-y-8 text-left max-w-2xl mx-auto">
            {[
              { n: '01', t: 'Clean Your Manuscript', d: 'Manuscript Cleanup Tool' },
              { n: '02', t: 'Format for Kindle or EPUB', d: 'Kindle Format Fixer / EPUB Formatter' },
              { n: '03', t: 'Build Navigation', d: 'TOC Generator' },
              { n: '04', t: 'Add Front & Back Matter', d: 'Front Matter + Back Matter Generator' },
              { n: '05', t: 'Validate & Publish', d: 'EPUB Validator + KDP Keyword Finder' },
            ].map((s, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-3xl font-extrabold text-amber-500">{s.n}</span>
                <div>
                  <h3 className="text-lg font-semibold">{s.t}</h3>
                  <p className="text-gray-400 text-sm">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM COMPATIBILITY ── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold">
            Your formatted eBook works on every platform
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {['Amazon KDP', 'Apple Books', 'Barnes & Noble', 'Kobo', 'Draft2Digital',
              'Smashwords', 'OverDrive', 'Tolino', 'Scribd'].map((p) => (
              <span key={p} className="px-4 py-2 bg-white border rounded-full text-sm font-medium">{p}</span>
            ))}
          </div>
          <p className="mt-4 text-gray-400 text-sm">
            And more...
          </p>
        </div>
      </section>

      {/* ── REVIEWS / TESTIMONIALS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-amber-600 font-semibold text-center">REVIEWS</p>
          <h2 className="text-3xl font-bold text-center mt-2">What Authors Are Saying</h2>
          <p className="text-center text-gray-500 mt-3 max-w-xl mx-auto">
            Real feedback from indie authors who use BookKraft to format their eBooks.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Mitchell',
                role: 'Romance Author, 12 titles on KDP',
                stars: 5,
                text: 'I switched from Vellum because I needed something that works on my Windows laptop. BookKraft fixed 200+ formatting errors in my manuscript in under 30 seconds. The EPUB Validator alone saved me hours.',
              },
              {
                name: 'James Calder',
                role: 'Sci-Fi Author & Self-Publishing Coach',
                stars: 5,
                text: 'The Manuscript Cleanup tool caught 47 repeated words and 3 clichés I completely missed. The AI suggestions were actually useful, not generic. Best $7 I ever spent on a formatting tool.',
              },
              {
                name: 'Priya Sharma',
                role: 'Non-fiction Author, 3 titles',
                stars: 5,
                text: 'I was spending $300 on formatting for each book. Now I do it myself with BookKraft. The TOC Generator and Front Matter tools make it feel like I have a professional formatter on staff.',
              },
              {
                name: 'David Park',
                role: 'Thriller Author, 8 titles on KDP',
                stars: 5,
                text: 'The KDP Keyword Finder is incredible. My last book went from page 4 to page 1 in its sub-category within a week of updating my keywords. The category suggestions were spot-on.',
              },
              {
                name: 'Emma Rodriguez',
                role: 'Children\'s Book Author',
                stars: 4,
                text: 'I love that I can try the EPUB Validator and Metadata Builder for free without creating an account. That trust made me comfortable buying the full bundle. Clean, professional tool.',
              },
              {
                name: 'Michael Torres',
                role: 'Wide-Distribution Author, 20+ titles',
                stars: 5,
                text: 'I publish on KDP, Apple, Kobo, and Draft2Digital. The Metadata Builder saves me 30 minutes per book — one form, four platform outputs. The Print-to-Digital adapter is a game-changer for my backlist.',
              },
            ].map((review, i) => (
              <div key={i} className="border rounded-xl p-6">
                {/* Stars */}
                <div className="text-amber-500 text-lg mb-3">
                  {'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}
                </div>
                {/* Quote */}
                <blockquote className="text-gray-700 text-sm leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                {/* Author */}
                <div className="mt-4 border-t pt-4">
                  <p className="font-semibold text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING (v8.0 credit model) ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-widest text-amber-600 font-semibold text-center">PRICING</p>
          <h2 className="text-3xl font-bold text-center mt-2">Simple Pricing. No Subscriptions.</h2>
          <p className="text-center text-gray-600 mt-4">Buy once, own forever. Credits never expire. No monthly fees.</p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free */}
            <div className="bg-white border rounded-xl p-6 flex flex-col">
              <h3 className="text-xl font-bold">Free</h3>
              <p className="text-3xl font-extrabold mt-2">$0</p>
              <p className="text-sm text-gray-600 mt-2">2 tools, no signup, no limits.</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700 flex-1">
                <li>✓ EPUB Validator</li>
                <li>✓ Metadata Builder</li>
                <li>✓ No account needed</li>
                <li>✓ Unlimited use</li>
              </ul>
              <Link href="/tools/epub-validator" className="mt-6 block text-center py-2 border rounded-lg hover:bg-gray-50 transition font-medium">Start Free</Link>
            </div>

            {/* Essentials Bundle */}
            <div className="bg-white border rounded-xl p-6 flex flex-col">
              <h3 className="text-xl font-bold">{PRICING.essentials.name}</h3>
              <p className="text-3xl font-extrabold mt-2">{PRICING.essentials.label} <span className="text-sm font-normal text-gray-500">one-time</span></p>
              <p className="text-sm text-gray-600 mt-2">{PRICING.essentials.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700 flex-1">
                {PRICING.essentials.features.map((f, i) => <li key={i}>✓ {f}</li>)}
              </ul>
              <Link href="/pricing" className="mt-6 block text-center py-2 border rounded-lg hover:bg-gray-50 transition font-medium">Get Essentials</Link>
            </div>

            {/* Full Access (featured) */}
            <div className="bg-gray-950 text-white border-2 border-amber-500 rounded-xl p-6 flex flex-col relative">
              <h3 className="text-xl font-bold">{PRICING.full.name}</h3>
              <p className="text-3xl font-extrabold mt-2">{PRICING.full.label} <span className="text-sm font-normal text-gray-400">one-time</span></p>
              <p className="text-sm text-gray-300 mt-2">{PRICING.full.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-200 flex-1">
                {PRICING.full.features.map((f, i) => <li key={i}>✓ {f}</li>)}
              </ul>
              <Link href="/pricing" className="mt-6 block text-center py-2 bg-amber-500 text-gray-950 rounded-lg hover:bg-amber-400 transition font-semibold">Get Full Access</Link>
            </div>

            {/* Lifetime */}
            <div className="bg-white border rounded-xl p-6 flex flex-col">
              <h3 className="text-xl font-bold">{PRICING.lifetime.name}</h3>
              <p className="text-3xl font-extrabold mt-2">{PRICING.lifetime.label} <span className="text-sm font-normal text-gray-500">one-time</span></p>
              <p className="text-sm text-gray-600 mt-2">{PRICING.lifetime.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700 flex-1">
                {PRICING.lifetime.features.map((f, i) => <li key={i}>✓ {f}</li>)}
              </ul>
              <Link href="/pricing" className="mt-6 block text-center py-2 border rounded-lg hover:bg-gray-50 transition font-medium">Get Lifetime Deal</Link>
            </div>
          </div>

          {/* Credit packs under pricing */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold">AI Credit Packs</h3>
            <p className="text-gray-600 mt-2">Credits power AI tools. Buy once, use whenever — they never expire.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-white border rounded-xl p-6 text-left">
                <p className="text-lg font-bold">{PRICING.starterCredits.name}</p>
                <p className="text-2xl font-extrabold mt-1">{PRICING.starterCredits.label}</p>
                <p className="text-sm text-gray-600 mt-1">{PRICING.starterCredits.desc}</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  {PRICING.starterCredits.features.map((f, i) => <li key={i}>✓ {f}</li>)}
                </ul>
                <Link href="/pricing" className="mt-4 inline-block text-amber-600 font-medium hover:underline">Buy Credits</Link>
              </div>
              <div className="bg-white border rounded-xl p-6 text-left">
                <p className="text-lg font-bold">{PRICING.authorPro.name}</p>
                <p className="text-2xl font-extrabold mt-1">{PRICING.authorPro.label}</p>
                <p className="text-sm text-gray-600 mt-1">{PRICING.authorPro.desc}</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  {PRICING.authorPro.features.map((f, i) => <li key={i}>✓ {f}</li>)}
                </ul>
                <Link href="/pricing" className="mt-4 inline-block text-amber-600 font-medium hover:underline">Buy Credits</Link>
              </div>
            </div>
          </div>

          {/* Credit cost table */}
          <div className="mt-12 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-center mb-4">AI Tool Credit Costs</h3>
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2">Tool</th>
                  <th className="text-right px-4 py-2">Credits</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['KDP Keyword Finder', '1'],
                  ['Back Matter Generator', '2'],
                  ['Manuscript Cleanup', '3'],
                  ['Print-to-Digital Adapter', '3'],
                  ['Style Sheet Auditor', '3'],
                ].map(([name, cost], i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2 text-right">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />
      {/* ── Footer ── */}
      <Footer />
    </>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="bg-white py-20">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-sm uppercase tracking-widest text-amber-600 font-semibold text-center">FAQ</p>
        <h2 className="text-3xl font-bold text-center mt-2">Questions We Get a Lot</h2>
        <div className="mt-10 space-y-4">
          {FAQS.map((f, i) => (
            <div key={i} className="border rounded-lg">
              <button className="w-full flex justify-between items-center px-5 py-4 text-left font-medium" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                {f.q}
                <span className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <p className={`px-5 pb-4 text-gray-600 text-sm ${openIndex === i ? '' : 'hidden'}`}>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
