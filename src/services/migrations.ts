import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import FirebaseService from './firebase';
import { Session, Task, UserSettings } from '../types/firebase';

export async function migrateToFirebase() {
  const db = FirebaseService.getInstance().getDb();
  const batch = writeBatch(db);

  // Get local data
  const localSettings = await chrome.storage.sync.get('settings');
  const localSessions = await chrome.storage.local.get('sessions');
  const localTasks = await chrome.storage.local.get('tasks');

  // Migrate settings
  if (localSettings.settings) {
    const userDoc = doc(db, 'users', 'current-user-id');
    batch.set(userDoc, {
      settings: localSettings.settings,
      createdAt: new Date()
    });
  }

  // Migrate sessions
  if (localSessions.sessions) {
    const sessionsCol = collection(db, 'sessions');
    localSessions.sessions.forEach((session: Session) => {
      const sessionDoc = doc(sessionsCol);
      batch.set(sessionDoc, {
        ...session,
        createdAt: new Date(),
        userId: 'current-user-id'
      });
    });
  }

  // Migrate tasks
  if (localTasks.tasks) {
    const tasksCol = collection(db, 'tasks');
    localTasks.tasks.forEach((task: Task) => {
      const taskDoc = doc(tasksCol);
      batch.set(taskDoc, {
        ...task,
        createdAt: new Date(),
        userId: 'current-user-id'
      });
    });
  }

  // Execute batch
  await batch.commit();

  // Clear local data after successful migration
  await chrome.storage.sync.clear();
  await chrome.storage.local.clear();
}

export async function validateMigration() {
  const db = FirebaseService.getInstance().getDb();
  
  const userDoc = await getDocs(collection(db, 'users'));
  const sessionsDoc = await getDocs(collection(db, 'sessions'));
  const tasksDoc = await getDocs(collection(db, 'tasks'));

  return {
    users: !userDoc.empty,
    sessions: !sessionsDoc.empty,
    tasks: !tasksDoc.empty
  };
}