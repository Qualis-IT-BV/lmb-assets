---
applyTo: "**/*"
---

# Versioning & Build Policy

## Header Format

### For feature/dev branches (unreleased):
```javascript
/* Project: La Maison Bossché
 * Component: <ComponentName>
 * Build: dev-<YYYYMMDD>.<increment>
 * First Release: lmb-assets unreleased
 * Last Change: -
 * Source: <origin>
 */
```

### For releases (staging/main):
```javascript
/* Project: La Maison Bossché
 * Component: <ComponentName>
 * Version: X.Y.Z
 * Build: <channel>-<YYYYMMDD>.<increment>
 * First Release: lmb-assets X.Y.Z (YYYY-MM-DD)
 * Last Change: lmb-assets X.Y.Z (YYYY-MM-DD)
 * Source: <origin>
 */
```

## Rules
- **EVERY change** that affects functionality must update the build number
- Build number MUST be incremented in ALL branches (feature/dev/staging/main)
- Increment build counter per day per channel:
  - feature branches: `dev-<YYYYMMDD>.<increment>`
  - dev branch: `dev-<YYYYMMDD>.<increment>`
  - staging branch: `staging-<YYYYMMDD>.<increment>`
  - main branch: `live-<YYYYMMDD>.<increment>`
- Version field only appears when merging to staging/main (releases)
- Use channels:
  - dev = working integration
  - staging = preprod validation
  - live = production releases

## Versioning (for releases)
- Version number only changes when merging to staging/main
- Patch bump (Z): small fixes, specificity adjustments, typo fixes
- Minor bump (Y): new component/page styling migration set
- Major bump (X): structural refactor or breaking selector changes

## Logging
- Scripts should log their Version (if present) OR Build on initialization
- Use INFO level for startup logs with version/build info
- Format: "Component initialized (Version: X.Y.Z, Build: <build>)" or "Component initialized (Build: <build>)"

## Release Tracking
- **First Release**: Set once when component is first released, NEVER changes
- **Last Change**: Updated ONLY when the file is modified in a new release
- Both include version number and release date in format: `lmb-assets X.Y.Z (YYYY-MM-DD)`

