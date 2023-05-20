#!/bin/bash

RUN_BRANCH="visualUpdate-$id"

# Create and checkout run branch
git checkout -b ${RUN_BRANCH}

# Copy over updated screenshots to nala-screenshots repository
cp -fr nala/screenshots/visual-compare/ nala-screenshots/screenshots/visual-compare/

# Create commit for updated screenshots
git commit -a -m "Nala Screenshot Update GHActions RUN_ID $id"

# Merge current default branch into run branch for syncing
git merge main

# Merge run branch into nala-screenshots repository default branch
git checkout main
git merge ${RUN_BRANCH}

# Clean up repository
git branch -d ${RUN_BRANCH}
