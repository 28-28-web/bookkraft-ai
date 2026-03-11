'use client';

import { useState } from 'react';
import DevicePreview from '@/components/DevicePreview';

const SNIPPETS = {
    'drop-cap': {
        label: 'Drop Cap',
        description: 'Large first letter at the beginning of a chapter.',
        kindle: { css: `p.first-para::first-letter {\n  float: left;\n  font-size: 3em;\n  line-height: 1;\n  margin-right: 0.1em;\n  font-family: Georgia, serif;\n  font-weight: bold;\n}`, html: `<p class="first-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>` },
        epub: { css: `p.first-para::first-letter {\n  float: left;\n  font-size: 3.5em;\n  line-height: 0.8;\n  padding-right: 0.08em;\n  padding-top: 0.05em;\n  font-family: Georgia, serif;\n  color: #333;\n}`, html: `<p class="first-para">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>` },
    },
    'scene-break': {
        label: 'Scene Break',
        description: 'Visual divider between scenes within a chapter.',
        kindle: { css: `div.scene-break {\n  text-align: center;\n  margin: 1.5em 0;\n  font-size: 1.2em;\n  color: #666;\n}`, html: `<div class="scene-break">* * *</div>` },
        epub: { css: `hr.scene-break {\n  border: none;\n  text-align: center;\n  margin: 2em auto;\n  width: 30%;\n  height: 1px;\n  background: linear-gradient(to right, transparent, #999, transparent);\n}`, html: `<hr class="scene-break" />` },
    },
    'blockquote': {
        label: 'Blockquote',
        description: 'Styled quote block for epigraphs or citations.',
        kindle: { css: `blockquote {\n  margin: 1.5em 1em;\n  padding: 0.5em 1em;\n  border-left: 3px solid #999;\n  font-style: italic;\n  color: #555;\n}\nblockquote cite {\n  display: block;\n  margin-top: 0.5em;\n  font-style: normal;\n  font-size: 0.9em;\n  color: #777;\n}`, html: `<blockquote>\n  <p>The only way to do great work is to love what you do.</p>\n  <cite>— Steve Jobs</cite>\n</blockquote>` },
        epub: { css: `blockquote {\n  margin: 1.5em 2em;\n  padding: 1em 1.5em;\n  border-left: 4px solid #c9a84c;\n  background: rgba(201, 168, 76, 0.05);\n  font-style: italic;\n  color: #444;\n}\nblockquote cite {\n  display: block;\n  margin-top: 0.75em;\n  font-style: normal;\n  font-size: 0.85em;\n  text-align: right;\n  color: #888;\n}`, html: `<blockquote>\n  <p>The only way to do great work is to love what you do.</p>\n  <cite>— Steve Jobs</cite>\n</blockquote>` },
    },
    'pull-quote': {
        label: 'Pull Quote',
        description: 'Highlighted important text in a decorative frame.',
        kindle: { css: `.pull-quote {\n  margin: 2em 1em;\n  padding: 1em;\n  text-align: center;\n  font-size: 1.3em;\n  font-style: italic;\n  border-top: 2px solid #333;\n  border-bottom: 2px solid #333;\n}`, html: `<div class="pull-quote">The future belongs to those who believe in the beauty of their dreams.</div>` },
        epub: { css: `.pull-quote {\n  margin: 2em auto;\n  padding: 1.5em 2em;\n  max-width: 80%;\n  text-align: center;\n  font-size: 1.25em;\n  font-style: italic;\n  letter-spacing: 0.02em;\n  border-top: 2px solid #c9a84c;\n  border-bottom: 2px solid #c9a84c;\n  color: #333;\n}`, html: `<div class="pull-quote">The future belongs to those who believe in the beauty of their dreams.</div>` },
    },
    'first-line-indent': {
        label: 'First-Line Indent',
        description: 'Standard paragraph indentation for body text.',
        kindle: { css: `p {\n  text-indent: 1.5em;\n  margin: 0;\n  line-height: 1.6;\n}\np.no-indent {\n  text-indent: 0;\n}`, html: `<p>This is a regular paragraph with first-line indent applied automatically.</p>\n<p>Each new paragraph gets the indent. This creates a clean, traditional book look.</p>` },
        epub: { css: `p {\n  text-indent: 1.5em;\n  margin: 0.2em 0;\n  line-height: 1.7;\n  text-align: justify;\n}\np.no-indent,\nh1 + p,\nh2 + p,\nh3 + p {\n  text-indent: 0;\n}`, html: `<p>This is a regular paragraph with first-line indent applied automatically.</p>\n<p>Each new paragraph gets the indent. This creates a clean, traditional book look.</p>` },
    },
    'no-indent-after-heading': {
        label: 'No-Indent After Heading',
        description: 'Remove indent from the first paragraph after a chapter heading.',
        kindle: { css: `h1 + p,\nh2 + p,\nh3 + p {\n  text-indent: 0;\n}`, html: `<h1>Chapter One</h1>\n<p>This first paragraph has no indent after the heading.</p>\n<p>This second paragraph has the normal indent.</p>` },
        epub: { css: `h1 + p,\nh2 + p,\nh3 + p,\ndiv.scene-break + p {\n  text-indent: 0;\n}`, html: `<h1>Chapter One</h1>\n<p>This first paragraph has no indent because it follows a heading.</p>\n<p>This second paragraph has the normal first-line indent.</p>` },
    },
    'centered-text': {
        label: 'Centered Text',
        description: 'Center aligned text for title pages or section headers.',
        kindle: { css: `.centered {\n  text-align: center;\n  margin: 2em 0;\n}`, html: `<div class="centered">\n  <h1>My Book Title</h1>\n  <p>by Author Name</p>\n</div>` },
        epub: { css: `.centered {\n  text-align: center;\n  margin: 3em 0;\n}\n.centered h1 {\n  font-size: 2em;\n  margin-bottom: 0.5em;\n}\n.centered p {\n  font-size: 1.1em;\n  color: #555;\n}`, html: `<div class="centered">\n  <h1>My Book Title</h1>\n  <p>by Author Name</p>\n</div>` },
    },
    'poetry': {
        label: 'Poetry/Verse',
        description: 'Preserve line formatting for poems, lyrics, or structured verse.',
        kindle: { css: `.verse {\n  margin: 2em 1em;\n  white-space: pre-wrap;\n  font-style: italic;\n  line-height: 1.8;\n}\n.verse .indent {\n  padding-left: 2em;\n}`, html: `<div class="verse">\nTwo roads diverged in a yellow wood,\nAnd sorry I could not travel both\n<span class="indent">And be one traveler, long I stood</span>\nAnd looked down one as far as I could\n</div>` },
        epub: { css: `.verse {\n  margin: 2em 2em;\n  white-space: pre-wrap;\n  font-style: italic;\n  line-height: 2;\n  font-size: 1.05em;\n}\n.verse .indent {\n  padding-left: 3em;\n}`, html: `<div class="verse">\nTwo roads diverged in a yellow wood,\nAnd sorry I could not travel both\n<span class="indent">And be one traveler, long I stood</span>\nAnd looked down one as far as I could\n</div>` },
    },
    'sidebar-box': {
        label: 'Sidebar Box',
        description: 'Styled info box for tips, warnings, or asides.',
        kindle: { css: `.sidebar-box {\n  margin: 1.5em 0;\n  padding: 1em;\n  border: 1px solid #ccc;\n  background: #f9f9f9;\n}\n.sidebar-box h4 {\n  margin: 0 0 0.5em;\n  font-size: 1em;\n}`, html: `<div class="sidebar-box">\n  <h4>💡 Tip</h4>\n  <p>You can use sidebar boxes to highlight key takeaways or practical tips.</p>\n</div>` },
        epub: { css: `.sidebar-box {\n  margin: 2em 0;\n  padding: 1.5em;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  background: #fafaf5;\n  border-left: 4px solid #c9a84c;\n}\n.sidebar-box h4 {\n  margin: 0 0 0.5em;\n  font-size: 1.05em;\n}`, html: `<div class="sidebar-box">\n  <h4>💡 Tip</h4>\n  <p>You can use sidebar boxes to highlight key takeaways or practical tips.</p>\n</div>` },
    },
    'letter-dialogue': {
        label: 'Letter/Dialogue',
        description: 'Format letters, emails, or text messages within the narrative.',
        kindle: { css: `.letter {\n  margin: 2em 1em;\n  padding: 1em;\n  font-family: Georgia, serif;\n  font-style: italic;\n  border-top: 1px solid #999;\n  border-bottom: 1px solid #999;\n}\n.letter .salutation {\n  font-weight: bold;\n  margin-bottom: 0.5em;\n}\n.letter .signature {\n  text-align: right;\n  margin-top: 1em;\n}`, html: `<div class="letter">\n  <p class="salutation">Dear Elizabeth,</p>\n  <p>I hope this letter finds you well. I write to inform you of a most extraordinary discovery...</p>\n  <p class="signature">Yours truly,<br/>Mr. Darcy</p>\n</div>` },
        epub: { css: `.letter {\n  margin: 2em 2em;\n  padding: 1.5em 2em;\n  font-family: Georgia, serif;\n  font-style: italic;\n  background: #fdf8f0;\n  border-radius: 4px;\n  border: 1px solid #e8dcc8;\n}\n.letter .salutation {\n  font-weight: bold;\n  margin-bottom: 0.75em;\n}\n.letter .signature {\n  text-align: right;\n  margin-top: 1.5em;\n  font-style: normal;\n}`, html: `<div class="letter">\n  <p class="salutation">Dear Elizabeth,</p>\n  <p>I hope this letter finds you well. I write to inform you of a most extraordinary discovery...</p>\n  <p class="signature">Yours truly,<br/>Mr. Darcy</p>\n</div>` },
    },
};

