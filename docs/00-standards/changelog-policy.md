# Changelog Policy

Dit document beschrijft de **standaard regels voor het bijhouden van een
CHANGELOG** binnen alle Qualis IT projecten.

Het doel van de changelog is om **functionele veranderingen transparant,
begrijpelijk en traceerbaar** te maken voor zowel technische als
niet-technische stakeholders.

------------------------------------------------------------------------

## 1. Doel van de changelog

De changelog: - communiceert *wat* er is veranderd - documenteert
*waarom* een wijziging is gedaan - ondersteunt releases en deployments -
is een historisch naslagwerk

De changelog is **geen commitlog** en **geen technisch logboek**.

------------------------------------------------------------------------

## 2. Structuur

De changelog volgt het formaat:

\``## [vX.Y.Z] - YYYY-MM-DD`\>

Elke versie bevat vaste secties (indien van toepassing):

-   Added
-   Changed
-   Fixed
-   Deprecated
-   Removed
-   Security

------------------------------------------------------------------------

## 3. Wanneer een changelog bijwerken?

De changelog wordt bijgewerkt wanneer: - een release wordt voorbereid -
functionaliteit zichtbaar verandert - gedrag of aannames wijzigen - bugs
worden opgelost

Niet elke commit vereist een changelog-entry.

------------------------------------------------------------------------

## 4. Relatie met releases

-   Elke **getagde release** heeft een bijbehorende changelog-entry
-   Snapshot/alpha releases *mogen* een entry hebben, maar zijn niet
    verplicht
-   Hotfix releases **moeten** worden opgenomen

------------------------------------------------------------------------

## 5. Wat hoort wel in de changelog?

-   Nieuwe functionaliteit
-   Functionele wijzigingen
-   Bugfixes met impact
-   Breaking changes
-   Security-relevante aanpassingen

------------------------------------------------------------------------

## 6. Wat hoort niet in de changelog?

-   Refactors zonder functionele impact
-   Interne tooling-wijzigingen
-   Code formatting
-   Experimentele wijzigingen die nooit zijn gereleased

------------------------------------------------------------------------

## 7. Schrijfstijl

-   Gebruik duidelijke, korte zinnen
-   Beschrijf het effect, niet de implementatie
-   Schrijf vanuit gebruikersperspectief

------------------------------------------------------------------------

## 8. Verantwoordelijkheid

-   De changelog wordt bijgewerkt als onderdeel van het releaseproces
-   De release-verantwoordelijke controleert volledigheid en juistheid

------------------------------------------------------------------------

## 9. Samenvatting

-   De changelog is verplicht bij releases
-   Eén entry per release
-   Gericht op impact en begrijpelijkheid
