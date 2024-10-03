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

# Run each command one by one
node run.js -c ${Config} -p ${Project} -g @${category}-screenshots
node libs/screenshot/merge.js screenshots/${category}
node libs/screenshot/compare.mjs screenshots/${category}
node libs/screenshot/uploads3.js screenshots/${category}

echo "All commands executed successfully for category: ${category}!"
