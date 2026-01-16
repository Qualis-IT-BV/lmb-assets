# Branch: feature/migrate-blocksy-assets-20260116

## Doel van deze branch
Deze branch is aangemaakt vanuit `dev` om een migratie uit te voeren van:
- Alle CSS uit Blocksy Extra CSS
- Alle JavaScript uit de Custom CSS & JS plugin
naar versiebeheer in GitHub, volgens de nieuwe repo-structuur en conventies.

## Werkwijze
- Migratie gebeurt in deze feature branch.
- Na afronding wordt gemerged naar `dev`, daarna naar `staging` en uiteindelijk naar `main` (prod).
- Elke stap (merge) wordt apart getest en gevalideerd.

## Versie- en Buildbeheer
- **Build-nummer** wordt bij elke commit in deze branch opgehoogd (formaat: `feature-YYYYMMDD.XXX`).
- **Versie-nummer** (Version) wordt pas opgehoogd als de wijzigingen worden doorgevoerd op `dev`, `staging` of `main`.
- In de feature branch beschrijving wordt altijd vermeld op welke basisversie (commit) deze branch is gebouwd.

## Samenvatting
Deze branch is bedoeld voor de technische migratie van alle custom CSS en JS naar GitHub, zodat beheer, versiebeheer en deployment centraal en gestructureerd verlopen.
