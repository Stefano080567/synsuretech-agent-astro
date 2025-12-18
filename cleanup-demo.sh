#!/bin/bash

echo "Starte Cleanup..."
rm -rf node_modules package-lock.json .next
rm -f tailwind.config.js postcss.config.js
echo "Cleanup abgeschlossen!"
