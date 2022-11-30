#!/bin/bash

TAGS=""
REPORTER=""

# Convert github labels to tags that can be grepped
for label in ${labels}
do
  [[ "$label" = \@* ]] && label="${label:1}" && TAGS+="|$label"
done

# Remove the first pipe from tags if tags are not empty
[[ ! -z "$TAGS" ]] && TAGS="${TAGS:1}" && TAGS="-g $TAGS"

# Retrieve github reporter parameter if not empty
# Otherwise use reporter settings in playwright.config.js
REPORTER=$reporter
[[ ! -z "$REPORTER" ]] && REPORTER="--reporter $REPORTER"

echo "*** Running Nala on $branch ***"
echo $TAGS
echo "npx playwright test ${TAGS}"

cd $GITHUB_ACTION_PATH
npm ci
npx playwright install --with-deps
npx playwright test ${TAGS} ${REPORTER}
