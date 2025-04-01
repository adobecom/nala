#!/bin/bash

# Check if category is passed as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <category> [config] [project]"
  echo "Example: $0 sot|milo visual chrome,ipad,iphone"
  exit 1
fi

# Validate category input
category="$1"
valid_categories="sot homepage dc cc express"
if ! echo "$valid_categories" | grep -w -q "$category"; then
  echo "Error: Invalid category '$category'"
  echo "Valid categories are: $valid_categories"
  exit 1
fi

# Validate config input (if provided)
Config="${2:-visual}"
valid_configs="visual"
if ! echo "$valid_configs" | grep -w -q "$Config"; then
  echo "Error: Invalid config '$Config'"
  echo "Valid configs are: $valid_configs"
  exit 1
fi

# Validate project input (if provided)
Project="${3:-chrome,ipad,iphone}"
valid_projects="chrome webkit firefox ipad iphone"
invalid_project=false
IFS=',' read -ra projects <<< "$Project"
for proj in "${projects[@]}"; do
  if ! echo "$valid_projects" | grep -w -q "$proj"; then
    invalid_project=true
    echo "Error: Invalid project '$proj'"
  fi
done
if [ "$invalid_project" = true ]; then
  echo "Valid projects are: $valid_projects (comma-separated)"
  exit 1
fi

# Only install dependencies if running in GitHub Actions
if [ -n "$GITHUB_ACTIONS" ]; then
    echo "*** Installing playwright dependencies ***"
    cd "$GITHUB_ACTION_PATH" || exit
    npm ci
    npx playwright install --with-deps
else
    echo "Skipping dependency installation - not running in GitHub Actions"
fi

# Run each command one by one
node run.js -c ${Config} -p ${Project} -g @${category}-screenshots-base
node libs/screenshot/merge.js screenshots/${category}
node libs/screenshot/uploads3.js screenshots/${category} base

echo "All commands executed successfully for category: ${category}!"
