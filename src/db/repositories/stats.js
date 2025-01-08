import { db } from '../firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  Timestamp 
} from 'firebase/firestore';

export class StatsRepository {
  constructor(userId) {
    this.userId = userId;
  }

  async updateStats(statsData) {
    const statsRef = doc(db, 'stats', this.userId);
    const data = {
      ...statsData,
      updatedAt: Timestamp.now()
    };
    await setDoc(statsRef, data, { merge: true });
  }

  async getStats() {
    const statsRef = doc(db, 'stats', this.userId);
    const snapshot = await getDoc(statsRef);
    return snapshot.exists() ? snapshot.data() : null;
  }
}