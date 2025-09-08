// AES-GCM helpers — ciphertext-only writes to Firestore

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const b64 = {
  enc: (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))),
  dec: (str) => Uint8Array.from(atob(str), c => c.charCodeAt(0)).buffer
};

/** Derive an AES-GCM key from passphrase + salt (PBKDF2) */
export async function deriveKey(passphrase, saltB64) {
  const salt = b64.dec(saltB64);
  const baseKey = await crypto.subtle.importKey(
    "raw", textEncoder.encode(passphrase), "PBKDF2", false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: 150000 },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/** Random 16B salt (base64) — create once per channel */
export function generateSaltB64() {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return b64.enc(salt);
}

/** Encrypt a JS object */
export async function encryptJSON(key, obj) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = textEncoder.encode(JSON.stringify(obj));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
  return { ciphertext: b64.enc(ct), iv: b64.enc(iv) };
}

/** Decrypt to JS object */
export async function decryptJSON(key, ciphertextB64, ivB64) {
  const iv = new Uint8Array(b64.dec(ivB64));
  const ct = b64.dec(ciphertextB64);
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return JSON.parse(textDecoder.decode(pt));
}
