#!/usr/bin/env bash
# Load Hermes secrets from 1Password into the current shell.
# Usage: source scripts/load-secrets.sh
#
# Requires: op (1Password CLI), authenticated session
# Sign in first: eval $(op signin)

set -euo pipefail

echo "Loading Hermes secrets from 1Password..."

# GHL Location IDs (static — not secret, but kept here for completeness)
export GHL_NFM_LOCATION_ID="tRk2nBMoIkO6EhFzr7jp"
export GHL_DHL_LOCATION_ID="Jatw8uCMjEcPeIHP2M2z"

# GHL Private Integration Tokens
export GHL_NFM_API_KEY
GHL_NFM_API_KEY=$(op item get 'GHL NFM PIT' --fields label=password --reveal)

export GHL_DHL_API_KEY
GHL_DHL_API_KEY=$(op item get 'GHL DHL PIT' --fields label=password --reveal)

echo "  GHL_NFM_API_KEY: loaded"
echo "  GHL_DHL_API_KEY: loaded"
echo "  GHL_NFM_LOCATION_ID: $GHL_NFM_LOCATION_ID"
echo "  GHL_DHL_LOCATION_ID: $GHL_DHL_LOCATION_ID"

# OpenRouter — Primary LLM provider for Hermes
export OPENROUTER_API_KEY
OPENROUTER_API_KEY=$(op item get 'OpenRouter API Key' --fields label=password --reveal)
echo "  OPENROUTER_API_KEY: loaded"

# Optional: GHL Agency key (uncomment if stored in 1Password)
# export GHL_AGENCY_API_KEY
# GHL_AGENCY_API_KEY=$(op item get 'GHL Agency API Key' --fields label=password --reveal)

echo ""
echo "Secrets loaded."
echo "  Next: bash scripts/setup-ghl-mcp.sh"
echo "  Then: bash scripts/setup-hermes.sh"
