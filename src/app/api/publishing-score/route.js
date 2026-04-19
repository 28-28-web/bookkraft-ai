import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  const { text } = await req.json();

  if (!text || text.trim().length < 100) {
    return NextResponse.json(
      { error: "Please provide at least 100 characters of text." },
      { status: 400 }
    );
  }

  const prompt = `
You are a professional book publishing analyst. Analyze this manuscript and return ONLY a JSON object. No explanation. No markdown. No backticks.

Score these 6 categories:

1. formatting_cleanliness (max 20): smart quotes, double spaces, em dash problems, encoding errors
2. metadata_completeness (max 15): title signals, author name, description clarity
3. structure_and_toc (max 15): clear chapter headings, consistent structure
4. style_consistency (max 20): repeated words, inconsistent names, dialogue punctuation
5. front_back_matter (max 15): copyright page, dedication, author bio signals
6. kdp_keyword_readiness (max 15): genre clarity, marketable themes, discoverability

Return this exact JSON:
{
  "total": <number out of 100>,
  "categories": [
    {
      "id": "formatting_cleanliness",
      "label": "Formatting Cleanliness",
      "score": <number>,
      "max": 20,
      "status": "good or warning or critical",
      "insight": "<one specific sentence about what you found>",
      "tool": "Kindle Format Fixer",
      "toolUrl": "/tools/kindle-format-fixer"
    },
    {
      "id": "metadata_completeness",
      "label": "Metadata Completeness",
      "score": <number>,
      "max": 15,
      "status": "good or warning or critical",
      "insight": "<one specific sentence>",
      "tool": "Metadata Builder",
      "toolUrl": "/tools/metadata-builder"
    },
    {
      "id": "structure_and_toc",
      "label": "Structure & TOC",
      "score": <number>,
      "max": 15,
      "status": "good or warning or critical",
      "insight": "<one specific sentence>",
      "tool": "TOC Generator",
      "toolUrl": "/tools/toc-generator"
    },
    {
      "id": "style_consistency",
      "label": "Style Consistency",
      "score": <number>,
      "max": 20,
      "status": "good or warning or critical",
      "insight": "<one specific sentence>",
      "tool": "Style Sheet Auditor",
      "toolUrl": "/tools/style-sheet-auditor"
    },
    {
      "id": "front_back_matter",
      "label": "Front & Back Matter",
      "score": <number>,
      "max": 15,
      "status": "good or warning or critical",
      "insight": "<one specific sentence>",
      "tool": "Front Matter Generator",
      "toolUrl": "/tools/front-matter-generator"
    },
    {
      "id": "kdp_keyword_readiness",
      "label": "KDP Keyword Readiness",
      "score": <number>,
      "max": 15,
      "status": "good or warning or critical",
      "insight": "<one specific sentence>",
      "tool": "KDP Keyword Finder",
      "toolUrl": "/tools/kdp-keyword-finder"
    }
  ]
}

Manuscript:
${text.slice(0, 4000)}
  `;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const raw =
      message.content[0].type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Publishing score error:", err);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}