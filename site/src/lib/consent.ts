/** Cookie consent types and localStorage helpers */

export type ConsentCategory = "necessary" | "analytics";

export type ConsentState = Record<ConsentCategory, boolean>;

export interface StoredConsent {
  version: number;
  categories: ConsentState;
  timestamp: string;
}

export const CONSENT_STORAGE_KEY = "km-consent";
export const CONSENT_VERSION = 1;

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
};

/** Read stored consent from localStorage (returns null if absent or version mismatch) */
export function getStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: StoredConsent = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Persist consent choices to localStorage */
export function setStoredConsent(categories: ConsentState): void {
  if (typeof window === "undefined") return;
  const data: StoredConsent = {
    version: CONSENT_VERSION,
    categories: { ...categories, necessary: true },
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(data));
}

/** Remove stored consent */
export function clearStoredConsent(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONSENT_STORAGE_KEY);
}

/** Delete all Google Analytics cookies (_ga, _ga_*, _gid, _gat) */
export function clearGACookies(): void {
  if (typeof document === "undefined") return;
  const cookies = document.cookie.split(";");
  const gaCookiePattern = /^_(ga|gid|gat)/;

  for (const cookie of cookies) {
    const name = cookie.split("=")[0]?.trim();
    if (!name) continue;
    if (gaCookiePattern.test(name)) {
      // Delete with multiple path/domain combinations to ensure removal
      const domains = [window.location.hostname, `.${window.location.hostname}`, ""];
      for (const domain of domains) {
        const domainPart = domain ? `; domain=${domain}` : "";
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}`;
      }
    }
  }
}
