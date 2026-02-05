# Migration guide: v1 → v2 (documentation set)

This guide covers changes from **v1 to v2 of the GitHub Issues API documentation set** (portfolio subset).

## Definitions
- **v1 (`4de1450`, 2026-02-01):** Markdown guides exist under `guides/` and are linked from the repo README.
- **v2 (`3c054e2`, 2026-02-02):** Guides are published as a static HTML site under `docs/guides/` for GitHub Pages, and “Related links” are normalized to canonical GitHub URLs.

## Before you start
- List any old links you shared that point to:
  - `guides/*.md` (repo Markdown)
  - local file paths (copied from your OS/editor)
- Decide your canonical share link:
  - **Guides HTML index (recommended):** `.../guides/index.html`

## Migration checklist (do this in order)
1) **Set the canonical public entry point**
   - Use: `https://derrickscottux-collab.github.io/github-issues-openapi-portfolio/guides/index.html`

2) **Update old shared links**
   - Replace Pages links that end in `.md` with the corresponding `.html` pages.

3) **Fix “Related links” at the source**
   - Edit the Markdown guides under `guides/`
   - Ensure “Related links” use canonical GitHub tree/blob URLs.

4) **Rebuild the Guides HTML output**
   - From repo root: `node scripts/build-guides.mjs`

5) **Commit generated output**
   - Commit `docs/guides/` so Pages serves the latest version.

6) **Smoke test navigation (including handoff from reference docs)**
   - Open Guides index → open each guide → confirm nav works.
   - If you link Guides from the Redoc reference docs (via `externalDocs`), click it and confirm it lands on the Guides index.
   - Click every “Related links” item from at least two guides.

## Before / After examples

### 1) “Related links” target
**Old (v1):** relative link that can break when rendered as HTML
```md
- Glossary: [glossary.md](glossary.md)
```

**New (v2):** canonical GitHub URL
```md
- Glossary: [Glossary](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/guides/glossary.md)
```

### 2) Public link type
**Old (v1):** sharing Markdown as the “live guide”
```text
.../guides/quickstart.md
```

**New (v2):** share the generated HTML page
```text
.../guides/quickstart.html
```

### 3) Where edits happen
**Old:** edits could be made anywhere, including output HTML.  
**New:** edit `guides/*.md`, rebuild, commit `docs/guides/*.html`.

## Common mistakes
- Editing generated HTML and losing changes on rebuild.
- Using relative links in “Related links” and breaking the published site.
- Forgetting to rebuild and commit `docs/guides/` after Markdown edits.

## Verification
Use: `docs/verification/v2.0-verification.md`
