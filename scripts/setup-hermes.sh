#!/usr/bin/env bash
# Installs and configures the Hermes Agent binary with OpenRouter.
# Run after load-secrets.sh and setup-ghl-mcp.sh.

set -euo pipefail

HERMES_DIR="${HOME}/.hermes"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "=== Hermes Agent Setup ==="

# --- Verify env vars ---
missing=()
[[ -z "${OPENROUTER_API_KEY:-}" ]] && missing+=("OPENROUTER_API_KEY")
if [[ ${#missing[@]} -gt 0 ]]; then
  echo "ERROR: Missing required env vars: ${missing[*]}"
  echo "Run: source scripts/load-secrets.sh"
  exit 1
fi

# --- Install Hermes binary ---
if command -v hermes &>/dev/null; then
  echo "[1/4] Hermes already installed: $(hermes --version 2>/dev/null || echo 'version unknown')"
  echo "      Updating..."
  hermes update 2>/dev/null || true
else
  echo "[1/4] Installing Hermes Agent..."
  curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
  source "${HOME}/.bashrc" 2>/dev/null || source "${HOME}/.zshrc" 2>/dev/null || true
fi

# --- Copy identity files ---
echo "[2/4] Loading Hermes identity..."
mkdir -p "$HERMES_DIR"

cp "$REPO_DIR/SOUL.md"   "$HERMES_DIR/SOUL.md"
cp "$REPO_DIR/AGENTS.md" "$HERMES_DIR/AGENTS.md"
echo "  SOUL.md  → $HERMES_DIR/SOUL.md"
echo "  AGENTS.md → $HERMES_DIR/AGENTS.md"

# Copy skills
mkdir -p "$HERMES_DIR/skills"
cp "$REPO_DIR/hermes/skills/"*.md "$HERMES_DIR/skills/" 2>/dev/null || true
echo "  Skills   → $HERMES_DIR/skills/"

# --- Configure OpenRouter ---
echo "[3/4] Configuring OpenRouter..."

mkdir -p "$HERMES_DIR"
cat > "$HERMES_DIR/openrouter.env" << EOF
OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
EOF
chmod 600 "$HERMES_DIR/openrouter.env"

# Configure hermes to use OpenRouter via CLI if available
if command -v hermes &>/dev/null; then
  hermes config set provider openrouter 2>/dev/null || true
  hermes config set base_url https://openrouter.ai/api/v1 2>/dev/null || true
  hermes config set api_key "$OPENROUTER_API_KEY" 2>/dev/null || true
  hermes config set model google/gemini-2.5-flash 2>/dev/null || true
  echo "  Provider: openrouter"
  echo "  Default model: google/gemini-2.5-flash"
fi

# Copy model routing config
cp "$REPO_DIR/hermes/config/models.yaml" "$HERMES_DIR/models.yaml"
echo "  Model routing → $HERMES_DIR/models.yaml"

# --- Verify ---
echo "[4/4] Verifying..."
if command -v hermes &>/dev/null; then
  echo "  hermes binary: $(which hermes)"
  echo "  version: $(hermes --version 2>/dev/null || echo 'unknown')"
  echo ""
  echo "=== Setup complete ==="
  echo ""
  echo "Model routing:"
  echo "  Strategic  → google/gemini-2.5-pro"
  echo "  Operations → google/gemini-2.5-flash  (default)"
  echo "  Content    → anthropic/claude-sonnet-4-5"
  echo "  Fast       → meta-llama/llama-4-scout"
  echo ""
  echo "Start Hermes: hermes"
  echo "Web UI:       hermes portal"
else
  echo "  WARNING: hermes binary not found in PATH."
  echo "  Try: source ~/.bashrc && hermes"
  echo ""
  echo "  Identity and config files are staged in $HERMES_DIR/"
  echo "  Re-run this script after hermes is in PATH."
fi
