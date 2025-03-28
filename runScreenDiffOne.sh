#!/bin/bash

# Replace these variables with your actual values
Config="visual"
Project="chrome,ipad,iphone"

# Check if category is passed as an argument
if [ -z "$1" ]; then
  echo "Usage: $0 <category>"
  exit 1
fi

category="$1"

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
node run.js -c ${Config} -p ${Project} -g @${category}-screenshots-one
node libs/screenshot/merge.js screenshots/${category}
node libs/screenshot/compare.mjs screenshots/${category}
node libs/screenshot/uploads3.js screenshots/${category}

echo "All commands executed successfully for category: ${category}!"
