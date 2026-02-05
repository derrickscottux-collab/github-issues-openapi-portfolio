# Workflow summary (Project 2)

## Step 0: Define v1 and v2 (commit-based)
- **v1 (`4de1450`, 2026-02-01):** docs: add evidence-backed guides (quickstart, pagination, troubleshooting)
- **v2 (`3c054e2`, 2026-02-02):** docs: publish Guides HTML and fix related links
- **Follow-up (`ab5bcca`, 2026-02-02):** docs: link from README/spec

## Step 1: Decide what changed (small and realistic)
Grounded changes:
- `/guides` Markdown set complements the OpenAPI reference docs (v1)
- Static Guides site generated under `docs/guides/` with shared styling/navigation (v2)
- “Related links” normalized to canonical GitHub URLs for the published HTML site (v2)
- Rebuild workflow established via `scripts/build-guides.mjs` (v2)
- README + OpenAPI `externalDocs` point readers to Guides index (follow-up)

## Step 2: Release notes
- `docs/release-notes/v2.0.md`

## Step 3: Breaking changes
Write as docs contract:
- Pages sharing uses `.html` Guides links
- “Related links” must be canonical GitHub URLs
- Generated output is rebuilt, not hand-edited

## Step 4: Migration guide
- `docs/migration/v1-to-v2.md` (checklist)

## Step 5: Before/after examples
Show:
- relative vs canonical links
- Markdown vs HTML pages for public sharing
- source vs output editing workflow

## Step 6: Deprecation policy
- Deprecate relative “Related links” for published site
- Replace with canonical GitHub URLs

## Step 7: Verification steps
- `docs/verification/v2.0-verification.md`
