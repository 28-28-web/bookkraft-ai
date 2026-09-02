'use client';

import { useState, useCallback } from 'react';
import DevicePreview from '@/components/DevicePreview';

// Encoding artifacts lookup map
const ENCODING_MAP = {
    'â€™': '’', 'â€˜': '‘', 'â€œ': '“', 'â€\u009d': '\u201d', 'â€"': '—',
    'â€"': '–', 'â€¦': '…', 'Ã©': 'é', 'Ã¨': 'è', 'Ã¡': 'á', 'Ã ': 'à',
    'Ã¶': 'ö', 'Ã¼': 'ü', 'Ã±': 'ñ', 'Â': '', '\u00c2\u00a0': ' ',
};

export default function KindleFormatFixer() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [summary, setSummary] = useState([]);
    const [fixes, setFixes] = useState({
        smartQuotes: true, emDashes: true, doubleSpaces: true, tabIndents: true,
        lineBreaks: true, doubleBlankLines: true, stripHtml: true, fixEncoding: true,
    });

    const processText = useCallback((text) => {
        if (!text.trim()) { setOutput(''); setSummary([]); return; }
        let result = text;
        const counts = {};

        // 1. Strip HTML tags
        if (fixes.stripHtml) {
            const before = result;
            result = result.replace(/<[^>]*>/g, '');
            const diff = before.length - result.length;
            if (diff > 0) counts['HTML tags stripped'] = Math.round(diff / 5);
        }

        // 2. Fix encoding artifacts
        if (fixes.fixEncoding) {
            let encFixes = 0;
            for (const [bad, good] of Object.entries(ENCODING_MAP)) {
                const regex = new RegExp(bad.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                const matches = result.match(regex);
                if (matches) { encFixes += matches.length; result = result.replace(regex, good); }
            }
            if (encFixes > 0) counts['encoding artifacts fixed'] = encFixes;
        }

        // 3. Fix em dashes
        if (fixes.emDashes) {
            // Protect standalone separator lines (---) before em-dash replacement
            const SEP = '\x02SCENEBREAK\x03';
            result = result.replace(/^-{3,}$/gm, SEP);
            let emCount = 0;
            const r1 = result.match(/\s*--\s*/g);
            if (r1) emCount += r1.length;
            result = result.replace(/\s*--\s*/g, ' — ');
            const r2 = result.match(/\s+-\s+/g);
            if (r2) emCount += r2.length;
            result = result.replace(/(?<!\w)\s+-\s+(?!\w)/g, ' — ');
            // Restore separator lines
            result = result.replace(new RegExp(SEP, 'g'), '---');
            if (emCount > 0) counts['em dashes fixed'] = emCount;
        }

        // 4. Smart quotes
        if (fixes.smartQuotes) {
            let quoteCount = 0;
            // Double quotes
            result = result.replace(/"([^"]*?)"/g, (m, p1) => { quoteCount++; return `“${p1}”`; });
            // Remaining straight double quotes: context-based
            result = result.replace(/(^|[\s(])"(\S)/gm, (m, p1, p2) => { quoteCount++; return `${p1}“${p2}`; });
            result = result.replace(/(\S)"([\s,.!?;:)]|$)/gm, (m, p1, p2) => { quoteCount++; return `${p1}”${p2}`; });
            // Single quotes / apostrophes
            result = result.replace(/(\w)'(\w)/g, '$1’$2'); // contractions
            result = result.replace(/(^|[\s(])'(\S)/gm, (m, p1, p2) => { quoteCount++; return `${p1}‘${p2}`; });
            result = result.replace(/(\S)'([\s,.!?;:)]|$)/gm, (m, p1, p2) => { quoteCount++; return `${p1}’${p2}`; });
            if (quoteCount > 0) counts['quote fixes'] = quoteCount;
        }

        // 5. Remove double spaces
        if (fixes.doubleSpaces) {
            const matches = result.match(/ {2,}/g);
            if (matches) { counts['double spaces removed'] = matches.length; result = result.replace(/ {2,}/g, ' '); }
        }

        // 6. Convert tabs
        if (fixes.tabIndents) {
            const matches = result.match(/^\t/gm);
            if (matches) { counts['tab indents converted'] = matches.length; result = result.replace(/^\t/gm, '    '); }
        }

        // 7. Normalize line endings
        if (fixes.lineBreaks) {
            const crlfCount = (result.match(/\r\n/g) || []).length;
            const crCount = (result.match(/\r(?!\n)/g) || []).length;
            result = result.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            if (crlfCount + crCount > 0) counts['line breaks normalized'] = crlfCount + crCount;
        }

        // 8. Remove triple+ blank lines
        if (fixes.doubleBlankLines) {
            const matches = result.match(/\n{3,}/g);
            if (matches) { counts['excessive blank lines removed'] = matches.length; result = result.replace(/\n{3,}/g, '\n\n'); }
        }

        setOutput(result);
        setSummary(Object.entries(counts).map(([k, v]) => `${v} ${k}`));
    }, [fixes]);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setInput(val);
        processText(val);
    };

    const handleFixToggle = (key) => {
        const newFixes = { ...fixes, [key]: !fixes[key] };
        setFixes(newFixes);
        // Re-run with new fixes
        setTimeout(() => processText(input), 0);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'formatted-manuscript.txt'; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Input</h3>
                <textarea
                    className="form-textarea"
                    style={{ minHeight: '300px' }}
                    placeholder="Paste your manuscript text here..."
                    value={input}
                    onChange={handleInputChange}
                />
                <div className="fix-checkboxes">
                    {Object.entries(fixes).map(([key, val]) => (
                        <label key={key} className="fix-checkbox">
                            <input type="checkbox" checked={val} onChange={() => handleFixToggle(key)} />
                            <span>{
                                {
                                    smartQuotes: 'Fix smart quotes', emDashes: 'Fix em dashes', doubleSpaces: 'Remove double spaces',
                                    tabIndents: 'Convert tab indents', lineBreaks: 'Normalize line breaks', doubleBlankLines: 'Remove double blank lines',
                                    stripHtml: 'Strip HTML tags', fixEncoding: 'Fix encoding artifacts'
                                }[key]
                            }</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="tool-output-card">
                <h3>Output</h3>
                {output ? (
                    <>
                        <textarea className="form-textarea" style={{ minHeight: '300px' }} value={output} readOnly />
                        {summary.length > 0 && (
                            <div className="fix-summary">
                                <strong>Fixed:</strong> {summary.join(' · ')}
                            </div>
                        )}
                        <div className="output-actions">
                            <button className="btn btn-primary btn-sm" onClick={handleCopy}>📋 Copy</button>
                            <button className="btn btn-outline btn-sm" onClick={handleDownload}>⬇ Download .txt</button>
                        </div>
                        <DevicePreview content={`<p>${output.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`} format="html" />
                    </>
                ) : (
                    <div className="output-placeholder">Paste text on the left to see formatted output here in real time.</div>
                )}
            </div>
        </div>
    );
}
