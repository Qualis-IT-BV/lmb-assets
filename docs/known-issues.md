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
