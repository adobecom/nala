#!/bin/bash

echo "*** Running Janus on $branch ***"

cd $GITHUB_ACTION_PATH
npm ci
npx playwright install --with-deps
npx playwright test
