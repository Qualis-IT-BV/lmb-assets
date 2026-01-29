#!/usr/bin/env bash


set -euo pipefail

echo "== Script start =="
#read -r -p "Press Enter to continue..." _
VAR1="Hallo"
VAR2="Wereld"

echo "VAR1 is: $VAR1"
echo "VAR2 is: $VAR2"

VAR3="$VAR1 $VAR2"
echo "VAR3 is: $VAR3"

echo "== Script einde =="
