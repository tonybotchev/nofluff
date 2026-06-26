#!/usr/bin/env bash
# Sets up the GHL MCP server for Hermes Agent.
# Run this once before first use, or to update.

set -euo pipefail

GHL_MCP_DIR="${HOME}/.hermes/mcp-servers/ghl"
GHL_MCP_REPO="https://github.com/BusyBee3333/Go-High-Level-MCP-2026-Complete.git"

echo "=== Hermes GHL MCP Setup ==="

# --- Verify env vars ---
missing=()
[[ -z "${GHL_NFM_API_KEY:-}" ]] && missing+=("GHL_NFM_API_KEY")
[[ -z "${GHL_DHL_API_KEY:-}" ]] && missing+=("GHL_DHL_API_KEY")
if [[ ${#missing[@]} -gt 0 ]]; then
  echo "ERROR: Missing required environment variables:"
  for v in "${missing[@]}"; do echo "  - $v"; done
  echo ""
  echo "Copy .env.example to .env, fill in your API keys, then:"
  echo "  source .env && bash scripts/setup-ghl-mcp.sh"
  exit 1
fi

# --- Install/update GHL MCP server ---
if [[ -d "$GHL_MCP_DIR" ]]; then
  echo "[1/3] Updating GHL MCP server..."
  git -C "$GHL_MCP_DIR" pull --ff-only
else
  echo "[1/3] Cloning GHL MCP server..."
  mkdir -p "${HOME}/.hermes/mcp-servers"
  git clone "$GHL_MCP_REPO" "$GHL_MCP_DIR"
fi

# --- Build ---
echo "[2/3] Installing dependencies and building..."
cd "$GHL_MCP_DIR"
npm install --silent
npm run build

# --- Auth check ---
echo "[3/3] Verifying GHL connectivity..."

# Check NFM
GHL_API_KEY="$GHL_NFM_API_KEY" \
GHL_LOCATION_ID="tRk2nBMoIkO6EhFzr7jp" \
GHL_BASE_URL="https://services.leadconnectorhq.com" \
GHL_API_VERSION="2023-02-21" \
npm run auth-check 2>/dev/null && echo "  NFM (tRk2nBMoIkO6EhFzr7jp): OK" || echo "  NFM: WARNING — check GHL_NFM_API_KEY"

# Check DHL
GHL_API_KEY="$GHL_DHL_API_KEY" \
GHL_LOCATION_ID="Jatw8uCMjEcPeIHP2M2z" \
GHL_BASE_URL="https://services.leadconnectorhq.com" \
GHL_API_VERSION="2023-02-21" \
npm run auth-check 2>/dev/null && echo "  DHL (Jatw8uCMjEcPeIHP2M2z): OK" || echo "  DHL: WARNING — check GHL_DHL_API_KEY"

echo ""
echo "=== Setup complete ==="
echo "GHL MCP server: $GHL_MCP_DIR"
echo ""
echo "Next: Open Claude Code in this project directory."
echo "The ghl-nfm and ghl-dhl MCP servers will be available automatically."
echo ""
echo "Hermes is ready."
