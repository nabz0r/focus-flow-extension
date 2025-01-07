export class StorageService {
  static async getSessions() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['sessions'], (result) => {
        resolve(result.sessions || []);
      });
    });
  }

  static async saveSession(session: any) {
    const sessions = await this.getSessions();
    sessions.push(session);
    return new Promise((resolve) => {
      chrome.storage.local.set({ sessions }, resolve);
    });
  }

  static async clearSessions() {
    return new Promise((resolve) => {
      chrome.storage.local.remove(['sessions'], resolve);
    });
  }
}