#!/bin/bash
# setup-full.sh
# End-to-End Setup für wikisure-agent-astro

echo "Starte komplettes Setup für wikisure-agent-astro..."

# 1️⃣ Node-Version sicherstellen
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 20
nvm use 20

echo "Node Version: $(node -v)"
echo "NPM Version: $(npm -v)"

# 2️⃣ Alte Node-Module, Lockfiles & Build-Ordner entfernen
rm -rf node_modules package-lock.json
rm -rf .next

# 3️⃣ Abhängigkeiten installieren
npm install

# 4️⃣ Tailwind CSS und PostCSS konfigurieren
cat > tailwind.config.js <<EOL
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOL

cat > postcss.config.cjs <<EOL
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
EOL

# 5️⃣ Projektstruktur erstellen
mkdir -p src/pages src/components public

# 6️⃣ Ausgangsseite erstellen
cat > src/pages/index.astro <<EOL
---
title: Wikisure Astro Demo
---

<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <title>\${title}</title>
    <link rel="stylesheet" href="/src/styles/global.css" />
  </head>
  <body class="bg-gray-100 text-gray-900">
    <main class="container mx-auto p-4">
      <h1 class="text-3xl font-bold">Willkommen bei der Wikisure Astro Demo</h1>
      <p>Dies ist die Ausgangslage für das End-to-End Setup.</p>
    </main>
  </body>
</html>
EOL

# 7️⃣ Start-Script anzeigen
echo "Setup abgeschlossen! Du kannst nun starten mit:"
echo "cd ~/wikisure-agent-astro && npm run dev"
echo "Die lokale URL lautet: http://localhost:4321/"
