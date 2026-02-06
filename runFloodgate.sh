#!/bin/bash
# =============================================================================
# Summit 2026 Floodgate Migration - Test Runner Script
# =============================================================================
#
# Usage:
#   ./runFloodgate.sh [options]
#
# Options:
#   --phase=<a|b|c|d>     Run specific phase tests
#   --security            Run security tests only
#   --cache               Run cache tests only
#   --smoke               Run smoke tests only
#   --env=<stage|prod>    Set environment (default: stage)
#   --browser=<chrome|firefox|webkit|all>  Browser (default: chrome)
#   --headed              Run with browser visible
#   --debug               Run in debug mode
#
# Examples:
#   ./runFloodgate.sh --smoke --env=stage
#   ./runFloodgate.sh --phase=a --browser=chrome
#   ./runFloodgate.sh --security
#
# =============================================================================

set -e

# Default values
PHASE=""
SECURITY=false
CACHE=false
SMOKE=false
ENV="stage"
BROWSER="chrome"
HEADED=""
DEBUG=""

# Parse arguments
for arg in "$@"; do
  case $arg in
    --phase=*)
      PHASE="${arg#*=}"
      ;;
    --security)
      SECURITY=true
      ;;
    --cache)
      CACHE=true
      ;;
    --smoke)
      SMOKE=true
      ;;
    --env=*)
      ENV="${arg#*=}"
      ;;
    --browser=*)
      BROWSER="${arg#*=}"
      ;;
    --headed)
      HEADED="--headed"
      ;;
    --debug)
      DEBUG="--debug"
      ;;
    --help)
      head -30 "$0" | tail -25
      exit 0
      ;;
  esac
done

echo "=============================================================="
echo "Summit 2026 Floodgate Migration - Test Runner"
echo "=============================================================="
echo "Environment: $ENV"
echo "Browser: $BROWSER"
echo "=============================================================="

# Set environment
export FG_ENV=$ENV

# Build grep pattern
GREP=""
if [ -n "$PHASE" ]; then
  case $PHASE in
    a) GREP="@before-event" ;;
    b) GREP="@during-event" ;;
    c) GREP="@after-event" ;;
    d) GREP="@edge-case" ;;
  esac
  echo "Phase: $PHASE ($GREP)"
fi

if [ "$SECURITY" = true ]; then
  GREP="@security"
  echo "Running: Security tests"
fi

if [ "$CACHE" = true ]; then
  GREP="@cache"
  echo "Running: Cache tests"
fi

if [ "$SMOKE" = true ]; then
  GREP="@smoke"
  echo "Running: Smoke tests"
fi

# Build project name
PROJECT="floodgate-$ENV-$BROWSER"
if [ "$BROWSER" = "all" ]; then
  PROJECT=""
fi

echo "=============================================================="

# Build command
CMD="npx playwright test --config=configs/floodgate.config.js"

if [ -n "$PROJECT" ]; then
  CMD="$CMD --project=$PROJECT"
fi

if [ -n "$GREP" ]; then
  CMD="$CMD --grep='$GREP'"
fi

if [ -n "$HEADED" ]; then
  CMD="$CMD $HEADED"
fi

if [ -n "$DEBUG" ]; then
  CMD="$CMD $DEBUG"
fi

echo "Running: $CMD"
echo "=============================================================="

# Execute
eval $CMD

echo ""
echo "=============================================================="
echo "Test run complete!"
echo "Reports: test-html-results/floodgate/index.html"
echo "=============================================================="
