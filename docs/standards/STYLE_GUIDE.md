# Style guide

This guide defines the house style for this repo’s developer documentation. It is intentionally practical and scoped: rules exist to make docs consistent, testable, and easy to maintain.

## Audience and scope block

Every guide starts with:

- **Audience:** Who the doc is for (usually “Developers integrating with the GitHub Issues REST API (portfolio subset)”).
- **Scope:** What is and is not covered, and what evidence backs claims.

Example:

> **Audience:** Developers integrating with the GitHub Issues REST API (portfolio subset)  
> **Scope:** Observed behavior for `GET /repos/{owner}/{repo}/issues`, backed by saved request/response evidence.

## Document types

Use the right shape for the job:

- **How-to (task):** A sequence that ends in a successful outcome (Quickstart, create issue, list issues).
- **Behavior note:** Observed behavior that can surprise users (pagination defaults, invalid inputs).
- **Troubleshooting:** Symptoms → causes → fixes → how to verify.
- **Reference supplement:** Anything that complements the OpenAPI reference (status codes table, parameter meanings).
- **Glossary:** Short definitions for recurring terms used across the docs.

Templates are in `templates/`.

## Headings and structure

### Heading style
- Use Title Case for the H1 (page title).
- Use sentence case for most H2/H3 headings unless the heading is a proper noun or named artifact.
- Keep headings descriptive, not cute.

### Recommended ordering (guides)
1. Title (H1)
2. Audience + Scope
3. One-paragraph purpose statement (what this guide helps you do)
4. Requirements/prereqs (if relevant)
5. Main content (steps, tables, examples)
6. Verification (how to confirm success)
7. Related links (OpenAPI reference, other guides)

## Voice and tone

- Default to clear, direct language.
- Prefer short sentences.
- Avoid sales-y phrasing (“super easy”, “simple”, “just”).
- Prefer **you** over passive voice when it improves clarity:
  - “You must include the `Authorization` header.”
  - “If you omit `per_page`, the default is applied.”

## Technical conventions

### Code and commands
- Fence code blocks with a language where possible:
  - ```bash```, ```json```, ```yaml```
- When showing requests, include:
  - HTTP method
  - full URL (base + path + query params)
  - required headers
  - body (if applicable)

### Placeholders
Use double braces for variables when consistent with your examples:

- `{owner}`, `{repo}`, `{issue_number}`

### Parameters
- Prefer a short bullet list for small sets (2–4 params).
- Prefer a table when there are many parameters or constraints.

## Examples and evidence

This repo is evidence-backed. When a behavior claim could be disputed, connect it to evidence.

### When to cite evidence
Cite evidence when you claim:
- defaults and limits (`per_page` default, max values)
- behavior with invalid inputs (negative numbers, non-integers)
- specific error formats (422 payload validation shape)

### How to cite evidence
- Prefer linking to a stable artifact name (file) in `evidence/raw/` or to the traceability map.
- Use an “Evidence” column in tables when troubleshooting.

Keep evidence citations lightweight and readable:
- Good: `TEST-037A...401...json`
- Better (when available): link to a stable traceability row in `evidence/TRACEABILITY_MAP.md`

## Error handling guidance

- Name the status code and meaning, then prescribe action.
- Include how to verify the fix worked.

Example pattern:
- **401 Unauthorized:** missing/invalid token → add header → retry request.
- **422 Unprocessable Entity:** payload validation → correct required fields → retry.

## Links policy

- Prefer relative links inside the Guides set (for portability).
- Use canonical GitHub links when referencing repo files meant to be reviewed on GitHub.

Canonical repo root:
- https://github.com/derrickscottux-collab/github-issues-openapi-portfolio

## Accessibility and readability

- Keep lines in tables readable (wrap long text if needed).
- Avoid walls of text; use bullets and subheadings.
- Expand acronyms once on first use (then use the acronym).

## “Done” definition for a page

A page is ready when:
- Audience + Scope are present.
- Examples are consistent with the house format.
- Any non-obvious behavior claims have evidence references.
- Links work (relative + external).
- A reader can verify success or reproduce the described behavior.
