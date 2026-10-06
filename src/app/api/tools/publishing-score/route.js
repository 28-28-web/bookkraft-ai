import { NextResponse } from 'next/server';
import { callClaude } from '@/lib/toolAccess';
import { rateLimit } from '@/lib/rateLimit';
import { FREE_SAMPLE_RATE_LIMIT } from '@/lib/constants';

const MAX_TEXT_CHARS = 10000; // only ~4000 are analyzed; blocks huge payloads
const HOUR_MS = 60 * 60 * 1000;

// Trust cf-connecting-ip and x-real-ip first; x-forwarded-for last because a
// client can forge it.
function getClientIp(request) {
  return request.headers.get('cf-connecting-ip')
    || request.headers.get('x-real-ip')
    || (request.headers.get('x-forwarded-for') || '').split(',')[0].trim()
    || 'unknown';
}

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text || text.trim().length < 100) {
      return NextResponse.json({ error: 'Please provide at least 100 characters.' }, { status: 400 });
    }
    if (text.length > MAX_TEXT_CHARS) {
      return NextResponse.json({ error: 'text_too_long', message: 'That text is too long — paste up to 10,000 characters.' }, { status: 400 });
    }

    const ip = getClientIp(req);
    const rl = rateLimit(`publishing-score:${ip}`, FREE_SAMPLE_RATE_LIMIT, HOUR_MS);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'rate_limited', message: "You've reached the free limit. Create a free account for more checks." },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } }
      );
    }
    const template = {total:0,categories:[
      {id:'formatting_cleanliness',label:'Formatting Cleanliness',score:0,max:20,status:'good',insight:'sentence here',tool:'Kindle Format Fixer',toolUrl:'/tools/kindle-format-fixer'},
      {id:'metadata_completeness',label:'Metadata Completeness',score:0,max:15,status:'warning',insight:'sentence here',tool:'Metadata Builder',toolUrl:'/tools/metadata-builder'},
      {id:'structure_and_toc',label:'Structure and TOC',score:0,max:15,status:'good',insight:'sentence here',tool:'TOC Generator',toolUrl:'/tools/toc-generator'},
      {id:'style_consistency',label:'Style Consistency',score:0,max:20,status:'critical',insight:'sentence here',tool:'Style Sheet Auditor',toolUrl:'/tools/style-sheet-auditor'},
      {id:'front_back_matter',label:'Front and Back Matter',score:0,max:15,status:'warning',insight:'sentence here',tool:'Front Matter Generator',toolUrl:'/tools/front-matter-generator'},
      {id:'kdp_keyword_readiness',label:'KDP Keyword Readiness',score:0,max:15,status:'good',insight:'sentence here',tool:'KDP Keyword Finder',toolUrl:'/tools/kdp-keyword-finder'}
    ]};
    const result = await callClaude({
      system: 'You are a book publishing analyst. Return ONLY valid JSON. No markdown. No backticks.',
      user: 'Analyze this manuscript. Return this JSON with real scores and specific insights. Use status good warning or critical: ' + JSON.stringify(template) + ' Manuscript: ' + text.slice(0, 4000),
      maxTokens: 1000,
      toolSlug: 'publishing-score',
    });
    // toolUrl is rendered as an href, so take it from the template, never from
    // the model's output (it can return a malformed or off-site URL).
    const urls = Object.fromEntries(template.categories.map((c) => [c.id, c.toolUrl]));
    for (const c of result?.categories || []) c.toolUrl = urls[c.id] || null;
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 });
  }
}