# Roadmap & Tasks

## 1. Core Extension

### Service Worker
- [ ] Initialisation background service
  - [ ] System de messaging
  - [ ] Gestion des états
  - [ ] Event listeners de base
  - [ ] Gestion des erreurs

### Timer Core
- [ ] Machine à états timer
  - [ ] États: IDLE, RUNNING, PAUSED
  - [ ] Gestion précise du temps
  - [ ] Persistance état
  - [ ] Calibration temps système
  - [ ] Fix: Reset après pause

### Site Blocking
- [ ] Parser URLs/Domains
  - [ ] Validation format URL
  - [ ] Matching patterns
  - [ ] WebRequest interceptor
  - [ ] Cache DNS/Hosts

### Storage
- [ ] Schema validation
  - [ ] CRUD opérations
  - [ ] Migration données
  - [ ] Gestion quota
  - [ ] Import/Export settings

## 2. Front Components

### Timer UI
- [ ] Display component
  - [ ] Controls
  - [ ] Progress circle
  - [ ] Sound alerts
  - [ ] Raccourcis clavier

### Site Manager
- [ ] Liste sites component
  - [ ] Form ajout/edit
  - [ ] URL validator
  - [ ] Batch import/export
  - [ ] Catégorisation sites

### Settings Panel
- [ ] Timer config
  - [ ] Theme selector
  - [ ] Notifications
  - [ ] Shortcuts
  - [ ] Import/Export

### Stats Display
- [ ] Data aggregator
  - [ ] Charts renderer
  - [ ] Filtres/périodes
  - [ ] Export data
  - [ ] Thèmes personnalisables

## 3. Tests & Quality

### Unit Tests [Critical]
- [ ] Timer logic tests
  - [ ] Storage tests
  - [ ] Components tests
  - [ ] Utils tests

### E2E Tests [Critical]
- [ ] Timer workflow
  - [ ] Block sites workflow
  - [ ] Settings workflow
  - [ ] Stats workflow

### Performance
- [ ] Audit background worker
  - [ ] Audit React components
  - [ ] Audit storage
  - [ ] Memory leaks

### Store Release
- [ ] Chrome package
  - [ ] Firefox package
  - [ ] Edge package
  - [ ] Documentation store

## Bugs Connus
- Sites bloqués: validation URL incorrecte
- Timer: problème de reset après pause
- Storage: synchronisation lente