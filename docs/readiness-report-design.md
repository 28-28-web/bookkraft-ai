# Full Publishing Readiness Report — Design Proposal

Status: **proposal only, not implemented.** Awaiting approval before any code change or commit.

## Goal

One authenticated (free-account) report that combines the four existing free
checkers into a single **0–100 readiness score** with **four per-section
sub-scores**. Reuse the existing check logic verbatim — no re-authoring of
rules. No "KDP will accept / guaranteed / will be approved" wording anywhere in
the new report.

## Sections and their source logic (reuse map)

| # | Section | Source logic (current location) | Nature today | Input |
|---|---------|--------------------------------|--------------|-------|
| 1 | EPUB structure | `EpubValidator.js` → `validate()` (11 checks, inline in a `useCallback`, mixed with gtag/track) | embedded in component | EPUB (required) |
| 2 | Metadata | `MetadataBuilder.js` → `checks` `useMemo` (7 checks) + `extractFromEpub()` | embedded in component | auto-extract from EPUB, then editable |
| 3 | Cover | `CoverCheckerPage.js` → `checkKDP()`, `checkApple()` | already pure functions | cover image |
| 4 | Manuscript hygiene | `WordCleanupPage.js` → `scanDocx()`, `severityForCount()` (6 checks) | already pure functions | DOCX (optional) |

Status vocabulary is already shared across all four, which makes a single score
possible without touching rules:
- EPUB: `pass` / `warn` / `fail` / `skip`
- Metadata: `pass` / `warn` / `fail`
- Cover: `pass` / `fail` + a `warning` flag on soft fails
- Word: `pass` / `warning` / `fail`

## Reuse strategy — the one architectural move

Two of the four already isolate their logic as pure functions; two bury it in
the component. Honest "reuse, don't rewrite" = lift the pure part into a shared
`lib/` module and import it back into both the existing tool page **and** the
new report. Same single copy of every rule.

- **Cover, Word** — already pure. Cut `checkKDP`/`checkApple` and
  `scanDocx`/`severityForCount` to `lib/`, re-import in their pages. Behavior
  unchanged (mechanical move).
- **EPUB, Metadata** — extract only the pure `zip → {checks,passCount,total}`
  and `form → checks[]` portions into `lib/`. Leave all gtag/track/UI in the
  component; the component calls the new function. Medium edit, zero rule change.

## Scoring

Each section normalizes its own checks to 0–100 with one shared rule:

```
sectionScore = round( (passCount + 0.5 * warnCount) / countableChecks * 100 )
```

- `skip` and not-applicable checks are **excluded from the denominator**.
- `warning`/`warn` = half credit; `fail` = zero; `pass` = full.

Overall (all four sections present):

| Section | Weight | Why |
|---------|--------|-----|
| EPUB structure | 40 | Hard blocker — a structural fail means the file itself is rejected |
| Metadata | 25 | Missing title/author/category blocks or badly hurts the listing |
| Cover | 20 | Clear objective pass/fail on dimensions/format |
| Manuscript hygiene | 15 | Quality, not a blocker — and it is optional |

Optional sections (no DOCX uploaded, or no cover) → that section shows **"Not
assessed"** and weights are renormalized over the sections actually present:

```
overall = round( Σ(sectionScore × weight) / Σ(weight of present sections) )
```

Example, EPUB + Metadata + Cover only (no DOCX): denominators 40+25+20 = 85, so
effective weights ≈ EPUB 47 / Metadata 29 / Cover 24.

## User path

Free account gating already exists (`AuthProvider`, `/signup`, `/login`;
`dashboard/page.js` redirects to `/login` when `!user`). Mirror that.

1. Sign up / log in (existing flow).
2. Dashboard card → **"Full Readiness Report"**.
3. Upload step: **EPUB (required)** drives EPUB structure + auto-fills metadata.
   Optional: **cover image**, optional **DOCX**.
4. Metadata auto-filled from the EPUB (`extractFromEpub` logic), user edits gaps.
5. Generate → combined report:
   - Overall 0–100 gauge + headline band (e.g. "Needs work / Nearly there / Strong").
   - Four sub-score cards, each expandable to the **existing per-check rows** and
     the **existing fix links** (`/epub-errors/*`, `/tools/*`).
6. Reuse the existing email-report capture + upsell blocks.

## New files

- `src/lib/epubChecks.js` — `runEpubChecks(zip) → {checks, passCount, total}`
- `src/lib/metadataChecks.js` — `buildMetadataChecks(form) → checks[]`
- `src/lib/coverChecks.js` — move `checkKDP`, `checkApple`
- `src/lib/wordChecks.js` — move `scanDocx`, `severityForCount`
- `src/lib/readinessScore.js` — `sectionScore()` + weighted `overallScore()`
- `src/app/dashboard/readiness/page.js` — gated page (recommended route; clearly account-gated)
- `src/app/dashboard/readiness/ReadinessReportClient.js` — orchestrator UI

Overall gauge: reuse `publishing-score/ScoreCard.js` if it fits, else one small
`ScoreGauge` component. Decide during build, not now.

## Changed files

- `EpubValidator.js` — import `runEpubChecks`, replace inline block (keep tracking/UI)
- `MetadataBuilder.js` — import `buildMetadataChecks`
- `CoverCheckerPage.js` — import cover checks from `lib/`
- `WordCleanupPage.js` — import word checks from `lib/`
- `src/app/dashboard/page.js` — add the entry card
- Register the tool in `lib/tools.js` / `lib/constants.js` **if** it belongs in
  those lists (verify at build time; it may live only in the dashboard).

## Database

- **MVP: none.** Compute in the browser (all four run client-side; EPUB/Word/
  Metadata via JSZip, Cover via `Image`), gate the route by auth, and reuse the
  existing `track('report_completed', …)` events. No schema change.
- **Optional later:** a `readiness_reports` table (`user_id`, `scores` json,
  `created_at`) for report history on the dashboard. Not needed for v1 — skip
  until history is actually requested.

## Wording guardrails

- New overall summary/headline must **not** promise acceptance. Allowed phrasing:
  "checks N structural requirements", "may be rejected", "recommended",
  "not assessed", "N of M checks passing".
- Note: the reused per-check detail strings from `EpubValidator.js` already say
  things like "will be rejected by KDP" and "KDP-ready". They carry over
  unchanged inside the section detail rows (that is the existing tool copy). The
  **new** top-level readiness verdict is where we stay strictly non-guaranteeing.
  If the inherited strings are also to be softened, that is a separate copy pass —
  flag for decision.

### Decided

1. **Soften the inherited EPUB copy in step 2.** When the EPUB logic moves to
   `lib/epubChecks.js`, rewrite the guarantee-style strings at the same time:
   "will be rejected by KDP" → "likely to cause problems on KDP", "KDP-ready" /
   "Your EPUB is KDP-ready" → "no common issues found". Applies to both the tool
   page and the new report (single copy, since the strings live in the shared
   module).
2. **Regression check after the move.** The free tools must return identical
   results post-extraction. Before/after comparison with one sample EPUB and one
   sample cover: capture each tool's `checks[]` / score before the logic move,
   run the same fixtures after, confirm they match. This gate must pass before
   committing the logic-move work.

## Open questions (small, defaultable)

- Route: `/dashboard/readiness` (recommended, clearly gated) vs a gated
  `/tools/readiness-report`.
- Overall gauge: reuse `ScoreCard` vs a new minimal component.

## Commit

Only after approval.
