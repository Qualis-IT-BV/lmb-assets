#!/usr/bin/env bash
# Q-GitHooks:  pre-commit hook
# Build: hooks-20260125.002
# Doel: Header afdwingen/normaliseren + Build-datum check (alleen feature/* en hotfix/*)


set -euo pipefail

BRANCH="$(git rev-parse --abbrev-ref HEAD)"

# Alleen afdwingen op feature/* en hotfix/*
if ! [[ "$BRANCH" =~ ^feature/ || "$BRANCH" =~ ^hotfix/ ]]; then
  exit 0
fi

echo "[Q-GitHooks pre-commit] Header + buildcontrole (branch: $BRANCH)"

# Repo/projectnaam (kan je overriden met THIS_PROJECT_NAME)
TOPLEVEL="$(git rev-parse --show-toplevel)"
REPO_NAME="$(basename "$TOPLEVEL")"
PROJECT_NAME="${THIS_PROJECT_NAME:-$REPO_NAME}"

# Build-standaard (prefix) - default dev
BUILD_PREFIX="${THIS_BUILD_PREFIX:-dev}"

TODAY="$(date +%Y%m%d)"
DEFAULT_FIRST_RELEASE="${THIS_FIRST_RELEASE:-$(date +%Y-%m-%d)}"

# Welke bestanden wil je afdwingen?
# (pas aan naar jouw repo; hieronder behoud ik je eerdere lijst)
FILES=(
  "assets/js/global.js"
  "assets/js/components/Wishlist.js"
)

changed_any=0
changed_files=()

