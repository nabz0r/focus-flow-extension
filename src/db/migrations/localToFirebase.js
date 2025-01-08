import { auth } from '../firebase';
import { SessionRepository } from '../repositories/sessions';
import { StatsRepository } from '../repositories/stats';

export async function migrateLocalDataToFirebase() {
  const user = auth.currentUser;
  if (!user) throw new Error('User must be authenticated');

  const sessionRepo = new SessionRepository(user.uid);
  const statsRepo = new StatsRepository(user.uid);

  // Get local data
  const localData = await chrome.storage.local.get(null);

  // Migrate sessions
  if (localData.sessions) {
    for (const session of localData.sessions) {
      await sessionRepo.addSession(session);
    }
  }

  // Migrate stats
  if (localData.stats) {
    await statsRepo.updateStats(localData.stats);
  }

  return true;
}