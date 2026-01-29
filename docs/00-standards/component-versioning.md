# Component & Artifact Versioning

Dit document beschrijft de **standaard aanpak voor versioning van losse componenten**
binnen Qualis IT projecten.

Het doel is om componenten:
- onafhankelijk te kunnen ontwikkelen
- afzonderlijk te kunnen releasen
- gecontroleerd te kunnen combineren in repository releases

---

## 1. Wat is een component?

Een component is een zelfstandig inzetbaar artefact, zoals:
- JavaScript module
- CSS bundle
- utility script
- loader of tool

Componenten kunnen:
- afzonderlijk worden geladen
- afzonderlijk worden geüpdatet
- onafhankelijk van elkaar evolueren

---

## 2. Component versioning (SemVer)

Elke component gebruikt **Semantic Versioning**:

vMAJOR.MINOR.PATCH


### Betekenis
- **MAJOR** – breaking changes binnen de component
- **MINOR** – nieuwe functionaliteit (backwards compatible)
- **PATCH** – bugfixes

Componentversies staan **los van repository versies**.

---

## 3. Component builds

Naast componentversies kunnen componenten build identifiers hebben.

### Wanneer builds gebruiken?
- Wanneer componenten per omgeving worden gedeployed
- Wanneer debugging vereist is op omgevingsniveau

### Formaat (aanbevolen)
<environment>-YYYYMMDD.NNN


Voorbeelden:
- `dev-20260128.003`
- `staging-20260129.001`

Build identifiers zijn **contextueel** en **tijdelijk**.

---

## 4. Relatie met repository releases

- Een repository release bevat **meerdere componenten**
- Elke component heeft een eigen versie
- De combinatie wordt vastgelegd in een **component manifest**

De repository release:
- verandert wanneer componentversies wijzigen
- documenteert deze wijziging expliciet

---

## 5. Component manifest (verplicht)

Elke repository release heeft een bijbehorend **component manifest**.

Het manifest:
- beschrijft welke componentversies onderdeel zijn van de release
- fungeert als referentie en controlemiddel
- voorkomt impliciete aannames

De standaardlocatie is:
docs/10-project/component-manifest.md


---

## 6. Productie-regels

- Productie gebruikt alleen:
  - getagde repository releases
  - expliciet vastgelegde componentversies
- Losse component-updates zonder manifest-aanpassing zijn **niet toegestaan**

---

## 7. Samenvatting

- Componenten hebben hun eigen versie en build
- Repository releases zijn samenstellingen
- Het manifest is de verbindende laag
- Transparantie is belangrijker dan uniformiteit