#!/usr/bin/env bash
set -euxo pipefail

# Persist Codex data
mkdir -p "${CONTAINER_WORKSPACE_FOLDER}/.devcontainer/persist/.codex"
ln -s "${CONTAINER_WORKSPACE_FOLDER}/.devcontainer/persist/.codex" "$HOME/.codex"

# Persist Claude Code data
mkdir -p "${CONTAINER_WORKSPACE_FOLDER}/.devcontainer/persist/.claude"
ln -s "${CONTAINER_WORKSPACE_FOLDER}/.devcontainer/persist/.claude" "$HOME/.claude"
