# Errors and Troubleshooting

**Audience:** Developers integrating with the GitHub Issues REST API (portfolio subset)

**Scope:** Troubleshooting guidance for common failure modes observed in the tested scope. All examples are backed by saved evidence artifacts.


## Quick diagnosis table

| Symptom | Likely cause | What to do | Evidence |
|---|---|---|---|
| `401 Unauthorized` | Missing or invalid `Authorization` header | Add `Authorization: Bearer <token>` | `TEST-037A...401...json` |
| `404 Not Found` | Wrong owner/repo, or you lack access to a private repo | Verify spelling and access | (environment-dependent) |
| `422 Unprocessable Entity` | Validation error in request body | Fix required fields and payload format | `TEST-037...422...json` |

## 401 example: create issue without authentication

**Observed response**
- Status: `401 Unauthorized`
- Message indicates authentication is required

Evidence:
- `evidence/raw/TEST-037A_POST_repos_owner_repo_issues_401_20251220_0346ET.json`

**Fix**
- Include `Authorization: Bearer <token>` and ensure the token has access to the repo.

## 422 example: missing title when creating an issue

**Observed response**
- Status: `422 Unprocessable Entity`
- Message indicates the `title` field was not supplied

Evidence:
- `evidence/raw/TEST-037_POST_repos_owner_repo_issues_422_20251220_0341ET.json`

**Fix**
- Include a non-empty `title` field in the JSON body.

Minimal example:
```json
{"title":"Required title","body":"Optional body"}
```

## When to use the evidence artifacts
If you’re debugging a mismatch between expected and observed behavior, compare:
- The request parameters you sent
- The saved evidence artifact for the corresponding test
- The OpenAPI description (which may include “Verified in: Test #…” notes)

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
