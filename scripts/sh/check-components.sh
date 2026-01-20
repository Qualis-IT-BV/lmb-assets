#!/bin/bash

# Check Components Script
# Validates that all CSS/JS components are registered in global.js

set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CSS_DIR="$REPO_ROOT/assets/css/components"
JS_DIR="$REPO_ROOT/assets/js/components"
GLOBAL_JS="$REPO_ROOT/assets/js/global.js"

echo "🔍 Checking component registration..."
echo ""

# Find all CSS component files
CSS_FILES=()
if [ -d "$CSS_DIR" ]; then
    while IFS= read -r -d '' file; do
        # Get relative path from css/ directory
        rel_path="${file#$REPO_ROOT/assets/css/}"
        CSS_FILES+=("$rel_path")
    done < <(find "$CSS_DIR" -name "*.css" -type f -print0 | sort -z)
fi

# Find all JS component files
JS_FILES=()
if [ -d "$JS_DIR" ]; then
    while IFS= read -r -d '' file; do
        # Get relative path from js/ directory
        rel_path="${file#$REPO_ROOT/assets/js/}"
        JS_FILES+=("$rel_path")
    done < <(find "$JS_DIR" -name "*.js" -type f -print0 | sort -z)
fi

# Check CSS components in global.js
CSS_MISSING=()
echo "📄 CSS Components (loaded via global.js):"
for css_file in "${CSS_FILES[@]}"; do
    if grep -q "$css_file" "$GLOBAL_JS"; then
        echo "  ✓ $css_file"
    else
        echo "  ✗ $css_file (NOT REGISTERED)"
        CSS_MISSING+=("$css_file")
    fi
done
echo ""

# Check JS components
JS_MISSING=()
echo "📜 JS Components:"
for js_file in "${JS_FILES[@]}"; do
    if grep -q "$js_file" "$GLOBAL_JS"; then
        echo "  ✓ $js_file"
    else
        echo "  ✗ $js_file (NOT REGISTERED)"
        JS_MISSING+=("$js_file")
    fi
done
echo ""

# Summary
if [ ${#CSS_MISSING[@]} -eq 0 ] && [ ${#JS_MISSING[@]} -eq 0 ]; then
    echo "✅ All components are registered!"
    exit 0
else
    echo "❌ Missing registrations found!"
    echo ""
    
    if [ ${#CSS_MISSING[@]} -gt 0 ]; then
        echo "Missing in global.js cssComponents array:"
        for css_file in "${CSS_MISSING[@]}"; do
            echo "  '$css_file'"
        done
        echo ""
    fi
    
    if [ ${#JS_MISSING[@]} -gt 0 ]; then
        echo "Missing in global.js jsComponents array:"
        for js_file in "${JS_MISSING[@]}"; do
            echo "  '$js_file'"
        done
        echo ""
    fi
    
    # Ask for confirmation before continuing
    echo "⚠️  Do you want to continue with the commit anyway? (y/N)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Continuing..."
        exit 0
    else
        echo "Aborting."
        exit 1
    fi
fi
