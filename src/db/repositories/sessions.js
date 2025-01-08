import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  Timestamp 
} from 'firebase/firestore';

export class SessionRepository {
  constructor(userId) {
    this.userId = userId;
    this.collection = collection(db, 'sessions');
  }

  async addSession(sessionData) {
    const data = {
      ...sessionData,
      userId: this.userId,
      createdAt: Timestamp.now()
    };
    return await addDoc(this.collection, data);
  }

  async getUserSessions(startDate, endDate) {
    const q = query(
      this.collection,
      where('userId', '==', this.userId),
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }
}