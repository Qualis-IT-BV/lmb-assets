# Test Plan - Version Propagation & Loader System

**Commit:** 014a999  
**Datum:** 2026-01-19  
**Doel:** Verificeren dat versie-propagatie correct werkt en alle components van dezelfde versie/commit geladen worden

---

## Voorbereiding

### Setup
1. Push commit naar GitHub: `git push origin feature/migrate-blocksy-assets-20260116`
2. Verkrijg commit hash voor testing (bijv. `014a999`)
3. Open WordPress Admin → Custom CSS & JS Plugin

### Test Omgevingen
- **Test URL:** https://test.lamaisonbossche.nl (of dev.lamaisonbossche.nl)
- **Browser:** Chrome met DevTools open (Console tab)

---

## Test 1: Global Loader (Productie Setup)

**Doel:** Verificeer dat Global Loader alle assets van dezelfde versie laadt

### Stappen:
1. Open `GitHub-global-CSS-JS-loader.js` in Custom CSS/JS Plugin
2. Zet `RELEASE_VERSION = 'main'`
3. Laad website (hard refresh: Cmd+Shift+R)

### Verwachte Console Output:
```
[LMB Loader] Loading from: main
[LMB Loader] CSS loaded: global.css
[LMB Loader] JS loaded: global.js
[LMB Components] Loading components from: main
```

### Verificatie:
- [ ] Alle console berichten tonen `main` als versie
- [ ] Geen warnings over ontbrekende LMB_LOADER_VERSION
- [ ] Wishlist functionaliteit werkt (hartjes zichtbaar op producten)
- [ ] CSS styling correct (blocksy-extra.css geladen)

### Browser Check:
Network tab → Filter `lmb-assets` → Verificeer URL's:
- [ ] `cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@main/assets/css/global.css`
- [ ] `cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@main/assets/js/global.js`
- [ ] `cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@main/assets/css/components/blocksy-extra.css`
- [ ] `cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@main/assets/js/components/Wishlist.js`

---

## Test 2: Testing Script met Logger (Development Setup)

**Doel:** Verificeer dat Testing Script alle assets van test-commit laadt inclusief logger

### Voorbereiding:
1. Update `logger-config.js`:
   ```javascript
   commit: '014a999'
   ```
2. Zet in Testing Script: `OVERRIDE_COMMIT = null` (gebruikt logger-config.js)

### Stappen:
1. Disable Global Loader script
2. Enable Testing Script + logger-config.js
3. Laad website (hard refresh)

### Verwachte Console Output:
```
[LMB Test] ACTIVE - Loading from commit: 014a999
2026-01-19T... INFO LMB Logger [Logger utility initialized...]
2026-01-19T... INFO LMB Wishlist [Click Behavior initialized...]
2026-01-19T... INFO LMB Wishlist [Popup Timing initialized...]
2026-01-19T... INFO LMB Wishlist [Image Overlay Scripts initialized...]
[LMB Components] Loading components from: 014a999
```

### Verificatie:
- [ ] Logger is actief (timestamps en kleuren zichtbaar)
- [ ] Alle assets komen van commit `014a999`
- [ ] window.LMB_LOADER_VERSION = '014a999' (check in Console: `window.LMB_LOADER_VERSION`)
- [ ] window.LMB_LOG_CONFIG bestaat (check: `window.LMB_LOG_CONFIG`)

### Browser Check Network:
- [ ] Alle URL's bevatten `@014a999`
- [ ] logger.js is geladen
- [ ] blocksy-extra.css geladen van `014a999`
- [ ] Wishlist.js geladen van `014a999`

---

## Test 3: Testing Script met OVERRIDE_COMMIT

**Doel:** Verificeer dat OVERRIDE_COMMIT prioriteit heeft boven logger-config.js

### Stappen:
1. Zet in Testing Script: `OVERRIDE_COMMIT = 'dev'`
2. logger-config.js blijft `commit: '014a999'`
3. Laad website (hard refresh)

### Verwachte Console Output:
```
[LMB Test] ACTIVE - Loading from commit: dev
```

### Verificatie:
- [ ] Console toont `dev` (niet `014a999`)
- [ ] Alle Network requests gaan naar `@dev`
- [ ] window.LMB_LOADER_VERSION = 'dev'

