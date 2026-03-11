'use client';

import { useState } from 'react';
import DevicePreview from '@/components/DevicePreview';

export default function TocGenerator() {
    const [input, setInput] = useState('');
    const [headings, setHeadings] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ['Kindle HTML', 'EPUB3 nav.xhtml', 'NCX XML', 'Plain Text'];

    const detectHeadings = (text) => {
        const lines = text.split('\n');
        const detected = [];
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            // # headings
            if (/^#{1,3}\s+/.test(trimmed)) {
                detected.push({ title: trimmed.replace(/^#+\s*/, ''), checked: true, level: (trimmed.match(/^#+/) || [''])[0].length });
                continue;
            }
            // Chapter/Part patterns
            if (/^(chapter|part|section|prologue|epilogue|introduction|conclusion)\s/i.test(trimmed)) {
                detected.push({ title: trimmed, checked: true, level: 1 });
                continue;
            }
            // ALL CAPS lines under 80 chars
            if (trimmed === trimmed.toUpperCase() && trimmed.length < 80 && /[A-Z]/.test(trimmed)) {
                detected.push({ title: trimmed, checked: true, level: 1 });
            }
        }
        return detected;
    };

    const handleInput = (e) => {
        const text = e.target.value;
        setInput(text);
        setHeadings(detectHeadings(text));
    };

    const toggleHeading = (i) => {
        const h = [...headings];
        h[i].checked = !h[i].checked;
        setHeadings(h);
    };

    const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const checked = headings.filter((h) => h.checked);

    const kindleHtml = `<nav epub:type="toc">
  <ol>
${checked.map((h) => `    <li><a href="#${slugify(h.title)}">${h.title}</a></li>`).join('\n')}
  </ol>
</nav>`;

    const epub3Nav = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>Table of Contents</title></head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>Table of Contents</h1>
    <ol>
${checked.map((h) => `      <li><a href="${slugify(h.title)}.xhtml">${h.title}</a></li>`).join('\n')}
    </ol>
  </nav>
</body>
</html>`;

    const ncxXml = `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="YOUR-BOOK-ID"/>
    <meta name="dtb:depth" content="1"/>
  </head>
  <docTitle><text>Your Book Title</text></docTitle>
  <navMap>
${checked.map((h, i) => `    <navPoint id="navpoint-${i + 1}" playOrder="${i + 1}">
      <navLabel><text>${h.title}</text></navLabel>
      <content src="${slugify(h.title)}.xhtml"/>
    </navPoint>`).join('\n')}
  </navMap>
</ncx>`;

    const plainText = checked.map((h, i) => `${i + 1}. ${h.title}`).join('\n');
    const outputs = [kindleHtml, epub3Nav, ncxXml, plainText];

    return (
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Input</h3>
                <textarea className="form-textarea" style={{ minHeight: '250px' }}
                    placeholder="Paste your manuscript or chapter headings (one per line)..."
                    value={input} onChange={handleInput} />

                {headings.length > 0 && (
                    <div className="heading-checklist">
                        <h4>{checked.length} chapters detected</h4>
                        {headings.map((h, i) => (
                            <label key={i} className="fix-checkbox">
                                <input type="checkbox" checked={h.checked} onChange={() => toggleHeading(i)} />
                                <span>{h.title}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="tool-output-card">
                <h3>Output</h3>
                <div className="output-tabs">
                    {tabs.map((t, i) => (
                        <button key={i} className={`output-tab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>
                            {t}
                        </button>
                    ))}
                </div>
                {checked.length > 0 ? (
                    <>
                        <textarea className="form-textarea code-output" style={{ minHeight: '300px', fontFamily: 'monospace', fontSize: '.85rem' }}
                            value={outputs[activeTab]} readOnly />
                        <div className="output-actions">
                            <button className="btn btn-primary btn-sm" onClick={() => navigator.clipboard.writeText(outputs[activeTab])}>
                                📋 Copy
                            </button>
                        </div>
                        <DevicePreview content={kindleHtml} format="html" />
                    </>
                ) : (
                    <div className="output-placeholder">Paste text on the left — headings will be detected automatically.</div>
                )}
            </div>
        </div>
    );
}
