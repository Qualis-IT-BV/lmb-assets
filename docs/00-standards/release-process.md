# Release-procedure – herbruikbaar template

Dit document beschrijft **stap-voor-stap** hoe een release wordt voorbereid en aangemaakt, inclusief:
- functionele volgorde
- vereiste checks
- gebruikte Git-commando’s
- vaste structuur voor component-headers en CHANGELOG

Deze procedure is bedoeld om **ongewijzigd te hergebruiken** voor elke nieuwe release.

---

## Stap 1 – Feature branch naar `dev` brengen

Zorg dat alle functionaliteit eerst netjes in `dev` zit.

```bash
git checkout dev
git pull origin dev
git merge feature/<naam-branch>
git push origin dev
```

> Regel: **Nooit direct releasen vanaf een feature- of hotfix-branch**.

---

## Stap 2 – Gewijzigde componenten controleren

Bepaal welke bestanden onderdeel zijn van de release:

```bash
git diff --name-only origin/dev...HEAD
```

Voor **elk gewijzigd component** geldt:
- Componentversie verhogen indien functioneel gewijzigd
- Buildnummer en datum controleren
- `Last Change` bijwerken
- `First Release` alleen bij nieuwe bestanden

### Standaard component-header

```text
# Project: <project-naam>
# Component: <component-naam>
# Component Version: vX.Y.Z
# Build: <branch>-YYYYMMDD.###
# First Release: <project> vA.B.C
# Last Change: DD-MM-YYYY
# Source: New | Derived from <bron>
#
# Purpose: <korte functionele beschrijving>
#
# Note: <optioneel>
```

**Voorbeeld (pre-commit.sh):**

```text
# Project: q-githooks
# Component: pre-commit.sh
# Component Version: v0.1.0
# Build: dev-20260126.001
# First Release: q-githooks v0.0.1
# Last Change: 26-01-2026
# Source: New
#
# Purpose: This script automatically adds or updates file headers and build numbers.
#          It reads configuration from pre-commit-header.config.
#          It only runs on branches starting with feature/ or hotfix/.
#          Modified files are automatically re-staged.
#
# Note: Requires pre-commit-header.config
```

---

## Stap 3 – CHANGELOG bijwerken

De changelog staat **altijd in de root** van de repository:

```
/CHANGELOG.md
```

### Standaard CHANGELOG-structuur

```md
# Changelog
Alle noemenswaardige wijzigingen aan dit project worden hier vastgelegd.

## [vX.Y.Z] - YYYY-MM-DD
### Added
- ...

### Changed
- ...

### Fixed
- ...
```

### Voorbeeld – eerste release

```md
## [v0.0.1] - 2026-01-29
### Added
- Eerste basisstructuur
- Initiele componenten
- Build- en header-standaard

### Changed
- n.v.t.

### Fixed
- n.v.t.
```

---

## Stap 4 – Release-prep commit op `dev`

Alleen versie-, header- en changelog-wijzigingen.

```bash
git add -A
git commit -m "chore(release): prepare vX.Y.Z"
git push origin dev
```

---

## Stap 5 – Release branch aanmaken

```bash
git checkout -b release/vX.Y.Z dev
git push -u origin release/vX.Y.Z
```

> Vanaf dit moment is de release branch **read-only**.

---

## Stap 6 – Tag aanmaken (leidend!)

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin vX.Y.Z
```

- Tags zijn **immutabel**
- Nooit wijzigen of verplaatsen

---

## Stap 7 – GitHub Release aanmaken

In GitHub:
1. Releases → *Draft new release*
2. Tag: `vX.Y.Z`
3. Target branch: `release/vX.Y.Z`
4. Titel: `vX.Y.Z – <korte omschrijving>`
5. Beschrijving: kopie uit CHANGELOG
6. Pre-release aanvinken indien van toepassing

---

## Samenvatting (vaste volgorde)

1. Feature → dev
2. Componentversies & headers controleren
3. CHANGELOG bijwerken
4. `chore(release)` commit
5. Release branch maken
6. Tag aanmaken en pushen
7. GitHub Release publiceren

> **Regel:** alles wat na een tag komt → **nieuwe release**.

