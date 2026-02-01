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

- Guide index: [`guides/README.md`](README.md)
- Glossary: [`guides/glossary.md`](glossary.md)
- OpenAPI spec: [`openapi/openapi.yaml`](../openapi/openapi.yaml)
- Rendered reference docs (GitHub Pages): https://derrickscottux-collab.github.io/github-issues-openapi-portfolio
- Test suite: [`tests/github_api_test_suite.md`](../tests/github_api_test_suite.md)
- Evidence package: [`evidence/README.md`](../evidence/README.md)
- Evidence matrix: [`evidence/EVIDENCE_MATRIX.md`](../evidence/EVIDENCE_MATRIX.md)
- Traceability map: [`evidence/TRACEABILITY_MAP.md`](../evidence/TRACEABILITY_MAP.md)
- Evidence manifest: [`evidence/manifest.json`](../evidence/manifest.json)
