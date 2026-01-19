# Release Process

## Doel
Dit document beschrijft het proces voor het maken van een release naar staging/main branches.

## Wanneer een release maken?

Een release maak je wanneer:
- Features zijn getest in dev en klaar voor acceptance testing (→ staging)
- Acceptance testing is afgerond en klaar voor productie (→ main)

## Release Proces

### 1. Pre-Release Checklist

- [ ] Alle wijzigingen zijn gecommit en gepusht naar dev branch
- [ ] Build nummers zijn bijgewerkt (`dev-YYYYMMDD.xxx`)
- [ ] Alle features zijn getest in dev omgeving
- [ ] Logger config is correct voor productie (niveau's aangepast)

### 2. Bepaal Release Versie

Volg semantic versioning (X.Y.Z):
- **Major (X)**: Breaking changes, grote refactors
- **Minor (Y)**: Nieuwe features, nieuwe componenten
- **Patch (Z)**: Bug fixes, kleine aanpassingen

### 3. Update Headers

Voor **ALLE** gewijzigde bestanden:

#### Als component nog nooit released is:
```javascript
/* Project: La Maison Bossché
 * Component: ComponentName
 * Version: 1.0.0
 * Build: staging-20260119.001  (of live-20260119.001)
 * First Release: lmb-assets 1.0.0 (2026-01-19)
 * Last Change: lmb-assets 1.0.0 (2026-01-19)
 * Source: <origin>
 */
```

#### Als component al bestaat en GEWIJZIGD is:
```javascript
/* Project: La Maison Bossché
 * Component: ComponentName
 * Version: 1.2.0  (verhoogd)
 * Build: staging-20260125.001
 * First Release: lmb-assets 1.0.0 (2026-01-19)  (blijft origineel)
 * Last Change: lmb-assets 1.2.0 (2026-01-25)  (nieuwe versie + datum)
 * Source: <origin>
 */
```

#### Als component al bestaat maar NIET GEWIJZIGD:
- Headers blijven exact zoals ze waren
- Geen update van Last Change!

### 4. Update Build Channels

Vervang in gewijzigde bestanden:
- `dev-YYYYMMDD.xxx` → `staging-YYYYMMDD.001` (voor staging)
- `staging-YYYYMMDD.xxx` → `live-YYYYMMDD.001` (voor main)

### 5. Update Global Loader

Update `assets/js/external/custom-css-js-plugin/loader.js`:

```javascript
var CONFIG = {
    staging: {
        ref: 'staging',  // of commit hash
        assets: {
            css: ['css/global.css', 'css/blocksy-extra.css'],
            js: ['js/global.js', 'js/components/Wishlist.js']
        }
    },
    prod: {
        ref: 'main',  // of commit hash van release
        assets: {
            // Zelfde als staging (tenzij specifiek anders)
        }
    }
};
```

### 6. Merge & Tag

**Voor Staging:**
```bash
git checkout staging
git merge dev --no-ff -m "Release v1.2.0 to staging"
git tag -a v1.2.0-staging -m "Release 1.2.0 to staging"
git push origin staging --tags
```

**Voor Production:**
```bash
git checkout main
git merge staging --no-ff -m "Release v1.2.0 to production"
git tag -a v1.2.0 -m "Release 1.2.0"
git push origin main --tags
```

### 7. Update docs/releases.md

Voeg entry toe:

```markdown
## v1.2.0 - 2026-01-19

### Added
- Nieuwe logger utility met configureerbare log levels

### Changed
- Wishlist.js verbeterde popup timing

### Fixed
- Bug fix in wishlist button positionering

### Components Updated
- logger.js: First Release lmb-assets 1.0.0 (2026-01-19) → Last Change lmb-assets 1.0.0 (2026-01-19) (nieuw)
- Wishlist.js: First Release lmb-assets 1.0.0 (2026-01-19) → Last Change lmb-assets 1.2.0 (2026-01-25) (gewijzigd)
- global.css: Niet gewijzigd, headers ongewijzigd
```

### 8. Post-Release

- [ ] Verify deployment in staging/prod omgeving
- [ ] Test critical functionality
- [ ] Update dev branch indien nodig:
  ```bash
  git checkout dev
  git merge main
  ```

## Rollback Procedure

Bij problemen:

```bash
# Terug naar vorige tag
git checkout main
git reset --hard v1.1.0  # vorige versie
git push origin main --force

# Update tags
git tag -d v1.2.0
git push origin :refs/tags/v1.2.0
```

## Notities

- **Testing Script**: DISABLE tijdens merge naar staging/main
- **Logger.js**: Wordt NIET meegenomen naar productie via Global Loader
- **First Release**: Mag nooit wijzigen na eerste release
- **Last Release**: Wordt alleen bijgewerkt bij wijzigingen in dat bestand
