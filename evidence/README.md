# Evidence Pack

This folder contains response artifacts used to support the GitHub Issues API portfolio test suite.

## What is in here
- `raw/`: JSON response artifacts
- `manifest.json`: full inventory of artifacts with hashes
- `traceability_map.csv` and `TRACEABILITY_MAP.md`: mapping from tests to artifacts
- `EVIDENCE_MATRIX.md`: category-based matrix view

## Naming convention (standardized)
`TEST-<ID>_<METHOD>_<PATH>[_<QUERY> ]_<STATUS>_<YYYYMMDD>_<HHMM>ET.json`

## Notes
- Some tests may reuse the same underlying response content. In those cases, this pack stores a copied artifact per test so filenames match the test ID.
- Keep tokens redacted before committing.