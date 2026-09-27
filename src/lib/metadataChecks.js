// Pure metadata logic shared by the Metadata Builder tool and the readiness
// report. extractMetadataFromZip: EPUB OPF -> field values. buildMetadataChecks:
// form -> 7 check rows. Callers keep their own UI/tracking.

export async function extractMetadataFromZip(zip) {
  let opfPath = 'OEBPS/content.opf';
  const container = zip.file('META-INF/container.xml');
  if (container) {
    const containerXml = await container.async('string');
    const match = containerXml.match(/full-path="([^"]+)"/);
    if (match) opfPath = match[1];
  }
  const opfFile = zip.file(opfPath);
  if (!opfFile) throw new Error('Could not find OPF file in EPUB.');
  const opfContent = await opfFile.async('string');

  const get = (tag) => {
    const m = opfContent.match(new RegExp(`<dc:${tag}[^>]*>([^<]+)</dc:${tag}>`, 'i'));
    return m ? m[1].trim() : '';
  };
  const subjects = [...opfContent.matchAll(/<dc:subject[^>]*>([^<]+)<\/dc:subject>/gi)].map((m) => m[1].trim());
  const seriesMatch = opfContent.match(/belongs-to-collection[^>]*>([^<]+)</i);
  const seriesVolumeMatch = opfContent.match(/group-position[^>]*>([^<]+)</i);
  const langRaw = get('language');
  const langMap = { en: 'English', es: 'Spanish', fr: 'French', de: 'German', pt: 'Portuguese', it: 'Italian', nl: 'Dutch' };
  const isbnRaw = get('identifier');
  const descRaw = get('description');

  return {
    title: get('title'),
    authors: get('creator'),
    language: langMap[langRaw] || '',
    isbn: isbnRaw && !isbnRaw.startsWith('urn:uuid') ? isbnRaw : '',
    pubDate: get('date') ? get('date').substring(0, 10) : '',
    shortDesc: descRaw ? descRaw.replace(/&amp;/g, '&').replace(/&lt;/g, '<').substring(0, 500) : '',
    bisacCategory1: subjects[0] || '',
    bisacCategory2: subjects[1] || '',
    series: seriesMatch ? seriesMatch[1].trim() : '',
    seriesVolume: seriesVolumeMatch ? seriesVolumeMatch[1].trim() : '',
  };
}

// --- Identifier validation (shared by Metadata Builder + Readiness Report) ---

// Strip urn:isbn: prefix, hyphens, spaces; uppercase (for trailing X).
export function normalizeIsbn(raw) {
  return String(raw || '').replace(/^urn:isbn:/i, '').replace(/[\s-]/g, '').toUpperCase();
}

export function isValidIsbn10(s) {
  if (!/^\d{9}[\dX]$/.test(s)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += (i + 1) * Number(s[i]);
  sum += 10 * (s[9] === 'X' ? 10 : Number(s[9]));
  return sum % 11 === 0;
}

export function isValidIsbn13(s) {
  if (!/^97[89]\d{10}$/.test(s)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(s[i]) * (i % 2 === 0 ? 1 : 3);
  return (10 - (sum % 10)) % 10 === Number(s[12]);
}

// ASIN: 10 chars, usually B0 + 8 alnum. A bare ISBN-10 is also a valid ASIN.
export function isValidAsin(s) {
  const v = String(s || '').trim().toUpperCase();
  return /^B0[0-9A-Z]{8}$/.test(v) || isValidIsbn10(v);
}

export function checkIdentifier(form) {
  const isbn = normalizeIsbn(form.isbn);
  const asin = String(form.asin || '').trim().toUpperCase();
  if (isbn && (isValidIsbn13(isbn) || isValidIsbn10(isbn))) {
    return { status: 'pass', detail: `Valid ISBN: ${isbn}` };
  }
  if (asin && isValidAsin(asin)) {
    return { status: 'pass', detail: `Valid ASIN: ${asin}` };
  }
  // Present but invalid — name the identifier type the user actually entered.
  if (form.isbn) {
    return { status: 'warn', detail: "Identifier found, but it isn't a valid ISBN. Check the number before publishing wide." };
  }
  if (form.asin) {
    return { status: 'warn', detail: "Identifier found, but it isn't a valid ASIN. Check the number before publishing wide." };
  }
  return { status: 'warn', detail: 'No ISBN or ASIN — not required for KDP, but needed for IngramSpark and wide distribution.' };
}

export function buildMetadataChecks(form) {
  const keywords = [form.kw1, form.kw2, form.kw3, form.kw4, form.kw5, form.kw6, form.kw7].filter(Boolean);
  const results = [];
  results.push({ name: 'Title', status: form.title ? 'pass' : 'fail', detail: form.title ? 'Title is present.' : 'Missing title — KDP requires a title before you can publish.', fixHint: 'Add your book title in the Title field.' });
  results.push({ name: 'Author', status: form.authors ? 'pass' : 'fail', detail: form.authors ? 'Author name present.' : 'Missing author — KDP requires at least one author name.', fixHint: 'Add your name in the Author field.' });
  results.push({ name: 'BISAC Category', status: form.bisacCategory1 ? 'pass' : 'fail', detail: form.bisacCategory1 ? `Category set: ${form.bisacCategory1}` : 'No BISAC category — categories help readers find your book.', fixHint: 'Set at least one BISAC category.' });
  results.push({ name: 'Keywords', status: keywords.length >= 3 ? 'pass' : keywords.length > 0 ? 'warn' : 'fail', detail: keywords.length >= 3 ? `${keywords.length} keywords set. Good for discoverability.` : keywords.length > 0 ? `Only ${keywords.length} keyword(s). KDP allows 7 — use all of them.` : "No keywords — you're leaving discoverability on the table. KDP gives you 7 keyword slots.", fixHint: 'Add at least 5–7 relevant keywords.' });
  results.push({ name: 'Short Description', status: form.shortDesc && form.shortDesc.length >= 50 ? 'pass' : form.shortDesc ? 'warn' : 'fail', detail: form.shortDesc && form.shortDesc.length >= 50 ? 'Short description looks good.' : form.shortDesc ? 'Short description is too brief — aim for at least 50 characters.' : "Missing short description — this shows on your book's product page.", fixHint: 'Write a compelling 1–2 sentence description.' });
  results.push({ name: 'Long Description', status: form.longDesc && form.longDesc.length >= 200 ? 'pass' : form.longDesc ? 'warn' : 'fail', detail: form.longDesc && form.longDesc.length >= 200 ? `Long description: ${form.longDesc.length} characters. Good length.` : form.longDesc ? `Long description is only ${form.longDesc.length} chars. Aim for 200–4000 characters.` : 'No long description — this is your main sales copy. Missing it hurts conversions.', fixHint: 'Write a full book description (200–4000 characters).' });
  const idCheck = checkIdentifier(form);
  results.push({ name: 'ISBN / Identifier', status: idCheck.status, detail: idCheck.detail, fixHint: 'Add your ISBN if publishing wide.' });
  return results;
}
