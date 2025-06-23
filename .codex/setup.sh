#!/usr/bin/env bash
set -euo pipefail

PG_USER="postgres"
PG_PASSWORD="postgres"
PG_DB="nelsonlaime"

SRH_REPO="https://github.com/hiett/serverless-redis-http.git"
SRH_DIR="$HOME/serverless-redis-http"
SRH_LOG="$HOME/srh.log"
SRH_MODE="env"
SRH_TOKEN="nelsonlaime"
SRH_CONNECTION_STRING="redis://localhost:6379"
SRH_PORT="8079"

echo "Setting up nelsonlai.me..."

sudo apt-get update

# Install necessary packages
sudo apt install -y postgresql redis-server erlang elixir

# Setup PostgreSQL
sudo -u postgres psql <<SQL
ALTER USER ${PG_USER} WITH PASSWORD '${PG_PASSWORD}';
CREATE DATABASE ${PG_DB} OWNER ${PG_USER};
SQL

# Setup Serverless Redis HTTP
git clone ${SRH_REPO} ${SRH_DIR}
cd ${SRH_DIR}
mix deps.get --quiet
nohup env \
  SRH_MODE=${SRH_MODE} \
  SRH_TOKEN=${SRH_TOKEN} \
  SRH_CONNECTION_STRING=${SRH_CONNECTION_STRING} \
  SRH_PORT=${SRH_PORT} \
  elixir --no-halt -S mix run \
  </dev/null \
  > "${SRH_LOG}" 2>&1 &

echo "Waiting for SRH to start on port ${SRH_PORT}..."
  while ! ss -tuln | grep -q ":${SRH_PORT}"; do
    sleep 0.5
  done
  echo "SRH is up on port ${SRH_PORT}."

cd $OLDPWD

pnpm install
pnpm db:migrate
pnpm db:seed
pnpm build:mdx

echo "✅ All done!
  • Postgres → localhost:5432 (DB=${PG_DB})
  • Redis    → localhost:${SRH_PORT}
  • SRH HTTP → localhost:${SRH_PORT} (logs → ${SRH_LOG})"
