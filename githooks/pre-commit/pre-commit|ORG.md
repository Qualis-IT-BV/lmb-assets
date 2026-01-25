

Wat moet de pre-commit doen
1. Shebang + doel
#!/bin/bash
# pre-commit hook: Controleert of buildnummer in feature/dev branch up-to-date is
# Werkt alleen op feature/* of dev branch


Dit is een Git pre-commit hook → draait automatisch vóór elke commit

De intentie:

Alleen afdwingen op:

feature/*

dev

Controleren of JS-bestanden een actueel buildnummer hebben

2. Huidige branch bepalen
BRANCH=$(git rev-parse --abbrev-ref HEAD)


Vraagt Git: “Op welke branch zit ik nu?”

Resultaat is bv:

dev

feature/migrate-blocksy-assets

release/v0.1.0

3. Branch-filter (zeer belangrijk)
if [[ "$BRANCH" =~ ^feature/ || "$BRANCH" == "dev" ]]; then


Deze if bepaalt of de rest van de hook überhaupt actief wordt.

✔️ Hook doet iets als:

branch begint met feature/

of exact dev is

❌ Hook doet niets op:

main

release/*

hotfix/*

👉 Dit is bewust: releases mogen niet stuklopen op build-checks.

4. Startmelding
echo "[LMB pre-commit] Controleer buildnummers in JS componenten..."


Alleen informatief

Handig om te zien waarom een commit faalt

5. Lijst met te controleren bestanden
FILES=(
  "assets/js/global.js"
  "assets/js/tools/logger/logger.js"
  "assets/js/components/Wishlist.js"
)


Hard-coded whitelist

Alleen deze bestanden worden gecontroleerd

Andere JS-bestanden:

worden genegeerd

mogen dus “verkeerde” builds bevatten zonder fout

⚠️ Impliciete aanname:

Deze bestanden zijn kritisch en moeten altijd een correct buildnummer hebben.

6. Vandaag bepalen
TODAY=$(date +%Y%m%d)


Format: YYYYMMDD

Bijvoorbeeld: 20260124

Wordt straks vergeleken met de builddatum in de file

7. Loop over elk bestand
for FILE in "${FILES[@]}"; do


Voor elk bestand:

7.1 Bestaat het bestand?
if [[ -f "$FILE" ]]; then


Bestaat het niet?

Dan wordt het stilletjes overgeslagen

Geen fout, geen warning

👉 Bewust tolerant gedrag.

8. Buildregel zoeken
BUILD_LINE=$(grep -m1 'Build: dev-' "$FILE")


Zoekt eerste regel met:

Build: dev-


Verwacht dus iets als:

/* Build: dev-20260124.001 */


⚠️ Gevolg:

staging- of live- builds falen hier

Ook Build: 2026.01.24 faalt

9. Regex-validatie van het buildnummer
if [[ $BUILD_LINE =~ dev-([0-9]{8})\.([0-9]{3}) ]]; then


Dit is de kerncontrole.

Verwacht exact:

dev-YYYYMMDD.XXX


Bijvoorbeeld:

dev-20260124.003


Wordt opgesplitst in:

BUILD_DATE → 20260124

BUILD_NUM → 003

10. Datumvergelijking
if [[ "$BUILD_DATE" != "$TODAY" ]]; then


Builddatum ≠ vandaag?

Dan → commit blokkeren

echo "[LMB pre-commit] FOUT: Buildnummer in $FILE is niet van vandaag ($BUILD_DATE). Update vereist!"
exit 1


👉 Dit dwingt:

elke commit = nieuwe build

ook bij kleine wijzigingen

11. Geen geldig buildnummer gevonden
else
  echo "[LMB pre-commit] FOUT: Geen geldig buildnummer gevonden in $FILE. Update vereist!"
  exit 1
fi


Dit triggert als:

Geen Build: regel

Of verkeerde syntax

Of verkeerde prefix (staging-, live-)

Resultaat:

Commit faalt hard

12. Alles OK
echo "[LMB pre-commit] Buildnummers OK."


Alleen zichtbaar als alle bestanden slagen

13. Post-commit waarschuwing (informatief)
echo "[LMB pre-commit] Let op: verwijder na commit de overrides/ map als deze niet meer nodig is voor testen!"


Geen invloed op commit

Procesafspraak, geen technische controle

14. Exitcode
exit 0


Commit mag doorgaan

Samenvattend in één zin

👉 Deze pre-commit hook dwingt af dat op dev en feature/* elke commit alleen mag als alle kritische JS-bestanden een Build: dev-YYYYMMDD.XXX hebben met de datum van vandaag.

Kritische observaties (eerlijk & scherp)

❗ Je kunt niet meerdere commits op één dag zonder build bump

❗ staging of live builds worden hier expliciet geweigerd

❗ Buildnummer wordt niet automatisch verhoogd

✔️ Goed afgeschermd voor release/*

✔️ Hard-fail = discipline wordt afgedwongen