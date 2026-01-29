# Release Process

Dit document beschrijft het **standaard releaseproces** voor alle Qualis IT projecten.  
Het doel van dit proces is om releases **controleerbaar, herhaalbaar en transparant** te maken.

Het releaseproces is **tooling-onafhankelijk** en richt zich op afspraken, niet op automatisering.

---

## 1. Wat is een release?

Een release is een **formeel vastgelegde versie** van een project die:
- functioneel is afgerond
- gedocumenteerd is
- reproduceerbaar is via een git tag

Releases gebruiken **Semantic Versioning**:
vMAJOR.MINOR.PATCH


---

## 2. Release types

Er worden twee typen releases onderscheiden:

1. **Snapshot / Alpha releases**
2. **Promotion releases**

---

## 3. Snapshot / Alpha releases

### Doel
- Vastleggen van een stabiele tussenstand
- Delen van voortgang
- Referentiepunt voor debugging of evaluatie

### Kenmerken
- Hebben **geen productie-impact**
- Worden niet automatisch gepromoveerd
- Kunnen worden getagd of alleen als GitHub Release worden vastgelegd

### Notatie (optioneel)
vX.Y.Z-alpha.N


### Gebruik
- Interne tests
- Proof of concepts
- Tijdelijke stabilisatie

Snapshot releases doorlopen **niet** de volledige promotion flow.

---

## 4. Promotion releases

### Doel
Een promotion release is bedoeld om een release gecontroleerd uit te rollen richting productie.

### Standaard flow
dev → test → staging → live


- `test` is optioneel
- Niet elk project gebruikt alle omgevingen
- De volgorde blijft altijd logisch richting productie

---

## 5. Voorbereiding van een promotion release

### Stap 1 — Release branch aanmaken
- Maak een branch vanaf `main`:
release/vX.Y.Z


### Stap 2 — Stabilisatie
In de release branch:
- Alleen bugfixes
- Documentatie afronden
- Geen nieuwe features

### Stap 3 — Validatie
- Deploy de release branch naar `test` en/of `staging`
- Gebruik build identifiers per omgeving
- Verwerk bevindingen via fixes in dezelfde release branch

---

## 6. Afronden van een promotion release

### Stap 4 — Tagging
- Tag de release:
vX.Y.Z

- Maak (optioneel) een GitHub Release met release notes

### Stap 5 — Merge
- Merge `release/vX.Y.Z` terug naar `main`
- Verwijder de release branch

### Stap 6 — Productie
- Deploy de getagde release naar `live`
- Gebruik een `live-YYYYMMDD.NNN` build identifier

---

## 7. Hotfix releases

### Wanneer
- Alleen bij **kritieke productie-issues**
- Functionele of cosmetische wijzigingen horen hier niet thuis

### Flow
1. Maak een hotfix branch:
hotfix/vX.Y.Z+1

2. Voer de fix uit
3. Tag als nieuwe PATCH release
4. Merge naar `main`
5. Deploy direct naar `live`

Hotfixes doorlopen zo min mogelijk stappen.

---

## 8. Documentatie & changelog

### Verplicht
- Elke release heeft een bijgewerkt `CHANGELOG.md`
- Wijzigingen worden per versie beschreven

### Documentatie
- Wijzigingen die gedrag beïnvloeden:
  - moeten worden vastgelegd in documentatie
  - maken onderdeel uit van de release

---

## 9. Wat dit proces bewust niet afdwingt

- Geen verplichte CI/CD pipelines
- Geen verplichte tooling (GitHub Actions, GitLab CI, etc.)
- Geen automatische deploys zonder expliciete beslissing

Automatisering mag, maar volgt deze afspraken — niet andersom.

---

## 10. Samenvatting

- Releases zijn expliciet en getagd
- Snapshot releases zijn informatief
- Promotion releases volgen een vaste flow
- Productie gebruikt uitsluitend getagde releases
- Documentatie is onderdeel van het releaseproces


---

## 11. Component updates binnen releases

Binnen een repository release kunnen één of meerdere componenten worden gewijzigd.

### Werkwijze
- Componenten worden afzonderlijk geversioned
- Een component-update leidt **niet automatisch** tot een repository release
- Wanneer componenten worden samengebracht:
  - wordt het component manifest bijgewerkt
  - wordt dit onderdeel van de release review

---

### Manifest als controlepunt
Voor elke repository release:
- is het component manifest verplicht
- wordt gecontroleerd of:
  - versies correct zijn
  - builds overeenkomen met de omgeving
  - wijzigingen bewust zijn

## Release checklist (verplicht)
Voor elke release wordt de release checklist gebruikt (GitHub issue template: `Release checklist`).

---

### Changelog
Component-wijzigingen worden in het repository changelog opgenomen als:
- “Updated component `<naam>` to `<versie>`”
