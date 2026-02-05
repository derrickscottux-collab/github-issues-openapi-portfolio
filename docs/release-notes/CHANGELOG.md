# Changelog (documentation set)

## [2.0.0] - 2026-02-04
### Added
- Static Guides HTML site under `docs/guides/` with shared styling and navigation.
- Build script `scripts/build-guides.mjs` to regenerate Guides output consistently.

### Changed
- README promotes Guides live HTML URL and keeps source Markdown links.
- OpenAPI metadata includes `externalDocs` pointing to the Guides index.
- “Related links” in guides use canonical GitHub URLs (tree/blob).

### Deprecated
- Relative/local “Related links” intended for the published Guides site (remove fully by v2.1).

### Fixed
- Broken “Related links” behavior when rendered as HTML (local file path resolution).
