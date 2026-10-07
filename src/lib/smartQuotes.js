// Straight quotes to curly: " -> “ ”, ' -> ‘ ’ (apostrophes become ’).
// With { html: true } it skips everything inside <...> (so attribute quotes
// stay straight) and decides open/close from the last visible character, so a
// quote right after </em> still closes. Block tags (<p>, <h1>, <br>...) start
// a fresh context, like the start of the text.
// ponytail: a leading elision ('em, '90s) gets ‘ instead of ’; fixing that
// needs a word list, add one if authors report it.

const BLOCK_TAG = /^<\/?(p|h[1-6]|li|ul|ol|div|blockquote|br|hr|table|tr|td|th)\b/i;
const OPENS_AFTER = /[\s([{‘“–—\-/]/; // a quote after these opens
const WORD = /[\p{L}\p{N}]/u;

export function smartQuotes(text, { html = false } = {}) {
    let out = '';
    let prev = ''; // last visible character; '' = start of text or block
    let i = 0;
    while (i < text.length) {
        const ch = text[i];
        if (html && ch === '<') {
            const end = text.indexOf('>', i);
            const tag = end === -1 ? text.slice(i) : text.slice(i, end + 1);
            out += tag;
            if (BLOCK_TAG.test(tag)) prev = '';
            i += tag.length;
            continue;
        }
        const opens = prev === '' || OPENS_AFTER.test(prev);
        let c = ch;
        if (ch === '"') c = opens ? '“' : '”';
        else if (ch === "'") c = WORD.test(prev) ? '’' : opens ? '‘' : '’';
        out += c;
        prev = c;
        i += 1;
    }
    return out;
}
