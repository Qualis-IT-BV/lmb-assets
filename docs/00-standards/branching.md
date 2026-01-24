# Branching Strategy

Dit document beschrijft de **standaard branching-strategie** voor alle Qualis IT projecten.  
Het doel is een **voorspelbare, overdraagbare en controleerbare** manier van werken met Git-branches.

Deze strategie is bewust **eenvoudig**, zodat zij werkt voor zowel kleine als grotere projecten.

---

## 1. Overzicht

De standaard branching-structuur bestaat uit:

- `main` – productie-waardige code
- `feature/*` – ontwikkeling van nieuwe functionaliteit
- `release/*` – voorbereiding en stabilisatie van releases
- `hotfix/*` – urgente fixes voor productie

Er worden **geen langdurige parallelle hoofdbranches** gebruikt.

---

## 2. De `main` branch

### Doel
- Bevat altijd **stabiele, productie-waardige code**
- Vormt de basis voor releases

### Regels
- Directe pushes zijn **niet toegestaan**
- Wijzigingen gaan uitsluitend via Pull Requests
- Elke merge naar `main`:
  - is gereviewd
  - voldoet aan de documentatie- en versioning-afspraken
  - kan in principe worden gereleased

---

## 3. Feature branches

### Naamgeving

feature/<onderwerp>-YYYYMMDD

### Voorbeelden
- `feature/wishlist-refactor-20260124`
- `feature/logger-split-20260120`

### Doel
- Ontwikkeling van nieuwe functionaliteit
- Verbeteringen en refactors
- Documentatie-aanpassingen die bij een wijziging horen

### Regels
- Feature branches zijn **kortlevend**
- Regelmatig synchroniseren met `main`
- Feature branches worden **altijd gemerged via een Pull Request**
- Na merge worden feature branches verwijderd

---

## 4. Release branches

### Naamgeving

release/vX.Y.Z

### Voorbeeld
- `release/v1.2.0`

### Doel
- Stabiliseren van een release
- Laatste bugfixes
- Documentatie afronden
- Voorbereiding van promotion naar hogere omgevingen

### Regels
- Release branches worden gemaakt vanaf `main`
- Alleen bugfixes en documentatie-updates zijn toegestaan
- Geen nieuwe features
- Na afronding:
  - wordt de release getagd (`vX.Y.Z`)
  - wordt de branch gemerged naar `main`
  - wordt de branch verwijderd

---

## 5. Hotfix branches

### Naamgeving

hotfix/vX.Y.Z+1


### Voorbeeld
- `hotfix/v1.2.1`

### Doel
- Oplossen van **kritieke productie-issues**
- Snelle correcties met minimale impact

### Regels
- Hotfix branches worden gemaakt vanaf `main`
- Bevatten uitsluitend de noodzakelijke fix
- Worden na afronding:
  - getagd als nieuwe PATCH release
  - gemerged naar `main`
  - direct gepromoveerd naar `live`

---

## 6. Relatie met omgevingen

Branches zijn **geen omgevingen**.

De relatie is als volgt:

| Branch type | Typische omgeving |
|-----------|------------------|
| feature/* | dev |
| release/* | test / staging |
| main | staging / live |

### Belangrijk
- Deployments gebruiken **build identifiers**, geen branch-namen
- Een branch kan meerdere keren worden gedeployed
- Omgevingen bepalen **waar** iets draait, niet **wat** het is

---

## 7. Promotion flow en branches

De standaard promotion flow is:

dev → test → staging → live


Toepassing:
- Feature branches worden doorgaans getest op `dev`
- Release branches kunnen worden gevalideerd op `test` en `staging`
- Alleen getagde releases worden uitgerold naar `live`

De `test` omgeving is **optioneel**, maar wordt ondersteund in de flow.

---

## 8. Documentatie en branching

- Wijzigingen in functionaliteit **vereisen** bijbehorende documentatie
- Documentatie-updates worden:
  - meegenomen in dezelfde feature of release branch
  - gereviewd als onderdeel van de Pull Request

Wijzigingen in `docs/00-standards/`:
- zijn zeldzaam
- vereisen expliciete review
- worden bij voorkeur eerst doorgevoerd in `qualis-template`

---

## 9. Wat deze strategie bewust niet doet

- Geen verplicht gebruik van specifieke CI/CD tooling
- Geen aparte `develop` branch
- Geen lange-lived experimentele branches
- Geen automatische releases zonder menselijke controle

---

## 10. Samenvatting

- `main` is altijd stabiel en productie-waardig
- Feature branches zijn kortlevend en doelgericht
- Release branches stabiliseren een specifieke versie
- Hotfix branches zijn uitzonderingen, niet de norm
- Branching ondersteunt versioning en releases, maar vervangt ze niet