ensure_header_and_build() {
  local file="$1"
  local component="$2"
  local default_first_release="$3"

  local target_build="${BUILD_PREFIX}-${TODAY}.000"

  # 1) Bepaal huidige Build uit header (alleen in de eerste ~80 regels zoeken)
  local build_line=""
  build_line="$(head -n 80 "$file" | grep -m1 -E '^[[:space:]]*\*[[:space:]]*Build:[[:space:]]*' || true)"

  local current_build=""
  if [[ -n "$build_line" ]]; then
    current_build="$(printf '%s' "$build_line" | sed -E 's/^[[:space:]]*\*[[:space:]]*Build:[[:space:]]*//')"
  fi

  # 2) Valideer buildformat + check datum
  #    Verwacht: <prefix>-YYYYMMDD.NNN
  #    - Als invalid of verkeerde dag: zet naar prefix-TODAY.000
  local needs_build_update=0
  if [[ -z "$current_build" ]]; then
    needs_build_update=1
  else
    if [[ "$current_build" =~ ^${BUILD_PREFIX}-([0-9]{8})\.([0-9]{3})$ ]]; then
      local build_date="${BASH_REMATCH[1]}"
      if [[ "$build_date" != "$TODAY" ]]; then
        needs_build_update=1
      fi
    else
      needs_build_update=1
    fi
  fi

  # 3) Check of er een headerblock bestaat bovenaan
  #    We accepteren een header als het bestand begint met /* binnen de eerste non-empty chars
  local first_nonempty=""
  first_nonempty="$(grep -n -m1 -E '[^[:space:]]' "$file" | cut -d: -f1 || true)"
  if [[ -z "$first_nonempty" ]]; then
    # leeg bestand: maak minimaal header + laat rest leeg
    cat > "$file" <<EOF
/* Project: $PROJECT_NAME
 * Component: $component
 * Build: $target_build
 * First Release: $default_first_release
 * Last Change: -
 * Source: New
 * 
 * Purpose:
 * 
 */
EOF
    return 0
  fi

  local starts_with_block=0
  local first_line=""
  first_line="$(sed -n "${first_nonempty}p" "$file")"
  if [[ "$first_line" =~ ^[[:space:]]*/\* ]]; then
    starts_with_block=1
  fi

  local tmp
  tmp="$(mktemp)"

  if [[ "$starts_with_block" -eq 0 ]]; then
    # Geen headerblock: voeg toe bovenaan
    cat > "$tmp" <<EOF
/* Project: $PROJECT_NAME
 * Component: $component
 * Build: $target_build
 * First Release: $default_first_release
 * Last Change: -
 * Source: New
 * 
 * Purpose:
 * 
 */
EOF
    cat "$file" >> "$tmp"
    mv "$tmp" "$file"
    return 0
  fi

  # 4) Bestaand headerblock: normaliseer keys in eerste /* ... */ blok
  awk -v project="$PROJECT_NAME" \
      -v component="$component" \
      -v target_build="$target_build" \
      -v default_first_release="$default_first_release" \
      -v update_build="$needs_build_update" '
  BEGIN {
    in_header=0; header_done=0;
    hasProject=0; hasComponent=0; hasBuild=0; hasFirst=0; hasLast=0; hasSource=0; hasPurpose=0;
  }
  function emit_missing_before_purpose() {
    if (!hasProject)   print " * Project: " project;
    if (!hasComponent) print " * Component: " component;
    if (!hasBuild)     print " * Build: " target_build;
    if (!hasFirst)     print " * First Release: " default_first_release;
    if (!hasLast)      print " * Last Change: -";
    if (!hasSource)    print " * Source: New";
    print " * ";
  }
  function trim(s) { sub(/^[[:space:]]+/, "", s); sub(/[[:space:]]+$/, "", s); return s; }

  {
    if (!header_done) {
      if (!in_header) {
        if ($0 ~ /^[[:space:]]*\/\*/) { in_header=1; print $0; next; }
        print $0; next;
      }

      # In headerblock
      if ($0 ~ /\*\//) {
        if (!hasPurpose) {
          emit_missing_before_purpose();
          print " * Purpose:";
          print " * ";
        }
        print $0;
        header_done=1;
        next;
      }

      # Key normalisatie
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Project:[[:space:]]*/)   { print " * Project: " project; hasProject=1; next; }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Component:[[:space:]]*/) { print " * Component: " component; hasComponent=1; next; }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Build:[[:space:]]*/)     {
        hasBuild=1;
        if (update_build == 1) print " * Build: " target_build;
        else print $0;
        next;
      }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*First Release:[[:space:]]*/) { hasFirst=1; print $0; next; }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Last Change:[[:space:]]*/)   { hasLast=1; print $0; next; }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Source:[[:space:]]*/)        { hasSource=1; print $0; next; }

      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Purpose:[[:space:]]*/) {
        hasPurpose=1;
        if (!hasProject || !hasComponent || !hasBuild || !hasFirst || !hasLast || !hasSource) {
          emit_missing_before_purpose();
          hasProject=hasComponent=hasBuild=hasFirst=hasLast=hasSource=1;
        }
        # Preserve any text after Purpose:
        purpose = $0;
        sub(/^[[:space:]]*\*[[:space:]]*Purpose:[[:space:]]*/, "", purpose);
        purpose = trim(purpose);
        if (purpose != "") print " * Purpose: " purpose;
        else print " * Purpose:";
        next;
      }

      # Default: keep header line
      print $0;
      next;
    }

    # After first headerblock: print rest unchanged
    print $0;
  }' "$file" > "$tmp"

  mv "$tmp" "$file"
}

# Alleen checken als bestanden in deze commit (staged) zitten
staged_files="$(git diff --cached --name-only --diff-filter=ACMR || true)"

for f in "${FILES[@]}"; do
  if ! printf '%s\n' "$staged_files" | grep -Fxq "$f"; then
    continue
  fi

  if [[ ! -f "$f" ]]; then
    echo "[Q-GitHooks pre-commit] Waarschuwing: bestand niet gevonden: $f"
    continue
  fi

  component="$(basename "$f")"
  ensure_header_and_build "$f" "$component" "$DEFAULT_FIRST_RELEASE"

  # Als de hook iets aangepast heeft: opnieuw stagen
  if ! git diff --quiet -- "$f"; then
    git add "$f"
    changed_any=1
    changed_files+=("$f")
  fi
done

if [[ "$changed_any" -eq 1 ]]; then
  echo "[Q-GitHooks pre-commit] Headers/build bijgewerkt en opnieuw gestaged:"
  printf ' - %s\n' "${changed_files[@]}"
fi

exit 0
