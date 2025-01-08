# 📍 Guide d'Installation FocusFlow

## 💻 Prérequis

- Node.js 18+ 
- npm 9+ ou yarn 1.22+
- Git

## ⚙️ Installation

```bash
# Clone
git clone https://github.com/nabz0r/focus-flow-extension.git
cd focus-flow-extension

# Install deps
npm install

# Dev mode (hot reload)
npm run dev

# Build prod
npm run build
```

## 💪 Core Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "recharts": "^2.10.3"
  },
  "devDependencies": {
    "@types/chrome": "^0.0.260",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "copy-webpack-plugin": "^12.0.2",
    "css-loader": "^6.9.1",
    "html-webpack-plugin": "^5.6.0",
    "postcss": "^8.4.33",
    "postcss-loader": "^8.0.0",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "webpack": "^5.89.0"
  }
}
```

## 📱 Installation par Navigateur

### Chrome/Edge 🟢
1. Ouvrir `chrome://extensions`
2. Activer "Mode développeur" 🔒
3. "Charger l'extension non empaquetée" 📦
4. Sélectionner `/dist`

### Firefox 🟢
1. Ouvrir `about:debugging`
2. "Ce Firefox" 🔍
3. "Charger un module temporaire" ➕
4. Sélectionner `/dist/manifest.json`

## 🔧 Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Développement avec hot reload |
| `npm run build` | Build production |
| `npm run test` | Tests unitaires |
| `npm run lint` | Vérification code |

## 🔥 Hot Reload

1. Build mode dev: `npm run dev`
2. Les changements sont automatiquement appliqués
3. Rafraîchir l'extension dans le navigateur

## 💡 Tips

- Utiliser l'inspecteur d'extension Chrome pour le debug
- Vérifier les logs dans la console du service worker
- Utiliser Redux DevTools pour stats tracking
- Désactiver autres extensions similaires

## 👮 Troubleshooting

- **Erreur manifest**: Vérifier la version du manifest.json
- **Hot reload ne marche pas**: Redémarrer le navigateur
- **Conflit de ports**: Changer le port dans webpack.config.js
- **Stats ne s'affichent pas**: Vérifier le storage dans dev tools