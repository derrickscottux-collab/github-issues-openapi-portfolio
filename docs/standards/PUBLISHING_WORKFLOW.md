# Publishing workflow (Guides + reference)

This repo publishes two user-facing documentation surfaces:

1. **Guides (task-based)**: Markdown sources in `/guides/` built into static HTML under `/docs/guides/`.
2. **API reference (OpenAPI/Redoc)**: The OpenAPI source under `/openapi/` rendered by your existing documentation build.

This document describes the *minimum* steps to publish changes without guessing.

---

## Guides publishing steps

### 1) Edit source Markdown
- Edit or add files in: `/guides/*.md`

Notes:
- `guides/README.md` becomes the Guides landing page (`docs/guides/index.html`).
- Other guide files keep their names (e.g., `guides/quickstart.md` → `docs/guides/quickstart.html`).

### 2) Install dependencies (first-time or after changes)
This build script uses `marked`.

- Install:
  - `npm install`

(Your `package.json` currently lists `marked` as a dev dependency.)

### 3) Build the Guides HTML
Run:

- `node scripts/build-guides.mjs`

Expected outputs (generated files):
- `/docs/guides/index.html`
- `/docs/guides/<guide-name>.html`
- `/docs/guides/guides.css`

### 4) Quick verification (before committing)
Open the generated HTML locally (or in your deployed Pages site) and confirm:

- The **Guides index** loads and shows links/tiles.
- Sidebar/nav includes the **Meta** links (Release notes, Migration, Verification), if enabled.
- Relative links between guides work (the script rewrites `.md` → `.html`).

### 5) Commit and publish
Commit both:
- The source Markdown you edited in `/guides/`
- The regenerated HTML output in `/docs/guides/`

This repo’s Pages site serves from `/docs/`, so committing generated output is what makes the live site update.

---

## API reference publishing steps (OpenAPI)

### 1) Edit the OpenAPI source
- Edit: `/openapi/openapi.yaml`

### 2) Lint (recommended)
This repo includes a Redocly configuration (`/openapi/redocly.yaml`).

How you run lint depends on whether you have the Redocly CLI installed globally or via `npx`. Two common options:

- `npx @redocly/cli lint openapi/openapi.yaml --config openapi/redocly.yaml`
- `redocly lint openapi/openapi.yaml --config openapi/redocly.yaml`

If neither command works in your environment, keep the config committed and document the lint step you used in your verification notes.

### 3) Publish
Publish using your existing process for updating the rendered reference docs (whatever currently produces the live Redoc output in `/docs/`).

---

## What to update when adding a new page

When you add a new *Guides* page:
- Add the new `guides/<page>.md`
- Re-run `node scripts/build-guides.mjs`
- Confirm it appears in `/docs/guides/` and is linked from the Guides index/nav
- Add it to navigation if required (see `docs/standards/NAVIGATION_POLICY.md`)
