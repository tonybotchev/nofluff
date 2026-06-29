#!/usr/bin/env bash
# Sets up the GHL MCP server for Hermes Agent.
# Run this once before first use, or to update.

set -euo pipefail

echo "=== Hermes GHL MCP Setup ==="

# --- Verify env vars ---
missing=()
[[ -z "${GHL_NFM_API_KEY:-}" ]]      && missing+=("GHL_NFM_API_KEY")
[[ -z "${GHL_DHL_API_KEY:-}" ]]      && missing+=("GHL_DHL_API_KEY")
[[ -z "${GHL_NFM_LOCATION_ID:-}" ]]  && missing+=("GHL_NFM_LOCATION_ID")
[[ -z "${GHL_DHL_LOCATION_ID:-}" ]]  && missing+=("GHL_DHL_LOCATION_ID")
if [[ ${#missing[@]} -gt 0 ]]; then
  echo "ERROR: Missing required environment variables:"
  for v in "${missing[@]}"; do echo "  - $v"; done
  echo ""
  echo "Run: source scripts/load-secrets.sh && bash scripts/setup-ghl-mcp.sh"
  exit 1
fi

# --- Install/update ghl-mcp-server via npm ---
echo "[1/3] Installing ghl-mcp-server..."
npm install -g ghl-mcp-server
GHL_BIN="$(npm root -g)/../bin/ghl-mcp-server"
echo "  Installed: $(ghl-mcp-server --version 2>/dev/null || echo 'ok')"
echo "  Binary: $(which ghl-mcp-server)"

# --- Verify connectivity ---
echo "[2/3] Verifying GHL connectivity..."

NFM_RESULT=$(curl -s -o /dev/null -w "%{http_code}" \
  "https://services.leadconnectorhq.com/contacts/?locationId=${GHL_NFM_LOCATION_ID}&limit=1" \
  -H "Authorization: Bearer ${GHL_NFM_API_KEY}" \
  -H "Version: 2021-07-28")
[[ "$NFM_RESULT" == "200" ]] && echo "  NFM ($GHL_NFM_LOCATION_ID): OK" || echo "  NFM: HTTP $NFM_RESULT — check GHL_NFM_API_KEY"

DHL_RESULT=$(curl -s -o /dev/null -w "%{http_code}" \
  "https://services.leadconnectorhq.com/contacts/?locationId=${GHL_DHL_LOCATION_ID}&limit=1" \
  -H "Authorization: Bearer ${GHL_DHL_API_KEY}" \
  -H "Version: 2021-07-28")
[[ "$DHL_RESULT" == "200" ]] && echo "  DHL ($GHL_DHL_LOCATION_ID): OK" || echo "  DHL: HTTP $DHL_RESULT — check GHL_DHL_API_KEY"

# --- Write .env for Claude Code ---
echo "[3/3] Writing .env..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cat > "${SCRIPT_DIR}/.env" << EOF
GHL_NFM_LOCATION_ID=${GHL_NFM_LOCATION_ID}
GHL_DHL_LOCATION_ID=${GHL_DHL_LOCATION_ID}
GHL_NFM_API_KEY=${GHL_NFM_API_KEY}
GHL_DHL_API_KEY=${GHL_DHL_API_KEY}
OPENROUTER_API_KEY=${OPENROUTER_API_KEY:-}
EOF
echo "  .env written to ${SCRIPT_DIR}/.env"

echo ""
echo "=== Setup complete ==="
echo ""
echo "MCP servers configured:"
echo "  ghl-nfm → Location ${GHL_NFM_LOCATION_ID}"
echo "  ghl-dhl → Location ${GHL_DHL_LOCATION_ID}"
echo ""
echo "Open this project in Claude Code — both MCP servers start automatically."
echo "Hermes is ready."
