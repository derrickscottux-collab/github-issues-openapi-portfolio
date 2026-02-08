# PR review checklist

Use this checklist to review documentation changes. The goal is to ship docs that are clear, verifiable, and consistent with the house style.

## Content correctness
- [ ] Claims match observed behavior (or are scoped clearly as “in this tested scope”).
- [ ] Examples are accurate and consistent with the endpoint being documented.
- [ ] Error guidance is actionable (cause → fix → verify).

## Completeness
- [ ] The page includes **Audience** and **Scope**.
- [ ] The page states what success looks like (expected result).
- [ ] Any tricky behavior (defaults, limits, invalid inputs) is explained.

## Evidence and testability
- [ ] Behavior claims that could be disputed include evidence references.
- [ ] Troubleshooting tables include an Evidence reference when available.
- [ ] Verification steps exist (how the reader confirms success).

## Consistency
- [ ] Terminology matches `TERMINOLOGY.md`.
- [ ] Headings follow the style guide.
- [ ] Parameter names and endpoints are formatted consistently (backticks).

## Formatting and readability
- [ ] Code blocks are fenced with a language where possible.
- [ ] Tables are readable and not overly wide.
- [ ] Bullets and headings break up long sections.

## Links and navigation
- [ ] Relative links between guides work.
- [ ] External links point to canonical pages.
- [ ] If this change adds a new guide, the Guides index/nav is updated.

## Build/publish readiness (if applicable)
- [ ] If the Guides site is generated, the generated output was rebuilt (when required by the repo workflow).
- [ ] No obvious broken images/paths in rendered output.
