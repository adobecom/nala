#!/bin/bash

# get the input argument i.e. config.js file name
PROJECT_NAME=$1
TAG=$2 

# Construct the full path to the config.js file
CONFIG_FILE_PATH="./configs/${PROJECT_NAME}.config.js"

# Check if the config.js file exists
if [ -f "${CONFIG_FILE_PATH}" ]; then
    echo "*** Installing playwright dependencies ***"
    cd "$GITHUB_ACTION_PATH" || exit
    npm ci
    npx playwright install --with-deps    
    echo "*** Running Playwright tests with config: ${CONFIG_FILE_PATH} ***"
    if [ -n "$TAG" ]; then
        echo "Running with TAG: ${TAG}"
        npx playwright test --config="${CONFIG_FILE_PATH}" --grep="${TAG}"
        exit 0
    else
      npx playwright test --config="${CONFIG_FILE_PATH}"
      exit 0
    fi   
else
    echo "Config file: ${CONFIG_FILE_PATH} not found, running default tests"
    exit 1
fi


