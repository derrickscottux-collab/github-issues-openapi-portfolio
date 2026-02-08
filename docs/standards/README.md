# Documentation standards

This folder defines the writing, structure, and review standards for this repo’s developer documentation (Guides + reference-adjacent pages).

## What’s included

- `STYLE_GUIDE.md`: House style and structure rules (what “good” looks like)
- `PR_REVIEW_CHECKLIST.md`: QA checklist for reviewing doc changes
- `TERMINOLOGY.md`: Terms, naming conventions, and status-code wording
- `templates/`: Copy-paste templates for common doc types
- `PUBLISHING_WORKFLOW.md`: How to publish Guides HTML and update the reference docs safely

## How to use

1. Start with the template that matches your intent.
2. Apply the rules in `STYLE_GUIDE.md` (especially examples, evidence links, and verification steps).
3. Run through `PR_REVIEW_CHECKLIST.md` before opening a PR.

## Link targets used by this kit

Where this kit references GitHub links, it assumes the canonical repo URL:

- https://github.com/derrickscottux-collab/github-issues-openapi-portfolio

If you ever rename or move the repo, update the URL in this file and in any other standards pages that link to the repo.

## Optional add-ons

- `EXAMPLES_POLICY.md`: Standard format for request/response examples and evidence references.
- `NAVIGATION_POLICY.md`: How to add new Guides pages and keep nav consistent.
- `vale/` + `vale.ini`: Optional prose linting setup (docs-as-code signal).
