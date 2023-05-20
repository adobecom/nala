#!/bin/bash

RUN_BRANCH="visualUpdate-$id"

# Navigate to workspace directory or bail
cd "$GITHUB_ACTION_PATH" || exit

# Create and checkout run branch
echo "Creating run branch..."
git checkout -b ${RUN_BRANCH}

# Copy over updated screenshots to nala-screenshots repository
echo "Copying updated screenshots to base screenshots repository directory..."
cp -fr nala/screenshots/visual-compare/ nala-screenshots/screenshots/visual-compare/

# Create commit for updated screenshots
echo "Committing updated screenshots to run branch..."
git commit -a -m "Nala Screenshot Update GHActions RUN_ID $id"

# Merge current default branch into run branch for syncing
echo "Syncing run branch with screenshots repository's default branch..."
git merge main

# Merge run branch into nala-screenshots repository default branch
echo "Merging updated screenshots..."
git checkout main
git merge ${RUN_BRANCH}

# Clean up repository
echo "Removing run branch..."
git branch -d ${RUN_BRANCH}
