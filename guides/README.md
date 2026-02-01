# Guides

**Audience:** Developers integrating with the GitHub Issues REST API (portfolio subset)

**Scope:** Task-based documentation that complements the rendered OpenAPI reference docs. These guides are designed to be readable on GitHub and easy to link from a docs site.


## Start here

- **Quickstart:** [`quickstart.md`](quickstart.md)
- **Pagination and Filtering:** [`pagination-and-filters.md`](pagination-and-filters.md)
- **Errors and Troubleshooting:** [`errors-and-troubleshooting.md`](errors-and-troubleshooting.md)
- **Support checklist:** [`support-checklist.md`](support-checklist.md)
- **Glossary:** [`glossary.md`](glossary.md)

## What these guides add (beyond the OpenAPI spec)

- Fast onboarding path (quickstart)
- Evidence-backed notes on defaults, caps, and invalid inputs
- Troubleshooting patterns with saved examples
- A reproducible support/reporting checklist

## Known limitations (by design)

- This is **not** a full GitHub REST API specification. It covers only endpoints and behaviors verified in the included test suite and evidence artifacts.
- Evidence reflects observations during **2025-12-10 to 2026-01-06 (ET)**; GitHub behavior may change over time.
- Authentication is documented at a practical level (Bearer token), but token scope and org policy outcomes are environment-specific.
- Rate limiting is referenced via headers, but rate-limit behavior is not exhaustively tested in this portfolio scope.

---

## Related links
- [Guide index](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/tree/main/guides)
- [Glossary](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/guides/glossary.md)
- [OpenAPI spec](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/openapi/openapi.yaml)
- [Test suite](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/tests/github_api_test_suite.md)
- [Evidence package](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/evidence/README.md)
- [Evidence matrix](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/evidence/EVIDENCE_MATRIX.md)
- [Traceability map](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/evidence/TRACEABILITY_MAP.md)
- [Evidence manifest](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/evidence/manifest.json)

