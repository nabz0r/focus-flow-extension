# FocusFlow Extension 🎯

Une extension de navigateur pour améliorer la productivité et maintenir la concentration.

## Architecture

```mermaid
graph TD
    A[Extension Frontend] --> B[Background Service]
    B --> C[Firebase Backend]
    A --> D[Chrome Storage]
    B --> D
    C --> E[User Data]
    C --> F[Analytics]
```

## Structure des données

```mermaid
erDiagram
    USER ||--o{ SESSION : has
    USER {
        string uid
        string email
        object settings
    }
    SESSION ||--o{ TASK : contains
    SESSION {
        string id
        timestamp start
        timestamp end
        int focusScore
    }
    TASK {
        string id
        string title
        boolean completed
        int duration
    }
```

## Roadmap Technique 🗺️

### Phase 1: Core Backend (Sprint 1)
- [ ] Background Service Worker
- [ ] Timer Core Logic
- [ ] Chrome Storage Setup
- [ ] Basic Site Blocking

### Phase 2: Basic UI (Sprint 2)
- [ ] Timer Component
- [ ] Settings Panel
- [ ] Task Board v1
- [ ] Block List Manager

### Phase 3: Enhanced Features (Sprint 3)
- [ ] Pomodoro Logic
- [ ] Statistics Local
- [ ] Site Categories
- [ ] Settings Sync

### Phase 4: Firebase & Polish (Sprint 4)
- [ ] Firebase Setup
- [ ] User Auth
- [ ] Cloud Sync
- [ ] Analytics
- [ ] Store Release

## Components Structure

```mermaid
graph LR
    A[App] --> B[Timer]
    A --> C[TaskList]
    A --> D[Settings]
    A --> E[Stats]
    B --> F[TimerControls]
    B --> G[TimerDisplay]
    C --> H[TaskItem]
    C --> I[TaskForm]
    E --> J[Charts]
    E --> K[Reports]
```

License MIT

Copyright (c) 2025 nabz0r (nabz0r@gmail.com)
GitHub: https://github.com/nabz0r
