#!/bin/bash

# Navigate to workspace directory or bail
cd "$GITHUB_ACTION_PATH" || exit

echo "DEBUG STATEMENTS, PLEASE REMOVE..."
pwd
ls -ali

# Copy base screenshots to nala repository in preparation for visual comparison testing
echo "Copying base screenshots..."
cp -fr nala-screenshots/screenshots/visual-compare/ nala/screenshots/visual-compare/
