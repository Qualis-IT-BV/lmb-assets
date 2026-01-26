# Project: q-githooks
# Component: pre-commit.sh
# Build: dev-20260126.001
# First Release: q-githooks unreleased
# Last Change: -
# Source: New
# 
# Purpose:
# 
#

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


CONFIG_FILE="githooks/pre-commit/pre-commit-header.config"

SEARCH_FOLDERS=()
INCLUDE_PATTERNS=()
EXCLUDE_PATTERNS=()
section=""

trim() {
  local s="$1"
  s="${s#"${s%%[![:space:]]*}"}"
  s="${s%"${s##*[![:space:]]}"}"
  printf '%s' "$s"
}

if [[ -f "$CONFIG_FILE" ]]; then
  while IFS= read -r raw || [[ -n "$raw" ]]; do
    raw="${raw%$'\r'}"
    local_line="$(trim "$raw")"
    [[ -z "$local_line" ]] && continue

    # Section headers live in comment lines -> detect them BEFORE stripping comments
    if [[ "$local_line" =~ ^#[[:space:]]*Searchfolders:?[[:space:]]*$ ]]; then
      section="folders"; continue
    elif [[ "$local_line" =~ ^#[[:space:]]*Include:?[[:space:]]*$ ]]; then
      section="include"; continue
    elif [[ "$local_line" =~ ^#[[:space:]]*File[[:space:]]+Exclusions:?[[:space:]]*$ ]]; then
      section="exclude"; continue
    fi

    # Remove inline comments only for non-header lines
    local_line="${local_line%%#*}"
    local_line="$(trim "$local_line")"
    [[ -z "$local_line" ]] && continue

    case "$section" in
      folders) SEARCH_FOLDERS+=("$local_line") ;;
      include) INCLUDE_PATTERNS+=("$local_line") ;;
      exclude) EXCLUDE_PATTERNS+=("$local_line") ;;
      *) : ;;
    esac
  done < "$CONFIG_FILE"
else
  echo "[Q-GitHooks pre-commit] Geen pre-commit-header.config gevonden, geen bestanden geselecteerd."
  exit 0
fi


# Vind alle bestanden volgens de config met één find-commando
FILES=()
if [[ ${#SEARCH_FOLDERS[@]} -gt 0 && ${#INCLUDE_PATTERNS[@]} -gt 0 ]]; then
  # Bouw het find-commando als string (met quotes en escaped haakjes)
  find_cmd="find"
  for folder in "${SEARCH_FOLDERS[@]}"; do
    find_cmd+=" $folder"
  done
  find_cmd+=" -type f"
  # Include patterns
  if [[ ${#INCLUDE_PATTERNS[@]} -gt 0 ]]; then
    find_cmd+=" \("
    for i in "${!INCLUDE_PATTERNS[@]}"; do
      pat="${INCLUDE_PATTERNS[$i]}"
      find_cmd+=" -name '$pat'"
      if [[ $i -lt $(( ${#INCLUDE_PATTERNS[@]} - 1 )) ]]; then
        find_cmd+=" -o"
      fi
    done
    find_cmd+=" \)"
  fi
  # Exclude patterns
  if [[ ${#EXCLUDE_PATTERNS[@]} -gt 0 ]]; then
    find_cmd+=" ! \("
    for i in "${!EXCLUDE_PATTERNS[@]}"; do
      pat="${EXCLUDE_PATTERNS[$i]}"
      find_cmd+=" -name '$pat'"
      if [[ $i -lt $(( ${#EXCLUDE_PATTERNS[@]} - 1 )) ]]; then
        find_cmd+=" -o"
      fi
    done
    find_cmd+=" \)"
  fi
 while IFS= read -r file; do
    FILES+=("$file")
  done < <(eval $find_cmd 2>/dev/null)
fi

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "[Q-GitHooks pre-commit] Geen bestanden gevonden volgens pre-commit-header.config."
  exit 0
fi

changed_any=0
changed_files=()

ensure_header_and_build() {
  local file="$1"
  local component="$2"
  
  # 1) Bepaal huidige Build uit header (alleen in de eerste ~80 regels zoeken)
  local build_line=""
  build_line="$(head -n 80 "$file" | grep -m1 -E '^[[:space:]]*\*[[:space:]]*Build:[[:space:]]*' || true)"

  local current_build=""
  if [[ -n "$build_line" ]]; then
    current_build="$(printf '%s' "$build_line" | sed -E 's/^[[:space:]]*\*[[:space:]]*Build:[[:space:]]*//')"
  fi

  local target_build=""
  local needs_build_update=0
  # 2) Valideer buildformat + check datum
  #    Verwacht: <prefix>-YYYYMMDD.NNN
  #    - Als invalid of verkeerde dag: zet naar prefix-TODAY.001
  if [[ -z "$current_build" ]]; then
    needs_build_update=1
    target_build="${BUILD_PREFIX}-${TODAY}.001"
  else
    if [[ "$current_build" =~ ^${BUILD_PREFIX}-([0-9]{8})\.([0-9]{3})$ ]]; then
      local build_date
      if [[ -n "${BASH_REMATCH[1]:-}" ]]; then
        build_date="${BASH_REMATCH[1]}"
      else
        build_date=""
      fi
      if [[ "$build_date" != "$TODAY" ]]; then
        needs_build_update=1
        target_build="${BUILD_PREFIX}-${TODAY}.001"
      else
        # Datum klopt, zoek hoogste buildnummer voor vandaag en verhoog met 1
        local max_build=0
        local build_regex="^${BUILD_PREFIX}-${TODAY}\\.([0-9]{3})$"
        local build_lines
        build_lines=$(head -n 80 "$file" | grep -E '^[[:space:]]*\*[[:space:]]*Build:[[:space:]]*' || true)
        while IFS= read -r line; do
          local build_value=""
          build_value=$(printf '%s' "$line" | sed -E 's/^[[:space:]]*\*[[:space:]]*Build:[[:space:]]*//')
          if [[ "$build_value" =~ $build_regex ]]; then
            local build_num
            if [[ -n "${BASH_REMATCH[1]:-}" ]]; then
              build_num="${BASH_REMATCH[1]}"
            else
              build_num=""
            fi
            if [[ "$build_num" =~ ^[0-9]{3}$ && $((10#$build_num)) -gt $max_build ]]; then
              max_build=$((10#$build_num))
            fi
          fi
        done <<< "$build_lines"

        # Ook staged versie controleren (voor hooks in commit-pipeline)
        local staged_build_line=""
        staged_build_line="$(git show :$file 2>/dev/null | head -n 80 | grep -m1 -E '^[[:space:]]*\*[[:space:]]*Build:[[:space:]]*' || true)"
        if [[ -n "$staged_build_line" ]]; then
          if [[ "$staged_build_line" =~ $build_regex ]]; then
            local staged_build_num
            if [[ -n "${BASH_REMATCH[1]:-}" ]]; then
              staged_build_num="${BASH_REMATCH[1]}"
            else
              staged_build_num=""
            fi
            if [[ "$staged_build_num" =~ ^[0-9]{3}$ && $((10#$staged_build_num)) -gt $max_build ]]; then
              max_build=$((10#$staged_build_num))
            fi
          fi
        fi

        local next_build_num
        next_build_num=$(printf "%03d" $((max_build + 1)))
        target_build="${BUILD_PREFIX}-${TODAY}.${next_build_num}"
        needs_build_update=1
      fi
    else
      needs_build_update=1
      target_build="${BUILD_PREFIX}-${TODAY}.001"
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
 * First Release: $PROJECT_NAME unreleased
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
 * First Release: $PROJECT_NAME unreleased
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

  # 4) Bestaand headerblock: herschrijf altijd in vaste volgorde en zet header altijd bovenaan
      awk -v project="$PROJECT_NAME" \
        -v component="$component" \
        -v target_build="$target_build" \
        -v update_build="$needs_build_update" '
  BEGIN {
    in_header=0; header_done=0;
    vProject=""; vComponent=""; vBuild=""; vFirst=""; vLast=""; vSource=""; vPurpose="";
    foundProject=0; foundComponent=0; foundBuild=0; foundFirst=0; foundLast=0; foundSource=0; foundPurpose=0;
    body_lines_count=0;
  }
  function trim(s) { sub(/^[[:space:]]+/, "", s); sub(/[[:space:]]+$/, "", s); return s; }
  {
    if (!header_done) {
      if (!in_header) {
        if ($0 ~ /^[[:space:]]*\/*/) { in_header=1; next; }
        body_lines[body_lines_count++] = $0; next;
      }
      # In headerblock
      if ($0 ~ /\*\//) { header_done=1; next; }
      # Verzamel waarden
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Project:[[:space:]]*/)   { vProject=$0; foundProject=1; next; }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Component:[[:space:]]*/) { vComponent=$0; foundComponent=1; next; }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Build:[[:space:]]*/)     { vBuild=$0; foundBuild=1; next; }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*First Release:[[:space:]]*/) { vFirst=$0; foundFirst=1; next; }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Last Change:[[:space:]]*/)   { vLast=$0; foundLast=1; next; }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Source:[[:space:]]*/)        { vSource=$0; foundSource=1; next; }
      if ($0 ~ /^[[:space:]]*\*[[:space:]]*Purpose:[[:space:]]*/)       { vPurpose=$0; foundPurpose=1; next; }
      next;
    }
    # Na headerblock: verzamel body
    body_lines[body_lines_count++] = $0;
  }
  END {
    # Schrijf header in vaste volgorde
    print "/*";
    if (foundProject)   print vProject;   else print " * Project: " project;
    if (foundComponent) print vComponent; else print " * Component: " component;
    if (foundBuild) {
      if (update_build == 1) print " * Build: " target_build;
      else print vBuild;
    } else print " * Build: " target_build;
    if (foundFirst)     print vFirst;     else print " * First Release: " project " unreleased";
    if (foundLast)      print vLast;      else print " * Last Change: -";
    if (foundSource)    print vSource;    else print " * Source: New";
    print " * ";
    if (foundPurpose)   print vPurpose;   else print " * Purpose:";
    print " * ";
    print "*/";
    # Print body direct na header
    for (i=0; i<body_lines_count; i++) print body_lines[i];
  }
  ' "$file" > "$tmp"

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
  ensure_header_and_build "$f" "$component"

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
