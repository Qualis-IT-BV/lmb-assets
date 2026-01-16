# Feature Branch Template

## Doel van deze branch
Beschrijf hier het doel van de feature branch. Bijvoorbeeld:
- Migratie van CSS/JS naar GitHub
- Nieuwe functionaliteit toevoegen
- Bugfixes of refactor

## Werkwijze
- Ontwikkeling gebeurt in deze feature branch.
- Na afronding merge naar `dev`, daarna naar `staging` en uiteindelijk naar `main` (prod).
- Elke stap (merge) wordt apart getest en gevalideerd.

## Versie- en Buildbeheer
- **Build-nummer**: Elke commit in deze branch verhoogt het build-nummer (`Build: <branch>-<YYYYMMDD>.<increment>`).
- **Versie-nummer**: Alleen verhogen bij merge naar `dev`, `staging` of `main`.
- In deze feature branch wordt géén Version gebruikt, alleen Build.

## Basisversie
- Deze branch is gebaseerd op commit: `<commit-hash>` van `<branch>`

## Samenvatting
Beschrijf hier kort de scope en het verwachte resultaat van deze branch.
