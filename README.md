# Qualis Project Template

Dit repository is de **standaard projecttemplate** voor Qualis IT projecten.  
Het doel van deze template is het **uniformeren van werkwijze, documentatie, versioning en releases**, zodat projecten voorspelbaar, overdraagbaar en beheersbaar blijven.

Deze template is bedoeld om gebruikt te worden via **“Use this template”** in GitHub.

---

## Wat standaardiseert deze template?

Deze template definieert vaste afspraken voor:

- 📦 **Versioning**
  - SemVer releases (`vX.Y.Z`)
  - Environment build identifiers (`dev-`, `test-`, `staging-`, `main-`)
- 🌿 **Branching**
  - Feature branches
  - Release branches
  - Hotfix flow
- 🚀 **Releases**
  - Snapshot / Alpha releases
  - Promotion releases (dev → test → staging → live)
- 📚 **Documentatie**
  - Duidelijke scheiding tussen standaarden en project-specifieke informatie
- 🧾 **Samenwerking**
  - Pull Request templates
  - Issue templates
  - Review-verplichtingen voor standaarden

---

## Repository-structuur

```text
docs/
├─ 00-standards/   ← Geldt voor ALLE Qualis-projecten
├─ 10-project/     ← Project-specifieke documentatie
└─ 90-appendix/    ← Begrippen, beslissingen, achtergrond
