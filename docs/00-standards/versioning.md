# Versioning & Build Identifiers

Dit document beschrijft de **standaard versioning-aanpak** voor alle Qualis IT projecten.  
Deze afspraken zijn bedoeld om releases, deployments en debugging **eenduidig, reproduceerbaar en traceerbaar** te maken.

---

## 1. Release versioning (SemVer)

Qualis IT projecten gebruiken **Semantic Versioning (SemVer)** voor releases:

vMAJOR.MINOR.PATCH

### Betekenis
- **MAJOR**
  - Breaking changes
  - Niet backwards compatible
- **MINOR**
  - Nieuwe functionaliteit
  - Backwards compatible
- **PATCH**
  - Bugfixes
  - Geen functionele uitbreidingen

### Voorbeelden
- `v1.0.0` – eerste stabiele release
- `v1.1.0` – nieuwe functionaliteit
- `v1.1.1` – bugfix release

---

## 2. Git tags & releases

- Elke release wordt vastgelegd met een **git tag**
- Tags volgen exact de SemVer-notatie: 
vX.Y.Z
- Een getagde release kan worden gekoppeld aan een **GitHub Release**

### Belangrijke regel
> Productie (live) gebruikt **uitsluitend getagde releases**  
> Branches of losse commits worden **nooit direct** in productie geladen.

---

## 3. Build identifiers (deployments)

Naast releases wordt gewerkt met **build identifiers** voor deployments per omgeving.

### Doel van build identifiers
- Inzicht geven **wat er waar draait**
- Debugging vereenvoudigen
- Onderscheid maken tussen deployments van dezelfde release

### Formaat

<environment>-YYYYMMDD.NNN

### Ondersteunde omgevingen
- `dev`     – ontwikkeling
- `test`    – optionele testomgeving
- `staging` – pre-productie
- `live`    – productie

### Voorbeelden
- `dev-20260124.001`
- `test-20260124.002`
- `staging-20260125.001`
- `live-20260126.001`

### Regels
- `NNN` start per dag bij `001`
- Build identifiers zijn **niet hetzelfde** als releases
- Meerdere builds kunnen horen bij dezelfde release

---

## 4. Relatie tussen releases en builds

| Concept | Doel | Voorbeeld |
|------|------|----------|
| Release | Functioneel contract | `v1.2.0` |
| Build | Deployment-identiteit | `staging-20260125.002` |

- Een release kan meerdere builds hebben
- Een build hoort altijd bij één omgeving
- Builds zijn **contextueel**, releases zijn **functioneel**

---

## 5. Promotion flow (standaard)

Een release kan worden gepromoveerd via meerdere omgevingen:

dev → test → staging → live


### Belangrijke nuance
- De `test` omgeving is **optioneel**
- Niet elk project hoeft alle omgevingen te gebruiken
- De volgorde blijft logisch en oplopend richting productie

---

## 6. Pre-releases / snapshots

Naast formele releases kan gewerkt worden met **snapshot of alpha releases**.

Kenmerken:
- Kunnen getagd zijn (bijv. `v1.2.0-alpha.1`)
- Hebben **geen productie-impact**
- Worden gebruikt om een toestand veilig te stellen

Snapshot releases volgen **niet** de volledige promotion flow.

---

## 7. Versioning in documentatie

- Elke release wordt vastgelegd in `CHANGELOG.md`
- Documentatie die gedrag of werkwijze verandert:
  - hoort bij een release
  - wordt meegenomen in versioning-beslissingen

---

## 8. Wat versioning NIET is

- Build identifiers zijn **geen versie**
- Branch-namen zijn **geen versie**
- Commit hashes zijn **geen versie**

Versioning is altijd:
- expliciet
- herhaalbaar
- vastgelegd in git tags en documentatie

---

## 9. Afwijkingen

Afwijkingen van deze versioning-standaard:
- worden expliciet gedocumenteerd
- worden project-specifiek vastgelegd in `docs/10-project/`
- veranderen **nooit** stilzwijgend de standaard

---

## 10. Samenvatting

- Releases gebruiken **SemVer**
- Deployments gebruiken **environment build identifiers**
- Productie draait alleen op **getagde releases**
- Promotion kan via `dev → test → staging → live`
- Versioning is een vast onderdeel van het ontwikkelproces


---

## 11. Repository versioning vs component versioning

Binnen Qualis IT projecten wordt onderscheid gemaakt tussen:

- **Repository (release) versioning**
- **Component / artifact versioning**

Deze twee zijn **bewust losgekoppeld**.

### Repository versioning
- Gebruikt SemVer (`vMAJOR.MINOR.PATCH`)
- Vertegenwoordigt een **samenstelling** van componenten
- Wordt gebruikt voor:
  - releases
  - documentatie
  - communicatie
  - referentiepunten

Een repository release betekent **niet** dat alle componenten dezelfde versie hebben.

---

### Component / artifact versioning
- Elke component heeft een **eigen levenscyclus**
- Componenten worden onafhankelijk geversioned
- Componentversies hoeven niet gelijk te lopen met de repository-versie

Voorbeelden:
- `Wishlist@v0.4.2`
- `Logger@v1.0.0`

De repository release beschrijft **welke componentversies samen een geheel vormen**, vastgelegd in een manifest.

---

### Belangrijk principe
> De repository release is een **snapshot van samenstelling**,  
> geen technische verplichting tot gelijke versies.

