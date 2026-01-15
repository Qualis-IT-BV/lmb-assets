# Copilot Instructions (Repository-wide)

You are working in a WordPress + WooCommerce site (La Maison Bossche) using Blocksy theme + Elementor.
Goal: migrate custom CSS from Blocksy “Extra CSS” into external, versioned CSS maintained in this repo.

## Branching & PR discipline
- Default base branch for work is `dev`.
- Create focused feature branches: `feature/<topic>` (e.g., `feature/extract-blocksy-css`).
- Keep PRs small and scoped: one topic per PR.

## Versioning & build numbers
- Every delivered CSS file MUST include a build header comment at the top.
- Build format:
  - `Build: <channel>-<YYYYMMDD>.<increment>`
  - Example: `Build: dev-20260115.001`
- Also include a human version:
  - `Version: 0.1.0` (SemVer-ish; bump minor when adding sets of selectors, patch for fixes)

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
