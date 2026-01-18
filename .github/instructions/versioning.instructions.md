---
applyTo: "**/*"
---

# Versioning & Build Policy

## Header Format

### For feature/dev branches:
```javascript
/* Project: La Maison Bossché
 * Component: <ComponentName>
 * Build: dev-<YYYYMMDD>.<increment>
 * Source: <origin>
 */
```

### For releases (staging/main):
```javascript
/* Project: La Maison Bossché
 * Component: <ComponentName>
 * Version: X.Y.Z
 * Build: <channel>-<YYYYMMDD>.<increment>
 * Source: <origin>
 */
```

## Rules
- Any change that affects front-end output must update the build number
- Increment build counter per day per channel (dev/staging/live)
- Version field only appears in staging/main branches
- Feature branches use Build only
- Use channels:
  - dev = working integration
  - staging = preprod validation
  - live = production releases

## Versioning (for releases)
- Patch bump (Z): small fixes, specificity adjustments, typo fixes
- Minor bump (Y): new component/page styling migration set
- Major bump (X): structural refactor or breaking selector changes

## Logging
- Scripts should log their Version (if present) OR Build on initialization
- Use INFO level for startup logs with version/build info
- Format: "Component initialized (Version: X.Y.Z, Build: <build>)" or "Component initialized (Build: <build>)"

