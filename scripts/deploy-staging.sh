#!/usr/bin/env bash
# scripts/deploy-staging.sh
#
# Deploys ONLY the public site surface to the staging VPS via rsync over SSH.
# This is an explicit allowlist by design (see docs/DEPLOYMENT.md §11 and
# docs/governance/PROJECT_RISK_REGISTER.md R-004): nothing outside ROOT_FILES/
# DIRS below can ever be shipped by this script, no matter what new internal
# files or directories land in the repo later. Do NOT replace the allowlist
# with "." or a broader source plus --exclude patterns.
set -euo pipefail

SSH_KEY="${SLS_DEPLOY_SSH_KEY:-$HOME/.ssh/jones_vps}"
REMOTE_HOST="root@74.208.9.49"
REMOTE_ROOT="/var/www/smart-learning-solutions"
SSH_CMD="ssh -i ${SSH_KEY} -o BatchMode=yes -o ConnectTimeout=10"

# Explicit allowlist — the ONLY things this script will ever send.
ROOT_FILES=(index.html about.html workshops.html resources.html book.html contact.html 404.html robots.txt sitemap.xml)
DIRS=(programs src legal)

# A plain string, not an array: expanding an empty array under `set -u` throws
# "unbound variable" on bash 3.2 (macOS's default /bin/bash) even when the
# array is declared. An empty string word-splits to zero arguments, which is
# what we want, without that pitfall.
DRY_RUN_FLAG=""
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN_FLAG="--dry-run"
  echo "== DRY RUN — no files will be changed on the server =="
fi

cd "$(git rev-parse --show-toplevel)"

echo "== Root files (no --delete: see docs/DEPLOYMENT.md §11 for why) =="
rsync -avzi ${DRY_RUN_FLAG} \
  --exclude='.DS_Store' \
  -e "${SSH_CMD}" \
  "${ROOT_FILES[@]}" \
  "${REMOTE_HOST}:${REMOTE_ROOT}/"

for d in "${DIRS[@]}"; do
  echo "== ${d}/ (--delete scoped to this subtree only) =="
  rsync -avzi ${DRY_RUN_FLAG} --delete \
    --exclude='.DS_Store' --exclude='Thumbs.db' --exclude='._*' \
    -e "${SSH_CMD}" \
    "${d}/" \
    "${REMOTE_HOST}:${REMOTE_ROOT}/${d}/"
done

echo "== Done. pics/ and all repo-internal paths were never referenced above. =="
