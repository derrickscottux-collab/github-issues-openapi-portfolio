# Terminology and naming

Use these conventions to keep wording consistent across guides, reference notes, and evidence-backed claims.

## Core terms

- **Artifact:** A saved request/response record captured during testing and stored in `evidence/raw/`.
- **Evidence matrix:** Index of tests and the evidence supporting each behavior claim (`evidence/EVIDENCE_MATRIX.md`).
- **Traceability map:** Map connecting tests, endpoints, and evidence artifacts (`evidence/TRACEABILITY_MAP.md`).

## Status code phrasing

Prefer:
- `401 Unauthorized` (not “Auth error”)
- `404 Not Found` (not “Missing endpoint”)
- `422 Unprocessable Entity` (not “Invalid request” without context)

When you mention a status code, include:
1. Likely cause
2. What to do
3. How to verify

## Parameter naming

- Wrap parameter names in backticks: `per_page`, `page`
- Wrap endpoint paths in backticks: `GET /repos/{owner}/{repo}/issues`

## Placeholder rules

- Use `{owner}` and `{repo}` consistently.
- If an example uses a concrete repo, keep it consistent across the page.

## “Verified” claims

Use “verified” only when backed by evidence in this repo’s scope.

- Good: “Verified max `per_page` is 100 in this portfolio scope.”
- Not good: “GitHub always returns 100 max.” (too broad)

When in doubt, add “in this tested scope” or “observed in saved evidence.”

## Page titles

Use Title Case and keep them stable:
- Quickstart
- Pagination and Filtering
- Errors and Troubleshooting
- Support checklist
- Glossary
