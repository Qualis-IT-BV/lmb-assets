# Chrome DevTools Local Overrides Workflow

## Wat is dit?
Chrome DevTools Local Overrides maakt het mogelijk om live bestanden te overschrijven met lokale versies, zonder deployment.

## ⚙️ Standaard Override-locatie

**Afspraak:** Gebruik altijd `lmb-assets/overrides/` in dit project.

Deze map:
- Staat in `.gitignore` (wordt NIET gecommit)
- Wordt gebruikt voor debugging en development
- Moet je eenmalig instellen in Chrome DevTools

## 🔧 Override-locatie instellen (eenmalig)

**Stap-voor-stap:**

1. **Open DevTools** (F12 of Cmd+Opt+I)
2. **Ga naar Sources** tab
3. **Links: klik op Overrides** (in zijmenu)
4. **Klik op ⋮** (drie puntjes naast "+ Select folder")
   - *Of klik direct op:* **"+ Select folder for overrides"**
5. **Kies de map:** `lmb-assets/overrides/`
6. **Geef Chrome toegang** (macOS prompt verschijnt)
7. **Vink aan:** ✅ **Enable Local Overrides**

👉 **Vanaf dat moment gebruikt Chrome deze map automatisch.**

### Override-locatie wijzigen

Als je de locatie wilt wijzigen:
1. Ga naar **Sources → Overrides**
2. Klik op **⋮** (drie puntjes)
3. Selecteer **"Select folder for overrides"**
4. Kies nieuwe map en geef toegang

## Workflow

### 1. Debug Fase (NU)
- Bewerk bestanden in Chrome DevTools Inspector
- Chrome slaat wijzigingen op in `lmb-assets/overrides/`
- Deze overschrijven live CDN-bestanden in de browser
- Test direct in de browser zonder deployment

### 2. Wanneer het werkt
- Kopieer werkende code naar de juiste locatie in repo
- Commit naar repo
- Deploy via GitHub → jsDelivr CDN

## 🎯 Specifieke Workflow: GitHub-CSS-JS Debugger

### Debugging het Debugger Script

**Bestand tijdens debugging:**
```
overrides/dev.lamaisonbossche.nl/wp-content/uploads/custom-css-js/5066.js?v=9372
```

Dit bestand wordt geladen door de WordPress Custom CSS & JS plugin en overschrijft het live script.

**Workflow:**

1. **Debug fase:**
   - Bewerk `overrides/dev.lamaisonbossche.nl/.../5066.js?v=9372`
   - Test wijzigingen live in browser
   - Gebruik console.log voor debugging

2. **Wanneer klaar:**
   - Kopieer volledige inhoud naar: `scripts/js/external/custom-css-js-plugin/debugger.js`
   - Update build nummer in header
   - Commit naar repo

3. **Deploy naar WordPress:**
   - Kopieer inhoud uit `scripts/js/external/custom-css-js-plugin/debugger.js`
   - Plak in WordPress Custom CSS & JS plugin (Footer code)

**Belangrijk:**
- Override bestand wordt NIET gecommit (staat in .gitignore)
- Alleen het docs/ bestand wordt naar repo gepusht
- Het docs/ bestand is de "source of truth"

### 3. Bestand overschrijven (Override maken)
1. Ga naar **Network** tab
2. Herlaad pagina
3. Zoek het bestand (bijv. `Wishlist.js`)
4. Rechtermuisknop → **Override content**
5. Bewerk in Sources tab
6. Sla op (Cmd+S / Ctrl+S)
7. Chrome gebruikt nu jouw lokale versie

## Voordelen
- ✅ Instant feedback (geen build/deploy wachten)
- ✅ Test op echte omgeving
- ✅ Geen risk voor live site
- ✅ Makkelijk debuggen met console.log

## Let op
- Deze bestanden worden **NIET** gecommit (staan in .gitignore)
- Vergeet niet werkende code te kopiëren naar de juiste locatie
- Overrides blijven actief totdat je ze uitschakelt in DevTools
