# Deployment Checklist

Deze checklist doorlopen bij het deployen naar verschillende omgevingen.

---

## 📋 Merge naar DEV branch

### Voor het testen op DEV omgeving

**Custom CSS & JS Plugin instellingen aanpassen:**

1. ✅ **Aanzetten:** `GitHub-global-CSS-JS-loader.js`
   - Locatie: Custom CSS & JS plugin → Footer code
   - Doel: Laadt `global.css` en `global.js` vanaf GitHub @dev branch
   - Bestand: `docs/custom-css-js-plugin/GitHub-global-CSS-JS-loader.js`

2. ❌ **Uitzetten:** `GitHub-CSS-JS Debugger.js`
   - Locatie: Custom CSS & JS plugin → Footer code  
   - Doel: Selectief testen van individuele assets (dev only)
   - Bestand: `docs/custom-css-js-plugin/GitHub-CSS-JS Debugger.js`
   - **Waarom uitzetten?** Anders worden de verkeerde versies geladen voor testing

### Verificatie na deployment

- [ ] Check Console logs: `[LMB DEBUG] Wishlist.js - Script loaded`
- [ ] Wishlist hartjes verschijnen op productafbeeldingen
- [ ] Klik op hartje: product wordt toegevoegd
- [ ] Popup verschijnt na toevoegen
- [ ] Geen navigatie naar productpagina bij klik op hartje
- [ ] jsDelivr CDN laadt correcte versie (check Network tab)

### jsDelivr Cache

Als oude versie wordt geladen:
- Wacht 5-10 minuten (normale cache refresh)
- Of purge handmatig:
  - Open: `https://purge.jsdelivr.net/gh/qualis-it-bv/lmb-assets@dev/assets/js/global.js`
  - Open: `https://purge.jsdelivr.net/gh/qualis-it-bv/lmb-assets@dev/assets/js/components/Wishlist.js`

---

## 📋 Merge naar STAGING branch

### Voor het testen op STAGING omgeving

1. ✅ **GitHub-global-CSS-JS-loader blijft aan**
2. ✅ Verander branch in loader naar `staging` (als staging aparte branch is)
3. ❌ **GitHub-CSS-JS Debugger blijft uit**

### Verificatie

- [ ] Volledige regressie test
- [ ] Check alle wishlist functionaliteit
- [ ] Test op verschillende browsers
- [ ] Test op mobile devices
- [ ] Check performance (Network tab)

---

## 📋 Deploy naar PRODUCTION (main)

### Voor deployment naar LIVE

1. ✅ **GitHub-global-CSS-JS-loader blijft aan**
2. ✅ Branch wijzigt automatisch naar `main` (via hostname detectie)
3. ❌ **GitHub-CSS-JS Debugger ALTIJD uit op productie**

### Pre-deployment checklist

- [ ] Alle tests geslaagd op staging
- [ ] Known issues gedocumenteerd
- [ ] Build numbers geüpdatet
- [ ] Git tag aangemaakt voor release
- [ ] Rollback plan klaar

### Post-deployment verificatie

- [ ] Live site check
- [ ] Console: geen errors
- [ ] Functionaliteit: alles werkt
- [ ] Performance: geen degradatie
- [ ] Monitor eerste 30 minuten

---

## 🔧 Lokale Development (met Chrome DevTools Overrides)

### Setup

1. ✅ **Aanzetten:** `GitHub-CSS-JS Debugger.js`
2. ✅ Configureer welke assets lokaal getest worden
3. ✅ Chrome DevTools → Sources → Overrides → Enable Local Overrides
4. ✅ Selecteer: `lmb-assets/overrides/`

### Testing workflow

1. Bewerk bestanden in Chrome DevTools (of VS Code)
2. Chrome slaat op in `overrides/` folder
3. Test direct in browser
4. Wanneer het werkt: kopieer naar correcte locatie in repo
5. Commit & push

**Belangrijk:** Overrides files worden NIET gecommit (staan in .gitignore)

---

## 📝 Notes

### Plugin script locaties

- `docs/custom-css-js-plugin/GitHub-global-CSS-JS-loader.js` - Productie loader
- `docs/custom-css-js-plugin/GitHub-CSS-JS Debugger.js` - Dev testing tool
- `docs/custom-css-js-plugin/GitHub-global.css` - Legacy (niet meer in gebruik)
- `docs/custom-css-js-plugin/GitHub-global.js` - Legacy (niet meer in gebruik)

### Chrome DevTools Overrides

- Locatie: `lmb-assets/overrides/`
- In .gitignore: wordt niet naar repo gepushed
- Workflow gedocumenteerd in: `docs/chrome-devtools-workflow.md`
