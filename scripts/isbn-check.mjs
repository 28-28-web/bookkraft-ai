// Self-check for identifier validation. Run: node scripts/isbn-check.mjs
import assert from 'node:assert';
import { normalizeIsbn, isValidIsbn10, isValidIsbn13, isValidAsin, checkIdentifier } from '../src/lib/metadataChecks.js';

// normalize
assert.strictEqual(normalizeIsbn('urn:isbn:978-0-306-40615-7'), '9780306406157');
assert.strictEqual(normalizeIsbn('0-306-40615 X'), '030640615X');

// ISBN-10 valid / invalid
assert.ok(isValidIsbn10('0306406152'));
assert.ok(isValidIsbn10('080442957X')); // trailing X
assert.ok(!isValidIsbn10('0306406153')); // bad checksum
assert.ok(!isValidIsbn10('isbn123456')); // non-digit

// ISBN-13 valid / invalid
assert.ok(isValidIsbn13('9780306406157'));
assert.ok(isValidIsbn13('9791234567896'));
assert.ok(!isValidIsbn13('9780306406158')); // bad checksum
assert.ok(!isValidIsbn13('1230306406157')); // wrong prefix

// ASIN
assert.ok(isValidAsin('B0CXYZ1234'));
assert.ok(isValidAsin('0306406152')); // ISBN-10 as ASIN
assert.ok(!isValidAsin('B0CXYZ')); // too short

// checkIdentifier results
assert.strictEqual(checkIdentifier({ isbn: '978-0-306-40615-7' }).status, 'pass');
assert.strictEqual(checkIdentifier({ asin: 'B0CXYZ1234' }).status, 'pass');
assert.strictEqual(checkIdentifier({ isbn: 'isbn' }).status, 'warn'); // present but invalid
assert.strictEqual(checkIdentifier({ isbn: '1234567890' }).status, 'warn'); // bad checksum
assert.strictEqual(checkIdentifier({}).status, 'warn'); // nothing

// invalid message names the identifier type
assert.match(checkIdentifier({ isbn: '1234567890' }).detail, /isn't a valid ISBN/);
assert.match(checkIdentifier({ asin: 'NOTVALID99' }).detail, /isn't a valid ASIN/);

console.log('isbn-check: all assertions passed.');
