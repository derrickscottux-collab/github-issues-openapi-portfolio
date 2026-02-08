# Examples Policy

This project treats examples as **evidence-backed behavior**, not decoration.

## Goals
- Make request/response behavior **verifiable**
- Make examples **copyable** with minimal edits
- Keep examples **consistent** across Guides and Reference

## Required elements for an example
For every endpoint you document (Guides or Reference), include at least one example that contains:

1. **Method + full path**
   - Example: `GET /repos/{owner}/{repo}/issues`

2. **Base URL (when a full URL is shown)**
   - Use: `https://api.github.com`
   - If you show a full URL, show the **complete** query string.

3. **Authentication note**
   - If auth affects the result, call it out explicitly.
   - Prefer: “Requires authentication” / “Works without authentication” with a brief note on differences.

4. **Headers (only the ones that matter)**
   - Show required headers and headers that influence behavior.
   - Recommended baseline:
     - `Accept: application/vnd.github+json`
     - `X-GitHub-Api-Version: 2022-11-28`
     - `Authorization: Bearer $GITHUB_TOKEN` (only when needed)

5. **Parameters**
   - If query parameters are used, list them in a short table or bullet list.
   - Include defaults if your docs rely on them.

6. **Response snippet**
   - Include enough of the response to show structure and key fields.
   - If the response is large, use `...` to omit irrelevant parts.

## Placeholders
Use consistent placeholders:
- `{owner}`, `{repo}`, `{issue_number}` for path params
- `$GITHUB_TOKEN` for secrets
- ISO 8601 timestamps in examples when needed

Do **not** use real secrets or personal tokens in any committed file.

## Evidence references
When an example corresponds to a saved evidence file, add an evidence reference directly under the example:

- **Evidence:** `evidence/raw/<FILENAME>.json`

If you want the reference to remain stable, prefer linking to a test ID or filename (not a local timestamp in prose).

## Negative and edge-case examples
When behavior is easy to misunderstand, add at least one of:
- “invalid parameter” example (shows validation)
- boundary `per_page` (0, negative, too large)
- missing/unknown resource (404)
- unauthorized (401) if applicable

## Formatting conventions
- Use fenced code blocks with a language:
  - `bash` for curl
  - `http` for raw HTTP
  - `json` for responses
- Keep curl commands readable: one flag per line when long.

## Quick copy pattern (recommended)
Use this layout in Guides:

1. Short context (1–2 lines)
2. Example request (curl or raw HTTP)
3. Example response snippet
4. Evidence reference (when available)
5. “What to check” (1–3 bullets to verify)

