#!/bin/bash

TAGS=""
REPORTER=""
APPS=""

# Convert github labels to tags that can be grepped
for label in ${labels}
do
  if [["$label"="@run-on-"*||"$label"="@run-on"*]]; then  
    # Extract the application name from the label by slicing prefix 'run-on'    
    APP_NAME=${label#*run-on-}
    # Add app name to a list 
    APPS+=$APP_NAME

  elif [["$label" = \@* ]]; then
    label="${lable:1}"
    TAGS+="|$label"  
  fi  
done

# Remove the first pipe from tags if tags are not empty
[[ ! -z "$TAGS" ]] && TAGS="${TAGS:1}" && TAGS="-g $TAGS"

# Retrieve github reporter parameter if not empty
# Otherwise use reporter settings in playwright.config.js
REPORTER=$reporter
[[ ! -z "$REPORTER" ]] && REPORTER="--reporter $REPORTER"

echo "*** Running Nala on $branch ***"
echo $TAGS
echo "npx playwright test ${TAGS} ${REPORTER}"

cd $GITHUB_ACTION_PATH
npm ci
npx playwright install --with-deps
# Loop through each apps  
if [[-n "$APPS"]];then
  for app_name in $APPS;
    do
      # Run on all three browsers
      echo "npx playwright test "--config=configs/${app_name}.config.js "${TAGS} "--project=${app_name}-chrome "${REPORTER}"
      npx playwright test "--config=configs/${app_name}.config.js "${TAGS} "--project=${app_name}-chrome "${REPORTER}
      npx playwright test "--config=configs/${app_name}.config.js "${TAGS} "--project=${app_name}-firefox "${REPORTER} 
      npx playwright test "--config=configs/${app_name}.config.js "${TAGS} "--project=${app_name}-webkit "${REPORTER}
    done
else
  npx npx playwright test ${TAGS} ${REPORTER}