---

## Test 4: Hostname Fallback (Foutscenario)

**Doel:** Verificeer dat fallback werkt als LMB_LOADER_VERSION niet gezet is

### Stappen:
1. Disable Global Loader
2. Disable Testing Script
3. Laad global.js **direct** (tijdelijk, alleen voor test):
   ```html
   <script src="https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@dev/assets/js/global.js"></script>
   ```
4. Laad website

### Verwachte Console Output:
```
⚠ [LMB Components] WARNING: window.LMB_LOADER_VERSION is not set!
...instructies...
⚠ [LMB Components] Fallback actief - hostname detection gebruikt: dev
[LMB Components] Loading components from: dev
```

### Verificatie:
- [ ] Warnings verschijnen
- [ ] Fallback gebruikt juiste branch (dev voor dev.* hostname, test voor test.*, main voor productie)
- [ ] Components laden toch (met waarschuwing)

---

## Test 5: Per-Asset Toggle (Testing Script)

**Doel:** Verificeer dat per-asset toggles werken

### Stappen:
1. Update `logger-config.js`:
   ```javascript
   assets: {
       'js/logger.js': false,  // Uit!
       'js/components/Wishlist.js': true,
       'css/components/blocksy-extra.css': false  // Uit!
   }
   ```
2. Laad website

### Verificatie:
- [ ] Logger.js niet geladen (geen INFO logging met timestamps)
- [ ] Wishlist.js wel geladen (functionaliteit werkt)
- [ ] blocksy-extra.css niet geladen (check Network tab)
- [ ] Wishlist gebruikt fallback logging (console.log zonder logger)

---

## Test 6: Log Levels (Testing Script)

**Doel:** Verificeer dat log level configuratie werkt

### Stappen:
1. Update `logger-config.js`:
   ```javascript
   logConfig: {
       default: 'ERROR',
       Wishlist: 'DEBUG'
   }
   ```
2. Laad website

### Verificatie:
- [ ] Logger zelf logt alleen ERROR+ (geen INFO startup message)
- [ ] Wishlist logt DEBUG berichten
- [ ] Andere components (als aanwezig) loggen alleen ERROR

---

## Test 7: Cross-Branch Consistency

**Doel:** Verificeer dat switching tussen branches consistent werkt

### Stappen:
1. Test met `OVERRIDE_COMMIT = 'main'` → Verificeer main assets
2. Switch naar `OVERRIDE_COMMIT = 'dev'` → Verificeer dev assets
3. Switch naar `OVERRIDE_COMMIT = '014a999'` → Verificeer commit assets

### Verificatie voor elke switch:
- [ ] Console toont correcte versie
- [ ] Network tab toont correcte @versie in URLs
- [ ] window.LMB_LOADER_VERSION komt overeen

---

## Acceptatie Criteria

### Must Pass:
- [x] Test 1: Global Loader werkt met main branch
- [x] Test 2: Testing Script laadt correct van commit met logger
- [x] Test 3: OVERRIDE_COMMIT overschrijft logger-config.js
- [x] Test 4: Fallback geeft duidelijke waarschuwing
- [x] Test 7: Switching tussen versies werkt

### Should Pass:
- [x] Test 5: Per-asset toggles werken
- [x] Test 6: Log levels configureren werkt

### Nice to Have:
- [ ] Geen console errors tijdens testen
- [ ] Wishlist functionaliteit 100% werkend in alle scenarios
- [ ] CSS styling consistent in alle scenarios

---

## Bug Reporting Template

Als een test faalt:

```markdown
**Test:** [Test nummer + naam]
**Verwacht:** [Wat hoorde te gebeuren]
**Resultaat:** [Wat er gebeurde]
**Console:** [Console output]
**Network:** [Relevante network requests]
**Screenshot:** [Indien relevant]
```

---

## Rollback Plan

Als kritieke bugs gevonden worden:

```bash
git reset --hard 85198c0  # Vorige stabiele commit
git push origin feature/migrate-blocksy-assets-20260116 --force
```

Vervolgens analyse en fix in nieuwe feature branch.
