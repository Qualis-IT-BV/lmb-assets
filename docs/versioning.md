# Versioning & Build Numbers

## Why
We want deterministic tracking of which CSS is deployed on dev/staging/live without guessing.

## Format
- Version (human): `X.Y.Z`
- Build (deployment): `<channel>-<YYYYMMDD>.<increment>`
  - Example: `dev-20260115.001`

## Rules
- Patch bump (Z): small fixes, specificity adjustments, typo fixes
- Minor bump (Y): new component/page styling migration set
- Major bump (X): structural refactor or breaking selector changes

## Channels
- dev: feature integration
- staging: acceptance testing
- live: production
