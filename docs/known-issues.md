# Known Issues

Dit document houdt bekende problemen en wensen bij die nog opgelost moeten worden.

---

## Wishlist Functionaliteit

### 🟡 Redirect naar wishlist pagina bij toevoegen product
**Status:** Low priority / Nice to have  
**Datum:** 2026-01-18  
**Omschrijving:**  
Wanneer een gebruiker een product aan de wishlist toevoegt door op het hartje te klikken, wordt de pagina genavigeerd naar `/wishlist/`. Bij het verwijderen blijft de gebruiker wel op de huidige pagina.

**Verwacht gedrag:**  
Gebruiker blijft op de shop/category pagina na toevoegen.

**Oorzaak:**  
TI Wishlist plugin doet een redirect na succesvolle AJAX toevoeg-actie. Dit kan zijn:
1. Plugin setting: "After adding to wishlist" → ingesteld op "Redirect to wishlist page"
2. AJAX response bevat `redirect` property die door TI wordt uitgevoerd

**Mogelijke oplossingen:**
1. **WordPress admin**: TI Wishlist → Settings → "After adding to wishlist" → Verander naar "Show popup only"
2. **JavaScript**: Verdere interceptie van TI's redirect mechanisme (complex, mogelijk niet nodig)

**Workaround:**  
Geen - redirect gebeurt maar is niet storend. Popup verschijnt wel nog kort.

**Priority:** Low - functionaliteit werkt, UX kan beter

---

## Debugging & Development

### ✅ Chrome DevTools Overrides workflow gedocumenteerd
**Status:** Opgelost  
**Datum:** 2026-01-18  
Workflow gedocumenteerd in `docs/chrome-devtools-workflow.md`

---

## Template voor nieuwe issues

### 🔴/🟡/🟢 [Titel van issue]
**Status:** [Open / In Progress / Blocked / Nice to have]  
**Datum:** YYYY-MM-DD  
**Omschrijving:**  
[Korte beschrijving van het probleem]

**Verwacht gedrag:**  
[Wat zou moeten gebeuren]

**Oorzaak:**  
[Als bekend]

**Mogelijke oplossingen:**  
1. Optie 1
2. Optie 2

**Priority:** [High / Medium / Low]

---

**Legenda:**
- 🔴 = Critical / Blocking
- 🟡 = Medium / Nice to have
- 🟢 = Opgelost / Fixed
- ⚪ = Backlog / Toekomstig

---

## Logging & Naming Conventions (2026-01-20)

### Case-insensitive file/component naming & loglevel keys

 - **Alle component/file namen** die gebruikt worden in logging, configuratie of als key in logConfig moeten **case-insensitive** zijn. Dit geldt voor:
	 - Bestandsnamen (bijv. Wishlist.js, logger.js)
	 - Componentnamen in logConfig (bijv. 'Wishlist', 'wishlist', 'WISHLIST' zijn equivalent)
	 - Loglevel keys (bijv. 'INFO', 'info', 'InFo' zijn equivalent)
 - **Logger.js** behandelt alle componentnamen en logConfig keys **case-insensitive**. Dit voorkomt bugs door inconsistent hoofdlettergebruik.
 - **Nieuwe scripts/components** moeten deze conventie volgen en mogen geen afhankelijkheid hebben van hoofdlettergebruik in logging of configuratie.

### Logger.js gedrag

 - Logger.js wordt altijd als eerste geladen vóór andere componenten.
 - Logger logt altijd de huidige loader/commit-versie bij initialisatie.
 - Loglevel filtering werkt altijd **case-insensitive**.
 - Zie ook: test-plan.md (Test 6: Log Levels)

**Let op:**
 - Bij toevoegen van nieuwe componenten of logConfig entries: altijd controleren op consistentie in naamgeving (case-insensitive).

---

---

## Logging & Naming Conventions (2026-01-19)

### Case-Insensitive Handling
- **Alle component/file namen en loglevel keys worden case-insensitive behandeld door logger.js.**
- Gebruik consistente, duidelijke namen voor componenten en logConfig keys, maar hoofdletters/kleine letters maken technisch geen verschil.
- Voorbeeld: `Wishlist`, `wishlist`, `WISHLIST` zijn equivalent als logConfig key of componentnaam.

### Loglevel Filtering
- Loglevels worden per component/file bepaald via `logger-config.js` (`logConfig` object).
- Mogelijke waarden: `DEBUG`, `INFO`, `WARN`, `ERROR` (case-insensitive).
- De logger filtert op basis van het ingestelde niveau; lagere niveaus worden genegeerd.
- Zie testplan voor voorbeelden en verwachte output.

### Loader Version Logging
- **Alle scripts/tools/configs moeten bij startup het commit/branch (LMB_LOADER_VERSION) loggen.**
- Dit geldt voor: global.js, logger.js, logger-config.js, component scripts (zoals Wishlist.js), en debug/test scripts.
- Format: `[INFO] Component initialized (Build: <build>)` of `[INFO] Component initialized (Version: X.Y.Z, Build: <build>)`

### Bestandsnamen & Configuratie
- Gebruik consistente, beschrijvende bestandsnamen voor componenten en configs.
- Vermijd alleen verschil in hoofdlettergebruik als onderscheidend kenmerk.
- Documenteer nieuwe component/config keys altijd in de relevante docs.

### Zie ook:
- `.github/instructions/versioning.instructions.md` voor build/versiebeleid
- `docs/test-plan.md` voor loglevel testcases
- `assets/js/tools/logger/logger.js` voor implementatie details
