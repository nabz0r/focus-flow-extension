# 🛠️ Architecture FocusFlow

## Structure du Projet

```
/src
  ├── /assets        - Icons & resources
  ├── /background    - Core logic
  │   ├── service-worker.ts
  │   ├── timer-core.ts    ✅
  │   ├── site-blocker.ts  ✅
  │   ├── notifications.ts ✅
  │   └── focus-tracker.ts ✅
  ├── /components    - React UI
  │   ├── /Timer          ✅
  │   ├── /Sites          ✅
  │   ├── /Stats          ✅
  │   └── /Settings       ⏳
  └── /utils         - Helpers
```

## Core Services

### Timer Core ✅
```mermaid
stateDiagram-v2
    [*] --> IDLE
    IDLE --> RUNNING: start
    RUNNING --> PAUSED: pause
    RUNNING --> BREAK: complete
    PAUSED --> RUNNING: resume
    BREAK --> IDLE: complete
```

### Site Blocker ✅
```mermaid
flowchart LR
    A[WebRequest] --> B{Is Enabled?}
    B -->|Yes| C{Check Domain}
    B -->|No| D[Allow]
    C -->|Blocked| E[Show Block Page]
    C -->|Allowed| D
```

### Stats Tracking ✅
```mermaid
flowchart TD
    A[Session Start] --> B[Track Focus Time]
    B --> C{Distraction?
    C -->|Yes| D[Increment Counter]
    D --> B
    B --> E[Session End]
    E --> F[Save Stats]
```

### Notifications ✅
```mermaid
flowchart TD
    A[Event] --> B{Notifications
Enabled?}
    B -->|Yes| C[Create Notification]
    C --> D{Sound
Enabled?}
    D -->|Yes| E[Play Sound]
```

## Storage

### Chrome Storage Schema
```typescript
interface Storage {
  settings: {
    timer: TimerConfig;
    notifications: NotificationSettings;
    theme: ThemeConfig;
  };
  blockedSites: string[];
  sessions: Session[];
  stats: {
    sessions: SessionStats[];
    totalFocusTime: number;
    sitesBlocked: number;
  };
}

interface SessionStats {
  duration: number;
  blockedAttempts: number;
  tasks: string[];
  timestamp: number;
}
```

## Flux de données

```mermaid
graph TD
    A[UI Components] --> B[Background Service]
    B --> C[Chrome Storage]
    B --> D[Site Blocking]
    B --> F[Stats Tracking]
    A --> E[User Settings]
```

## Légende
- ✅ Implémenté
- ⏳ En cours
- ❌ Non commencé