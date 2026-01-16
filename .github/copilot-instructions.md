# Copilot Instructions (Repository-wide)

You are working in a WordPress + WooCommerce site (La Maison Bossche) using Blocksy theme + Elementor.
Goal: migrate custom CSS from Blocksy “Extra CSS” into external, versioned CSS maintained in this repo.

## Branching & PR discipline
- Default base branch for work is `dev`.
- Create focused feature branches: `feature/<topic>` (e.g., `feature/extract-blocksy-css`).
- Keep PRs small and scoped: one topic per PR.


## Versioning, build numbers & releaseflow
- **Build-nummer**: Elke commit in een feature branch verhoogt het build-nummer (`Build: <branch>-<YYYYMMDD>.<increment>`).
- **Versie-nummer**: Alleen verhogen bij merge naar `dev`, `staging` of `main` (prod). In feature branches géén Version, alleen Build.
- **Releaseflow**: Altijd werken via Feature → Dev → Staging → Prod. Elke stap wordt getest en gevalideerd.
- **Basisversie**: Leg in elke feature branch vast op welke basisversie/commit deze is gebouwd (in docs/ of branch-notes).
- Elke branch en PR moet deze afspraken volgen.

## CSS migration rules
- Do NOT change visuals intentionally while migrating. Prefer 1:1 extraction.
- Keep selectors stable. If a selector is risky/too broad, add a note in `docs/blocksy-notes.md`.
- Group CSS by page/component where possible.
- Avoid `!important` unless it already existed or is required to match current behavior.

## Output expectations
- When you create or modify CSS, provide:
  - What changed (bullets)
  - Where it came from (Blocksy Extra CSS snippet reference)
  - Risk notes (specificity, cascade, Elementor overrides)
  - The new build header

## Repo conventions
- Put CSS under `assets/css/` (create if missing).
- Prefer filenames:
  - `global.css`
  - `components/<name>.css`
  - `pages/<slug>.css`
- Keep docs updated when decisions are made (ADR-style notes in `docs/`).
