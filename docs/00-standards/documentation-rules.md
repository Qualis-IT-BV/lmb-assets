# Documentation Rules

Dit document beschrijft de **standaard regels voor documentatie** binnen alle Qualis IT projecten.  
Documentatie wordt beschouwd als een **onderdeel van het product**, niet als bijzaak.

Het doel van deze regels is om documentatie:
- actueel te houden
- consistent te maken tussen projecten
- overdraagbaar te houden voor toekomstige beheerders

---

## 1. Documentatie is verplicht

Elke wijziging die invloed heeft op:
- functionaliteit
- gedrag
- configuratie
- deployment
- releaseproces

vereist **bijbehorende documentatie**.

> Als iets belangrijk genoeg is om te bouwen, is het belangrijk genoeg om te documenteren.

---

## 2. Structuur: standaard vs project-specifiek

Documentatie is bewust opgesplitst in twee niveaus:

### `docs/00-standards/`
- Bevat Qualis IT standaarden
- Geldt voor **alle** projecten
- Is tooling- en projectonafhankelijk

**Regels:**
- Geen project-specifieke informatie
- Wijzigingen alleen via Pull Request
- Review is verplicht
- Wijzigingen worden bij voorkeur eerst doorgevoerd in `qualis-template`

---

### `docs/10-project/`
- Bevat project-specifieke informatie
- Wordt per project ingevuld en onderhouden

**Regels:**
- Mag afwijken van standaarden, mits expliciet vastgelegd
- Afwijkingen worden duidelijk benoemd
- Geen herdefinitie van standaarden

---

## 3. Wanneer documentatie aanpassen?

Documentatie wordt aangepast wanneer:

- gedrag verandert
- aannames veranderen
- stappen veranderen
- risico’s veranderen
- een uitzondering wordt geïntroduceerd

**Niet aanpassen** is alleen toegestaan wanneer:
- de wijziging volledig intern is
- geen impact heeft buiten de code

---

## 4. Documentatie en Pull Requests

Elke Pull Request:
- beschrijft **wat** er verandert
- beschrijft **waarom**
- benoemt documentatie-impact

De Pull Request template bevat hiervoor expliciete checks.

Wijzigingen zonder documentatie:
- worden expliciet benoemd
- zijn uitzonderingen, niet de norm

---

## 5. Wijzigingen aan standaarden

Wijzigingen in `docs/00-standards/` zijn:
- zeldzaam
- bewust
- impactvol

**Proces:**
1. Maak een aparte branch
2. Beschrijf de aanleiding van de wijziging
3. Pas de documentatie aan
4. Laat de wijziging reviewen
5. Werk bestaande projecten bij indien nodig

Standaarden worden **nooit stilzwijgend aangepast**.

---

## 6. Versiebeheer van documentatie

- Documentatie volgt het project
- Wijzigingen aan standaarden:
  - worden meegenomen in releases
  - worden vastgelegd in `CHANGELOG.md`
- Project-specifieke documentatie:
  - volgt het tempo van het project

---

## 7. Voorkomen van duplicatie

- Instructies worden **één keer** beschreven
- Checklists verwijzen naar documentatie
- Documentatie verwijst naar onderliggende standaarden

> Eén bron van waarheid per onderwerp.

---

## 8. Leesbaarheid en stijl

Documentatie moet:
- duidelijk
- beknopt
- technisch correct
- toekomstbestendig

**Richtlijnen:**
- Gebruik heldere koppen
- Vermijd aannames
- Vermijd jargon zonder uitleg
- Gebruik voorbeelden waar nodig

---

## 9. Afwijkingen en uitzonderingen

Afwijkingen van standaarden:
- worden expliciet vastgelegd in `docs/10-project/`
- bevatten een reden
- bevatten (indien mogelijk) een evaluatiemoment

---

## 10. Samenvatting

- Documentatie is onderdeel van het product
- Standaarden zijn leidend
- Project-specifieke afwijkingen zijn toegestaan, maar expliciet
- Wijzigingen gebeuren bewust en gecontroleerd
- Goede documentatie voorkomt technische schuld
