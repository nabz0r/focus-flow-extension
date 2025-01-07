# FocusFlow Extension 🎯

Une extension de navigateur pour améliorer la productivité et maintenir la concentration.

## Fonctionnalités

- Timer Pomodoro configurable
- Blocage de sites distractifs
- Statistiques de focus
- Multi-navigateur (Chrome, Firefox, Edge)

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

## Roadmap v2 🗺️

### Phase 1: Core Features - En cours ⏳
- [x] Multi-navigateur setup
- [x] Timer basique
- [x] UI minimaliste
- [ ] Service Worker
- [ ] Blocage de sites

### Phase 2: Améliorations UI
- [ ] Stats & Dashboard
- [ ] Theme support
- [ ] Notifications
- [ ] Import/Export

### Phase 3: Tests & Polish
- [ ] Tests E2E
- [ ] Tests unitaires
- [ ] Documentation API
- [ ] Store release

## Documentation

- [Installation](./docs/INSTALL.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [TODO](./docs/TODO.md)

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
