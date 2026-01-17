# Releases maken (Alpha / v0.0.x)

Doel: een exacte “snapshot” vastleggen (tag + GitHub Release) zodat je later altijd kunt terughalen of als basis kunt gebruiken.

## 1) Zorg dat DEV schoon en gepusht is (Terminal / VS Code)
```bash
git checkout dev
git pull
git status
```

Als er wijzigingen zijn:
```bash
git add .
git commit -m "chore(release): v0.0.1 alpha - <korte beschrijving>"
git push
```

## 2) Maak een tag voor de release (Terminal)
Gebruik een **annotated tag**:

```bash
git tag -a v0.0.1 -m "Alpha v0.0.1: <korte beschrijving van wat er in zit>"
git push origin v0.0.1
```

## 3) (Optioneel) Maak een immutable release-branch (Terminal)
Alleen als je ook een `release/*` branch als archief gebruikt:

```bash
git checkout -b release/v0.0.1
git push -u origin release/v0.0.1
```

> Let op: als `release/*` “locked” is via rules, moet je deze branch aanmaken **voordat** je updates blokkeert, of je moet “Restrict creations” uit laten.

## 4) Maak de GitHub Release (GitHub Web)
1. Ga naar **Releases**
2. Klik **Draft a new release**
3. Selecteer tag: **v0.0.1**
4. Title: `Alpha v0.0.1`
5. Notes (bullets):
   - Wat is toegevoegd/veranderd
   - Eventuele install/load instructies
6. Klik **Publish release**

## 5) Later terughalen
Inspecteren:
```bash
git checkout v0.0.1
```

Nieuwe branch starten vanaf release:
```bash
git checkout -b feature/from-v0.0.1 v0.0.1
```
