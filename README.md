# La Maison Bossché -- Frontend Assets (lmb-assets)

Deze repository bevat alle **frontend assets (CSS & JS)** voor de
website\
**La Maison Bossché**, beheerd door **Qualis IT B.V.**

De assets worden centraal beheerd via **GitHub** en geladen in WordPress
via **jsDelivr CDN**, per omgeving (dev / staging / live).

Deze repo is opgezet voor **gestructureerd onderhoud**, versiebeheer en
gefaseerde migratie van legacy styling (o.a. Blocksy Extra CSS).

------------------------------------------------------------------------

## 🎯 Doel van deze repository

-   Centrale plek voor **alle frontend assets**
-   Geen styling meer in:
    -   Blocksy "Extra CSS"
    -   inline `<style>` tags
-   Volledig beheer via:
    -   GitHub
    -   versie- en build-nummers
    -   gecontroleerde releases

------------------------------------------------------------------------

## 📁 Structuur

### Nieuwe standaard (actief)

    assets/
    ├─ css/
    │  ├─ global.css
    │  ├─ components/
    │  └─ pages/
    └─ js/
       └─ global.js

👉 **Alle nieuwe ontwikkeling gebeurt uitsluitend in `assets/`.**

------------------------------------------------------------------------

### Legacy structuur (uitfaseren)

    css/
    js/

-   Wordt nog ondersteund zolang WordPress hiernaar verwijst
-   Geen nieuwe features toevoegen
-   Alleen bugfixes indien strikt noodzakelijk
-   Wordt verwijderd zodra migratie is afgerond

------------------------------------------------------------------------

## 🌍 Omgevingen & branches

### Branchstrategie

  Type         Naam                           Doel
  ------------ ------------------------------ --------------
  Feature      feature/`<onderwerp>`{=html}   Gericht werk
  Integratie   dev                            Samenbrengen
  Acceptatie   staging                        Preproductie
  Productie    main + tags                    Live

------------------------------------------------------------------------

## 🚀 Laden van assets in WordPress

Voorbeeld CSS:

    https://cdn.jsdelivr.net/gh/qualis-it-bv/lmb-assets@<branch>/assets/css/global.css

Voor productie wordt gewerkt met **tags**.

------------------------------------------------------------------------

## 🧱 Versies & build-nummers

Voorbeeld build-header:

    /* Project: La Maison Bossché
     * Version: 0.1.0
     * Build: dev-20260115.001
     */

Zie `docs/versioning.md` voor details.

------------------------------------------------------------------------

## 🤖 Copilot

Copilot-instructies staan in:

    .github/copilot-instructions.md
    .github/instructions/

------------------------------------------------------------------------

Beheer en onderhoud: **Qualis IT B.V.**
