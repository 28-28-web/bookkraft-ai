'use client';

import { useState, useMemo } from 'react';

const DISCLAIMERS = {
    fiction: 'This is a work of fiction. Names, characters, places, and incidents are products of the author\'s imagination or are used fictitiously. Any resemblance to actual events, locales, or persons, living or dead, is entirely coincidental.',
    health: 'This book is not intended as a substitute for the medical advice of physicians. The reader should regularly consult a physician in matters relating to their health, particularly with respect to any symptoms that may require diagnosis or medical attention.',
    finance: 'This book is for informational purposes only and does not constitute financial advice. The author is not a licensed financial advisor. Always consult a qualified professional before making financial decisions.',
    general: 'The information in this book is provided for educational purposes only. While every effort has been made to ensure accuracy, the author makes no guarantees regarding the completeness or accuracy of the contents.',
};

export default function FrontMatterGenerator() {
    const [form, setForm] = useState({
        title: '', subtitle: '', author: '', penName: '', year: new Date().getFullYear().toString(),
        publisher: 'Self-Published', isbn: '', edition: 'First', dedication: '', disclaimer: 'none',
        sections: { titlePage: true, copyrightPage: true, dedicationPage: true, disclaimerPage: true },
    });
    const [copyHtml, setCopyHtml] = useState(false);

    const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));
    const toggleSection = (key) => setForm((f) => ({ ...f, sections: { ...f.sections, [key]: !f.sections[key] } }));

    const sections = useMemo(() => {
        const result = [];
        if (form.sections.titlePage) {
            result.push({
                name: 'Title Page',
                html: `<div class="title-page">\n  <h1>${form.title || 'Book Title'}</h1>${form.subtitle ? `\n  <h2>${form.subtitle}</h2>` : ''}\n  <p class="author">by ${form.author || 'Author Name'}</p>${form.penName ? `\n  <p class="pen-name">${form.penName}</p>` : ''}\n</div>`,
                text: `${form.title || 'Book Title'}${form.subtitle ? '\n' + form.subtitle : ''}\n\nby ${form.author || 'Author Name'}${form.penName ? '\n(' + form.penName + ')' : ''}`,
            });
        }
        if (form.sections.copyrightPage) {
            result.push({
                name: 'Copyright Page',
                html: `<div class="copyright-page">\n  <p>Copyright © ${form.year} ${form.author || 'Author Name'}</p>\n  <p>All rights reserved. No part of this publication may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the publisher.</p>${form.isbn ? `\n  <p>ISBN: ${form.isbn}</p>` : ''}\n  <p>Published by ${form.publisher || 'Self-Published'}</p>\n  <p>${form.edition} Edition</p>\n</div>`,
                text: `Copyright © ${form.year} ${form.author || 'Author Name'}\n\nAll rights reserved.\n${form.isbn ? `ISBN: ${form.isbn}\n` : ''}Published by ${form.publisher}\n${form.edition} Edition`,
            });
        }
        if (form.sections.dedicationPage && form.dedication) {
            result.push({
                name: 'Dedication',
                html: `<div class="dedication">\n  <p><em>${form.dedication}</em></p>\n</div>`,
                text: form.dedication,
            });
        }
        if (form.sections.disclaimerPage && form.disclaimer !== 'none') {
            result.push({
                name: 'Disclaimer',
                html: `<div class="disclaimer">\n  <p>${DISCLAIMERS[form.disclaimer]}</p>\n</div>`,
                text: DISCLAIMERS[form.disclaimer],
            });
        }
        return result;
    }, [form]);

    const allContent = sections.map((s) => copyHtml ? s.html : s.text).join('\n\n---PAGE BREAK---\n\n');

    return (
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Book Details</h3>
                <div className="form-group"><label className="form-label">Book title</label><input className="form-input" value={form.title} onChange={(e) => updateField('title', e.target.value)} placeholder="My Amazing Book" /></div>
                <div className="form-group"><label className="form-label">Subtitle</label><input className="form-input" value={form.subtitle} onChange={(e) => updateField('subtitle', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Author name</label><input className="form-input" value={form.author} onChange={(e) => updateField('author', e.target.value)} placeholder="Jane Doe" /></div>
                <div className="form-group"><label className="form-label">Pen name (optional)</label><input className="form-input" value={form.penName} onChange={(e) => updateField('penName', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Copyright year</label><input className="form-input" value={form.year} onChange={(e) => updateField('year', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Publisher</label><input className="form-input" value={form.publisher} onChange={(e) => updateField('publisher', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">ISBN</label><input className="form-input" value={form.isbn} onChange={(e) => updateField('isbn', e.target.value)} /></div>
                <div className="form-group">
                    <label className="form-label">Edition</label>
                    <select className="form-select" value={form.edition} onChange={(e) => updateField('edition', e.target.value)}>
                        {['First', 'Second', 'Third', 'Revised', 'Updated'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Dedication</label><textarea className="form-textarea" value={form.dedication} onChange={(e) => updateField('dedication', e.target.value)} placeholder="To my family..." style={{ minHeight: '80px' }} /></div>
                <div className="form-group">
                    <label className="form-label">Disclaimer type</label>
                    {['none', 'fiction', 'health', 'finance', 'general'].map((o) => (
                        <label key={o} className="fix-checkbox"><input type="radio" name="disclaimer" checked={form.disclaimer === o} onChange={() => updateField('disclaimer', o)} /><span>{o === 'none' ? 'None' : o.charAt(0).toUpperCase() + o.slice(1)}</span></label>
                    ))}
                </div>
                <div className="form-group">
                    <label className="form-label">Include sections</label>
                    {Object.entries(form.sections).map(([k, v]) => (
                        <label key={k} className="fix-checkbox"><input type="checkbox" checked={v} onChange={() => toggleSection(k)} /><span>{{ titlePage: 'Title Page', copyrightPage: 'Copyright Page', dedicationPage: 'Dedication', disclaimerPage: 'Disclaimer' }[k]}</span></label>
                    ))}
                </div>
            </div>

            <div className="tool-output-card">
                <h3>Preview</h3>
                <label className="fix-checkbox" style={{ marginBottom: '1rem' }}>
                    <input type="checkbox" checked={copyHtml} onChange={() => setCopyHtml(!copyHtml)} />
                    <span>Copy as HTML</span>
                </label>
                {sections.length > 0 ? (
                    <>
                        {sections.map((s, i) => (
                            <div key={i} className="front-matter-section">
                                <div className="front-matter-section-header">
                                    <h4>{s.name}</h4>
                                    <button className="btn btn-outline btn-sm" onClick={() => navigator.clipboard.writeText(copyHtml ? s.html : s.text)}>Copy</button>
                                </div>
                                <div className="front-matter-preview" dangerouslySetInnerHTML={{ __html: s.html }} />
                                {i < sections.length - 1 && <div className="page-break-indicator">— page break —</div>}
                            </div>
                        ))}
                        <div className="output-actions" style={{ marginTop: '1rem' }}>
                            <button className="btn btn-primary btn-sm" onClick={() => navigator.clipboard.writeText(allContent)}>📋 Copy All</button>
                        </div>
                    </>
                ) : (
                    <div className="output-placeholder">Fill in the form to see your front matter preview.</div>
                )}
            </div>
        </div>
    );
}
