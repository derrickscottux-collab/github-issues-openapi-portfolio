# Quickstart

**Audience:** Developers integrating with the GitHub Issues REST API (portfolio subset)

**Scope:** This repo documents only the endpoints and behaviors verified by the included tests and evidence (ET timestamps in filenames).


This guide gets you to a successful request quickly, then points you to the deeper behavior notes (pagination, filters) and troubleshooting.

## Requirements

- A GitHub Personal Access Token (recommended for rate limits and write operations)
- An HTTP client (curl, Postman, or similar)

## Base URL

`https://api.github.com`

## Recommended headers

- `Accept: application/vnd.github+json`
- `X-GitHub-Api-Version: 2022-11-28`
- `Authorization: Bearer <YOUR_TOKEN>` (recommended)

## Step 1: List issues (read-only, public)

**Endpoint:** `GET /repos/{owner}/{repo}/issues`

**Example (public repo):**
```bash
curl -s \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  "https://api.github.com/repos/facebook/react/issues"
```

**What to expect**
- Status: `200 OK`
- Body: an array of issues (may include pull requests)
- Default behavior (verified):
  - `state` defaults to `open` when omitted (see evidence: `TEST-001...json`)
  - `per_page` defaults to `30` when omitted

## Step 2: Limit results (pagination)

**Example: get 10 results**
```bash
curl -s \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  "https://api.github.com/repos/facebook/react/issues?per_page=10"
```

Verified evidence:  
- `evidence/raw/TEST-011_GET_repos_owner_repo_issues_per_page_10_200_20251214_2039ET.json`

See the full pagination notes in: **Pagination and Filtering**.

## Step 3: Create an issue (write operation)

**Endpoint:** `POST /repos/{owner}/{repo}/issues`

This is only in-scope for the repo you used for testing (see test suite). If you omit authentication, the API returns `401`.

Verified evidence:
- Missing auth → `401 Unauthorized`: `evidence/raw/TEST-037A_POST_repos_owner_repo_issues_401_20251220_0346ET.json`

Minimal JSON body:
```json
{"title":"Example issue from docs","body":"Created while validating the portfolio docs."}
```

## Common failure cases (fast check)

- **401 Unauthorized**: missing/invalid token
- **404 Not Found**: wrong owner/repo, or private repo without access
- **422 Unprocessable Entity**: invalid payload (example: missing `title`)

For details and fixes, see: **Errors and Troubleshooting**.

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

