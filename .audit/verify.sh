#!/bin/sh
cd /workspace
export PATH=/workspace/node_modules/.bin:$PATH
for pid in $(ps -eo pid,args | grep -E 'vite(\.js)? preview' | grep -v grep | awk '{print $1}'); do kill "$pid"; done
sleep 2
echo "after-kill:$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8081/)"
nohup vite preview > /tmp/preview.log 2>&1 &
for i in $(seq 1 30); do curl -s -o /dev/null http://127.0.0.1:8081/ && break; sleep 1; done
echo ==AXE; timeout 300 node .audit/axe.mjs http://127.0.0.1:8081 2>&1 | tail -17
echo ==ROUTES; timeout 300 node scripts/qa-routes.mjs http://127.0.0.1:8081 > /tmp/qr.txt 2>&1; grep -E 'FAIL|dead:|^     -' /tmp/qr.txt; echo "pass=$(grep -c '^PASS' /tmp/qr.txt)"
echo ==OFFLINE; timeout 200 node scripts/qa-offline.mjs http://127.0.0.1:8081 2>&1 | tail -7
