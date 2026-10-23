/**
 * Persistenza locale (localStorage, o memoria se non disponibile).
 * Tutto omonimizzato con "sic." — nessun dato personale, solo impostazioni
 * e progressi dello pseudonimo scelto dallo studente.
 */

const NS = 'sic.';
const memory = new Map<string, string>();

function rawGet(key: string): string | null {
  try {
    return window.localStorage.getItem(NS + key);
  } catch {
    return memory.get(NS + key) ?? null;
  }
}

function rawSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(NS + key, value);
  } catch {
    memory.set(NS + key, value);
  }
}

function rawDel(key: string): void {
  try {
    window.localStorage.removeItem(NS + key);
  } catch {
    memory.delete(NS + key);
  }
}

export const storage = {
  get<T>(key: string, fallback: T): T {
    const raw = rawGet(key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown): void {
    rawSet(key, JSON.stringify(value));
  },
  del(key: string): void {
    rawDel(key);
  },
  has(key: string): boolean {
    return rawGet(key) !== null;
  }
};
