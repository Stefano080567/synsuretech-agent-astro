#!/bin/bash
set -e  # Stoppe bei Fehlern

# =====================================
# 1. Pfad definieren
# =====================================
PROJECT_DIR="$HOME/wikisure-agent-astro"
echo "Projektpfad: $PROJECT_DIR"

# =====================================
# 2. Node/NPM Version sicherstellen
# =====================================
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20
echo "Node Version: $(node -v)"
echo "NPM Version: $(npm -v)"

# =====================================
# 3. Projektverzeichnis wechseln
# =====================================
cd "$PROJECT_DIR"

# =====================================
# 4. Cleanup lokaler Dateien
# =====================================
echo "Lösche node_modules, Lockfile, Build-Ordner und alte Configs..."
rm -rf node_modules package-lock.json .next
rm -f tailwind.config.js postcss.config.js
echo "Cleanup abgeschlossen."

# =====================================
# 5. Abhängigkeiten installieren
# =====================================
echo "Installiere Abhängigkeiten..."
npm install

# =====================================
# 6. Tailwind initialisieren
# =====================================
if [ ! -f tailwind.config.js ]; then
    echo "Initialisiere Tailwind CSS..."
    npx tailwindcss init -p
fi

# =====================================
# 7. Optional: Git-LFS große Dateien tracken
# =====================================
if [ -f "*.zip" ]; then
    git lfs track "*.zip"
    echo "*.zip" >> .gitignore
    git add .gitattributes .gitignore
    git commit -m "Track große Dateien via LFS" || true
fi

# =====================================
# 8. Backup-Branch vor Änderungen erstellen
# =====================================
git checkout -b backup-before-change || git checkout backup-before-change
git add .
git commit -m "Backup vor Setup" || true

# =====================================
# 9. Lokaler Dev-Server
# =====================================
echo "Starte lokalen Dev-Server..."
BASE_URL="http://localhost:4321" HEADLESS=true STRICT_MODE=true npm run dev

# =====================================
# 10. Hinweise zu Vercel
# =====================================
echo "Für Vercel: Prüfe alte Deployments und lösche sie, falls nötig:"
echo "1) vercel ls"
echo "2) vercel rm <DEPLOYMENT_ID> --yes"

echo "Setup abgeschlossen. Lokaler Server läuft unter http://localhost:4321/"
