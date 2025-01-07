# Guide d'Installation FocusFlow

## Prérequis

- Node.js 18+ 
- npm ou yarn
- Git

## Installation

```bash
# Cloner le repo
git clone https://github.com/nabz0r/focus-flow-extension.git
cd focus-flow-extension

# Installer les dépendances
npm install

# Build l'extension
npm run build
```

## Installer l'extension

### Chrome/Edge
1. Ouvrir chrome://extensions
2. Activer le "Mode développeur"
3. Cliquer "Charger l'extension non empaquetée"
4. Sélectionner le dossier `dist`

### Firefox
1. Ouvrir about:debugging
2. Cliquer "Ce Firefox"
3. Cliquer "Charger un module temporaire"
4. Sélectionner `manifest.json` dans le dossier `dist`

## Développement

```bash
# Mode développement avec hot reload
npm run dev
```

## Structure

```
/dist           - Build files
/src            - Source code
  /assets       - Icons
  /background   - Service worker
  /components   - React components
  /utils        - Helpers
```

## Tests

```bash
# Lancer les tests
npm test

# Coverage
npm run test:coverage
```