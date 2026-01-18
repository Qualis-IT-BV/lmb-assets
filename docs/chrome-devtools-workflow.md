# Chrome DevTools Local Overrides Workflow

## Wat is dit?
Chrome DevTools Local Overrides maakt het mogelijk om live bestanden te overschrijven met lokale versies, zonder deployment.

## Locatie
Overrides worden opgeslagen in:
```
assets/css/cdn.jsdelivr.net/longurls/
```

Deze map staat in `.gitignore` maar wordt tijdens debugging wel gebruikt.

## Workflow

### 1. Debug Fase (NU)
- Bewerk bestanden in Chrome DevTools Inspector
- Chrome slaat wijzigingen op in `assets/css/cdn.jsdelivr.net/longurls/`
- Deze overschrijven live CDN-bestanden in de browser
- Test direct in de browser zonder deployment

### 2. Wanneer het werkt
- Kopieer werkende code naar de juiste locatie:
  - `Wishlist-C-d9becab.js` → `assets/js/components/Wishlist.js` (Click Behavior deel)
  - `Wishlist-P-201d241.js` → `assets/js/components/Wishlist.js` (Popup Timing deel)
  - `Wishlist%2-284317c3.js` → `assets/js/components/Wishlist.js` (Image Overlay deel)
- Of maak nieuwe component bestanden indien gewenst
- Commit naar repo
- Deploy via GitHub → jsDelivr CDN

### 3. Chrome DevTools instellen
1. Open DevTools (F12)
2. Ga naar **Sources** tab
3. Klik op **Overrides** (in zijmenu)
4. Klik **+ Select folder for overrides**
5. Kies: `lmb-assets/assets/css/cdn.jsdelivr.net/longurls/`
6. Bevestig toegang
7. Vink **Enable Local Overrides** aan

### 4. Bestand bewerken
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
