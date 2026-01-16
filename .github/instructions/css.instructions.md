---
applyTo: "assets/css/**"
---

# CSS Instructions (Path-specific)

## Formatting
- Use 2-space indentation.
- One selector block per line group; keep readable ordering.
- Keep comments short; explain "why" not "what".

## Specificity & safety
- Avoid overly generic selectors (e.g., `a {}`) unless already present in legacy CSS.
- Prefer scoping under known containers (theme wrappers, page templates, Elementor sections).
- Never remove a rule unless you confirm it is unused and documented.

## Build header
At the very top of each changed file, maintain:

/* Project: La Maison Bossche
 * Version: X.Y.Z
 * Build: <channel>-<YYYYMMDD>.<increment>
 * Source: Blocksy Extra CSS (migrated)
 */
