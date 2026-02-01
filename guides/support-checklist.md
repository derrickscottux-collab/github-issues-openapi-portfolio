# Support checklist

**Audience:** Developers integrating with the GitHub Issues REST API (portfolio subset)

**Scope:** A concise checklist for filing high-quality bug reports or doc issues, tuned for this repo’s evidence-based workflow.


Use this checklist when:
- reporting an issue in this repo
- filing a bug with a reproduction case
- proposing a documentation change

## Include these details

- Endpoint + full URL (including query parameters)
- HTTP method (`GET`, `POST`, `PATCH`, `DELETE`)
- Request headers (redact tokens)
- Request body (if any)
- Status code
- Relevant response fields (for errors: `message`, `status`, and any validation details)
- Time (ET) and the closest matching evidence artifact filename (if applicable)
- Clear reproduction steps (1, 2, 3)

## Redact

- `Authorization` tokens
- Any sensitive repo/org identifiers if you used private resources

## Where to find examples
- Raw response artifacts: `evidence/raw/`
- Evidence manifest (index of artifacts): `evidence/manifest.json`
- Test suite write-up: `tests/github_api_test_suite.md`

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

