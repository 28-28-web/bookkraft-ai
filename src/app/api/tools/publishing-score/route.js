import { NextResponse } from 'next/server';
import { callClaude } from '@/lib/toolAccess';

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text || text.trim().length < 100) {
      return NextResponse.json({ error: 'Please provide at least 100 characters.' }, { status: 400 });
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
    const parsed = result;
    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 });
  }
}