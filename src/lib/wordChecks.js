// Pure DOCX hygiene scan. Lifted verbatim from WordCleanupPage.js so the
// word-cleanup tool and the readiness report share one copy of every rule.
import JSZip from 'jszip';

export function severityForCount(count, warnAt, failAt) {
  if (count >= failAt) return 'fail';
  if (count >= warnAt) return 'warning';
  return 'pass';
}

export async function scanDocx(file) {
  const zip = await JSZip.loadAsync(file);
  const docXml = await zip.file('word/document.xml')?.async('text');
  if (!docXml) throw new Error('Could not find word/document.xml — is this a valid .docx file?');

  const parser = new DOMParser();
  const doc = parser.parseFromString(docXml, 'application/xml');
  if (doc.querySelector('parsererror')) throw new Error('Could not parse this .docx file — it may be corrupted.');

  const paragraphs = Array.from(doc.getElementsByTagName('w:p'));

  let doubleSpaces = 0;
  let trailingSpaces = 0;
  let doubleHyphens = 0;
  let straightQuotes = 0;
  let directBoldItalic = 0;
  let blankParaCount = 0;
  let maxConsecutiveBlank = 0;
  let runningBlank = 0;
  let totalWords = 0;

  for (const p of paragraphs) {
    const textNodes = Array.from(p.getElementsByTagName('w:t'));
    const paraText = textNodes.map((t) => t.textContent).join('');

    if (paraText.trim() === '') {
      blankParaCount += 1;
      runningBlank += 1;
      maxConsecutiveBlank = Math.max(maxConsecutiveBlank, runningBlank);
    } else {
      runningBlank = 0;
    }

    totalWords += paraText.split(/\s+/).filter(Boolean).length;
    doubleSpaces += (paraText.match(/ {2,}/g) || []).length;
    doubleHyphens += (paraText.match(/(?<!-)--(?!-)/g) || []).length;
    straightQuotes += (paraText.match(/["']/g) || []).length;

    if (textNodes.length > 0) {
      const lastRunText = textNodes[textNodes.length - 1].textContent;
      if (/ $/.test(lastRunText) && paraText.trim() !== '') trailingSpaces += 1;
    }

    const pStyleEl = p.getElementsByTagName('w:pStyle')[0];
    const styleVal = pStyleEl?.getAttribute('w:val') || '';
    const isHeading = /^Heading/i.test(styleVal) || /^Title/i.test(styleVal);

    if (!isHeading) {
      const runs = Array.from(p.getElementsByTagName('w:r'));
      for (const r of runs) {
        const rPr = r.getElementsByTagName('w:rPr')[0];
        if (!rPr) continue;
        const hasBold = rPr.getElementsByTagName('w:b').length > 0;
        const hasItalic = rPr.getElementsByTagName('w:i').length > 0;
        const runText = Array.from(r.getElementsByTagName('w:t')).map((t) => t.textContent).join('');
        if ((hasBold || hasItalic) && runText.trim() !== '') directBoldItalic += 1;
      }
    }
  }

  const checks = [
    {
      label: 'Double spaces',
      count: doubleSpaces,
      status: severityForCount(doubleSpaces, 1, 15),
      detail: doubleSpaces === 0
        ? 'No double spaces found.'
        : `${doubleSpaces} instance${doubleSpaces === 1 ? '' : 's'} of two or more consecutive spaces.`,
    },
    {
      label: 'Blank paragraphs',
      count: blankParaCount,
      status: severityForCount(maxConsecutiveBlank, 2, 4),
      detail: maxConsecutiveBlank <= 1
        ? `${blankParaCount} blank paragraph${blankParaCount === 1 ? '' : 's'} total — no stacked runs.`
        : `${blankParaCount} blank paragraphs total, up to ${maxConsecutiveBlank} stacked in a row.`,
    },
    {
      label: 'Trailing spaces',
      count: trailingSpaces,
      status: severityForCount(trailingSpaces, 1, 15),
      detail: trailingSpaces === 0
        ? 'No paragraphs end with a trailing space.'
        : `${trailingSpaces} paragraph${trailingSpaces === 1 ? '' : 's'} end with a trailing space.`,
    },
    {
      label: 'Double hyphens (--)',
      count: doubleHyphens,
      status: severityForCount(doubleHyphens, 1, 10),
      detail: doubleHyphens === 0
        ? 'No "--" found — em dashes look consistent.'
        : `${doubleHyphens} instance${doubleHyphens === 1 ? '' : 's'} of "--" that may need to be an em dash (—).`,
    },
    {
      label: 'Straight quotes',
      count: straightQuotes,
      status: severityForCount(straightQuotes, 1, 20),
      detail: straightQuotes === 0
        ? 'No straight quote marks found.'
        : `${straightQuotes} straight quote mark${straightQuotes === 1 ? '' : 's'} (" or ') — most formatters expect curly quotes.`,
    },
    {
      label: 'Direct bold/italic formatting',
      count: directBoldItalic,
      status: severityForCount(directBoldItalic, 1, 25),
      detail: directBoldItalic === 0
        ? 'No manually-applied bold or italic runs outside heading styles.'
        : `${directBoldItalic} run${directBoldItalic === 1 ? '' : 's'} of manually-applied bold/italic — can cause inconsistent styling on conversion.`,
    },
  ];

  const failCount = checks.filter((c) => c.status === 'fail').length;
  const warnCount = checks.filter((c) => c.status === 'warning').length;
  const overallStatus = failCount > 0 ? 'fail' : warnCount > 0 ? 'warning' : 'pass';

  return {
    checks,
    overallStatus,
    paragraphCount: paragraphs.length,
    wordCount: totalWords,
  };
}
