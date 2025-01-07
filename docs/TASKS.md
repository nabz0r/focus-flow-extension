# 📊 Tâches Techniques

## 1. Core Extension

### Service Worker 🟢
- [x] Initialisation background service
- [x] System de messaging
- [x] Gestion des états
- [x] Event listeners de base

### Timer Core 🟢
- [x] Machine à états timer (IDLE, RUNNING, PAUSED)
- [x] Gestion précise du temps
- [x] Persistance état timer
- [x] Calibration temps système

### Site Blocking 🟢
- [x] Parser URLs/Domains
- [x] Matching patterns
- [x] WebRequest interceptor
- [x] Cache DNS/Hosts

### Storage 🟡
- [x] Schema validation
- [x] CRUD opérations
- [ ] Migration données
- [ ] Gestion quota

## 2. Front Components

### Timer UI 🟢
- [x] Display component
- [x] Controls component
- [x] Progress circle
- [x] Sound alerts

### Site Manager 🟢
- [x] Liste sites component
- [x] Form ajout/edit
- [x] URL validator
- [ ] Batch import/export 🟡

### Settings Panel 🟡
- [ ] Timer config
- [ ] Theme selector
- [ ] Notifications config
- [ ] Shortcuts manager

### Stats Display 🔴
- [ ] Data aggregator
- [ ] Charts renderer
- [ ] Filters/périodes
- [ ] Export données

## 3. Quality & Tests 🔴

### Unit Tests [CRITICAL]
- [ ] Timer logic tests
- [ ] Storage tests
- [ ] Components tests
- [ ] Utils tests

### E2E Tests [CRITICAL]
- [ ] Timer workflow
- [ ] Block sites workflow
- [ ] Settings workflow
- [ ] Stats workflow

### Performance 🔴
- [ ] Audit background worker
- [ ] Audit React components
- [ ] Audit storage operations
- [ ] Audit network calls

### Browser Stores 🔴
- [ ] Chrome package
- [ ] Firefox package
- [ ] Edge package
- [ ] Documentation store

## Légende

- 🟢 = DONE
- 🟡 = IN PROGRESS/PARTIAL
- 🔴 = TODO
- [CRITICAL] = Priorité haute