#!/bin/sh
cd /workspace; export PATH=/workspace/node_modules/.bin:$PATH
for pid in $(ps -eo pid,args | grep -E 'vite(\.js)? preview' | grep -v grep | awk '{print $1}'); do kill "$pid"; done; sleep 2
rm -rf .vercel/output; vite build > /tmp/build.log 2>&1 && echo BUILD_OK || tail -20 /tmp/build.log
nohup vite preview > /tmp/preview.log 2>&1 &
for i in $(seq 1 30); do curl -s -o /dev/null http://127.0.0.1:8081/ && break; sleep 1; done
echo ==ROUTES; node scripts/qa-routes.mjs http://127.0.0.1:8081 > /tmp/qr.txt 2>&1; grep -E 'FAIL|dead:|^     -' /tmp/qr.txt; echo "pass=$(grep -c '^PASS' /tmp/qr.txt)"
echo ==OFFLINE; node scripts/qa-offline.mjs http://127.0.0.1:8081 2>&1 | grep -c PASS
echo ==DATA; node scripts/qa-data.mjs http://127.0.0.1:8081 2>&1 | grep -E 'FAIL' ; node scripts/qa-data.mjs http://127.0.0.1:8081 2>&1 | grep -c PASS
echo ==MIGRATE; node scripts/qa-migrate.mjs http://127.0.0.1:8081 2>&1 | grep -c PASS
echo ==EXTRA; node .audit/extra.mjs 2>&1 | tail -24
