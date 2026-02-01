# Pagination and Filtering

**Audience:** Developers integrating with the GitHub Issues REST API (portfolio subset)

**Scope:** Observed pagination and query-parameter behavior for `GET /repos/{{owner}}/{{repo}}/issues`, backed by saved request/response evidence.


This guide documents behavior that can be easy to get wrong if you only read generic reference docs: defaults, max limits, and what happens when inputs are invalid.

## Pagination parameters

- `per_page`: number of results per page
- `page`: which page of results to return

## Observed defaults and limits (verified)

- Default `per_page` is **30** when omitted
  - Evidence: `TEST-001_GET_repos_owner_repo_issues_200_20251210_0214ET.json`
- `per_page=10` returns **10** results
  - Evidence: `TEST-011_GET_repos_owner_repo_issues_per_page_10_200_20251214_2039ET.json`
- Max `per_page` is **100**
  - Evidence: `TEST-013_GET_repos_owner_repo_issues_per_page_100_200_20251214_2051ET.json`
- If `per_page` is above max (example `150`), results cap at **100**
  - Evidence: `TEST-V2_GET_repos_owner_repo_issues_per_page_150_200_20260112_1539ET.json`
- If `per_page=0`, results fall back to **30**
  - Evidence: `TEST-V3_GET_repos_owner_repo_issues_per_page_0_200_20260112_1539ET.json`
- If `per_page` is negative (example `-5`), results fall back to **30**
  - Evidence: `TEST-V4_GET_repos_owner_repo_issues_per_page_-5_200_20260112_1539ET.json`

## Examples

### Get 10 issues
`GET /repos/{owner}/{repo}/issues?per_page=10`

### Get page 2 with 5 per page
`GET /repos/{owner}/{repo}/issues?per_page=5&page=2`

Verified evidence:
- `TEST-045_GET_repos_owner_repo_issues_per_page_5_page_2_200_20260106_1945ET.json`

## Sorting and direction

The list issues endpoint supports `sort` and `direction`. Two verified behaviors are worth calling out:

### Gotcha: invalid `sort` can be silently ignored
If `sort` is invalid, the request may still return `200 OK` and fall back to the default sort behavior.

- Evidence: `TEST-042_GET_repos_owner_repo_issues_sort_invalid_200_20260106_1945ET.json`

### Gotcha: `direction` may be ignored when `sort` is invalid
When `sort` is invalid, `direction` may not change ordering as expected.

- Evidence: `TEST-V1_GET_repos_owner_repo_issues_sort_invalid_direction_asc_200_20260112_1539ET.json`

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
