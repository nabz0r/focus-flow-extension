import { auth } from './firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  onAuthStateChanged 
} from 'firebase/auth';

export class AuthService {
  constructor() {
    this.user = null;
    this.provider = new GoogleAuthProvider();
  }

  async init() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        this.user = user;
        resolve(user);
      });
    });
  }

  async signIn() {
    try {
      const result = await signInWithPopup(auth, this.provider);
      this.user = result.user;
      return result.user;
    } catch (error) {
      console.error('Auth error:', error);
      throw error;
    }
  }

  async signOut() {
    await auth.signOut();
    this.user = null;
  }
}