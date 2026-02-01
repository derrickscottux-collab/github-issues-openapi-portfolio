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
- [Guide index](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/tree/main/guides)
- [Glossary](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/guides/glossary.md)
- [OpenAPI spec](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/openapi/openapi.yaml)
- [Test suite](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/tests/github_api_test_suite.md)
- [Evidence package](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/evidence/README.md)
- [Evidence matrix](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/evidence/EVIDENCE_MATRIX.md)
- [Traceability map](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/evidence/TRACEABILITY_MAP.md)
- [Evidence manifest](https://github.com/derrickscottux-collab/github-issues-openapi-portfolio/blob/main/evidence/manifest.json)