export default function CssSnippetGenerator() {
    const [element, setElement] = useState('drop-cap');
    const [platform, setPlatform] = useState('both');

    const snippet = SNIPPETS[element];
    if (!snippet) return null;

    const getSnippet = () => {
        if (platform === 'kindle') return snippet.kindle;
        if (platform === 'epub') return snippet.epub;
        // "Both" = safe subset (use epub version)
        return snippet.epub;
    };

    const current = getSnippet();

    return (
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Select Element</h3>
                <div className="element-picker">
                    {Object.entries(SNIPPETS).map(([id, s]) => (
                        <button key={id} className={`element-btn ${element === id ? 'active' : ''}`} onClick={() => setElement(id)}>
                            {s.label}
                        </button>
                    ))}
                </div>
                <div className="form-group" style={{ marginTop: '1.5rem' }}>
                    <label className="form-label">Platform target</label>
                    {['kindle', 'epub', 'both'].map((p) => (
                        <label key={p} className="fix-checkbox">
                            <input type="radio" name="platform" checked={platform === p} onChange={() => setPlatform(p)} />
                            <span>{{ kindle: 'Kindle (KFX)', epub: 'EPUB Generic', both: 'Both (safe subset)' }[p]}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="tool-output-card">
                <h3>{snippet.label}</h3>
                <p className="snippet-desc">{snippet.description}</p>

                {/* Live preview */}
                <div className="snippet-preview">
                    <style dangerouslySetInnerHTML={{ __html: current.css }} />
                    <div dangerouslySetInnerHTML={{ __html: current.html }} />
                </div>

                {/* CSS code */}
                <div className="snippet-code-block">
                    <div className="snippet-code-header">
                        <span>CSS</span>
                        <button className="btn btn-outline btn-sm" onClick={() => navigator.clipboard.writeText(current.css)}>Copy CSS</button>
                    </div>
                    <pre className="snippet-code">{current.css}</pre>
                </div>

                {/* HTML code */}
                <div className="snippet-code-block">
                    <div className="snippet-code-header">
                        <span>HTML</span>
                        <button className="btn btn-outline btn-sm" onClick={() => navigator.clipboard.writeText(current.html)}>Copy HTML</button>
                    </div>
                    <pre className="snippet-code">{current.html}</pre>
                </div>

                {/* DevicePreview — most useful here per spec */}
                <DevicePreview content={`<style>${current.css}</style>${current.html}`} format="html" />
            </div>
        </div>
    );
}
