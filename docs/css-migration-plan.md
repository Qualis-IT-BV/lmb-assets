# CSS Migration Plan (Blocksy Extra CSS -> External CSS)

## Principle
Migrate 1:1 first. Refactor later.

## Steps per migration batch
1. Copy the next logical block from Blocksy Extra CSS.
2. Place into the correct external file:
   - global -> `assets/css/global.css`
   - component -> `assets/css/components/<name>.css`
   - page-specific -> `assets/css/pages/<slug>.css`
3. Add notes if:
   - selector is broad
   - Elementor inline styles override
   - requires `!important`
4. Update build header.
5. Test on dev environment.
