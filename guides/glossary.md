# Glossary

**Audience:** Developers integrating with the GitHub Issues REST API (portfolio subset)

**Scope:** Short definitions for recurring terms used across the guides and evidence artifacts.


- **Artifact**: A saved request/response record captured during testing and stored in `evidence/raw/` (ET timestamps in filenames).
- **Evidence matrix**: A high-level index of tests and the evidence that supports each behavior claim (`evidence/EVIDENCE_MATRIX.md`).
- **Traceability map**: A map that connects tests, endpoints, and evidence artifacts (`evidence/TRACEABILITY_MAP.md`).
- **Pagination**: Fetching results across multiple pages using `per_page` and `page` query parameters.
- **`per_page`**: Number of results returned per page. Verified max is 100 in this portfolio scope.
- **`page`**: Which page of results to return (used with `per_page`).
- **Validation error (`422`)**: The server accepted the request format but rejected the payload content (example: missing required `title`).
- **Rate limit**: GitHub limits request volume. This repo documents the relevant headers, but rate limiting is not exhaustively tested.

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

