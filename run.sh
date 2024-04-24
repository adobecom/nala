#!/bin/bash

TAGS=""
REPORTER=""
APPS=""
EXCLUDE_TAGS="--grep-invert nopr"
EXIT_STATUS=0
PR_NUMBER=$(echo "$GITHUB_REF" | awk -F'/' '{print $3}')
echo "PR Number: $PR_NUMBER"

# Extract feature branch name from GITHUB_HEAD_REF
FEATURE_BRANCH="$GITHUB_HEAD_REF"
# Replace "/" characters in the feature branch name with "-"
FEATURE_BRANCH=$(echo "$FEATURE_BRANCH" | sed 's/\//-/g')
echo "Feature Branch Name: $FEATURE_BRANCH"

PR_BRANCH_LIVE_URL_GH="https://$FEATURE_BRANCH--$prRepo--$prOrg.hlx.live"
# set pr branch url as env
export PR_BRANCH_LIVE_URL_GH
export PR_NUMBER

echo "PR Branch live URL: $PR_BRANCH_LIVE_URL_GH"
echo "*******************************"

# Convert github labels to tags that can be grepped
for label in ${labels}
do
  # Extracts the tags
  # If the label starts with '@', remove the '@' and add it to the list of tags
  if [[ "$label" = \@* && "$label" != "@run-on"* ]]; then
    label="${label:1}" 
    TAGS+="|$label"  
  else
    # Extract the application name from the label using sed
    APP_NAME=$(echo "$label" | sed -E 's/^run(-nala(-on)?|(-on)?)*-(.*)$/\4/')
    # If the app name is not empty, add it to the list of apps
    if [[ -n "$APP_NAME" ]]; then
      APPS+=" $APP_NAME"
    fi
  fi 
done

# Remove the first pipe from tags if tags are not empty
[[ ! -z "$TAGS" ]] && TAGS="${TAGS:1}" && TAGS="-g $TAGS"

# Retrieve github reporter parameter if not empty
# Otherwise use reporter settings in playwright.config.js
REPORTER=$reporter
[[ ! -z "$REPORTER" ]] && REPORTER="--reporter $REPORTER"

echo "*** Running Nala on $FEATURE_BRANCH ***"
echo "Tags : $TAGS"
echo "APPS : $APPS"
echo "npx playwright test ${TAGS} ${EXCLUDE_TAGS} ${REPORTER}"

cd "$GITHUB_ACTION_PATH" || exit
npm ci
npx playwright install --with-deps

# Loop through each apps  
if [[ -n  "$APPS" ]];then
  for app_name in $APPS;
    do
      # Extract the config file name from app_name
      conf_name=$(echo $app_name | cut -d '-' -f1)
      config_file="./configs/${conf_name}.config.js"

      # Extract the project name if available
      project_name=""
      if [[ $app_name == *-* ]]; then
        project_name=$(echo $app_name | cut -d '-' -f2)
      fi

      if [[ "$conf_name" == "nala" && -z "$project_name" ]]; then
        # Run default run-nala execution
        echo "*** Default nala-run config ***"
        echo "npx playwright test ${TAGS} ${EXCLUDE_TAGS} ${REPORTER}" 
        npx playwright test ${TAGS} ${EXCLUDE_TAGS} ${REPORTER} || EXIT_STATUS=$?

      elif [ ! -f "$config_file" ]; then        
        echo "Config file : $config_file is not found"
        continue
      else
        if [[ -n "$project_name" ]];then
          # Run on all three browsers, configured as projects in corresponding .config.js file
          echo "*** npx playwright test --config=./configs/${conf_name}.config.js ${TAGS} ${EXCLUDE_TAGS} --project=${app_name} ***"
          npx playwright test --config=./configs/${conf_name}.config.js ${TAGS} ${EXCLUDE_TAGS} --project=${app_name}-chrome ${REPORTER} || EXIT_STATUS=$?
          npx playwright test --config=./configs/${conf_name}.config.js ${TAGS} ${EXCLUDE_TAGS} --project=${app_name}-firefox ${REPORTER} || EXIT_STATUS=$? 
          # npx playwright test --config=./configs/${conf_name}.config.js ${TAGS} ${EXCLUDE_TAGS} --project=${app_name}-webkit ${REPORTER}
        else
          # Run all the projects from config file for all projects
          echo "*** npx playwright test --config="$config_file" ${TAGS} ${EXCLUDE_TAGS} ${REPORTER} ***"
          npx playwright test --config="$config_file" ${TAGS} ${EXCLUDE_TAGS} ${REPORTER} || EXIT_STATUS=$?
        fi
      fi
    done
else
  npx playwright test ${TAGS} ${EXCLUDE_TAGS} ${REPORTER} || EXIT_STATUS=$?
fi

# Check to determine if the script should exit with an error.
if [ $EXIT_STATUS -ne 0 ]; then
    echo "Some tests failed. Exiting with error."
    exit $EXIT_STATUS
else
    echo "All tests passed successfully."
fi
