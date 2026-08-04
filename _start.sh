#!/bin/bash
set -e
cd "$(dirname "$0")"
pkill -f 'tsx' 2>/dev/null || true
sleep 1
echo "==> Serving app via gateway → http://${PUBLIC_HOST:-localhost}:3008/run-1/"
exec run-project "$(pwd)"
