import { Buffer } from 'buffer';

export class Encryption {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;
  private key: CryptoKey | null = null;

  async init(password: string): Promise<void> {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    this.key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('focus-flow-salt'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: this.ALGORITHM, length: this.KEY_LENGTH },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(data: any): Promise<string> {
    if (!this.key) throw new Error('Encryption not initialized');

    const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(data));

    const encrypted = await crypto.subtle.encrypt(
      { name: this.ALGORITHM, iv },
      this.key,
      encodedData
    );

    const concatenated = new Uint8Array(iv.length + encrypted.byteLength);
    concatenated.set(iv);
    concatenated.set(new Uint8Array(encrypted), iv.length);

    return Buffer.from(concatenated).toString('base64');
  }

  async decrypt(encryptedData: string): Promise<any> {
    if (!this.key) throw new Error('Encryption not initialized');

    const data = Buffer.from(encryptedData, 'base64');
    const iv = data.slice(0, this.IV_LENGTH);
    const encrypted = data.slice(this.IV_LENGTH);

    const decrypted = await crypto.subtle.decrypt(
      { name: this.ALGORITHM, iv },
      this.key,
      encrypted
    );

    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decrypted));
  }
}