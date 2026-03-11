"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  type ConsentState,
  DEFAULT_CONSENT,
  clearGACookies,
  getStoredConsent,
  setStoredConsent,
} from "@/lib/consent";

interface CookieConsentContextValue {
  consent: ConsentState;
  hasResponded: boolean;
  showBanner: boolean;
  openBanner: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  updateConsent: (categories: Partial<ConsentState>) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue>({
  consent: DEFAULT_CONSENT,
  hasResponded: false,
  showBanner: false,
  openBanner: () => {},
  acceptAll: () => {},
  rejectAll: () => {},
  updateConsent: () => {},
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

function updateGtagConsent(analytics: boolean): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
  });
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [hasResponded, setHasResponded] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // On mount: read stored consent
  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored.categories);
      setHasResponded(true);
      updateGtagConsent(stored.categories.analytics);
    } else {
      setShowBanner(true);
    }
  }, []);

  const persist = useCallback(
    (next: ConsentState) => {
      const prev = consent;
      setConsent(next);
      setHasResponded(true);
      setShowBanner(false);
      setStoredConsent(next);
      updateGtagConsent(next.analytics);

      // If analytics was revoked, clear GA cookies
      if (prev.analytics && !next.analytics) {
        clearGACookies();
      }
    },
    [consent],
  );

  const acceptAll = useCallback(() => {
    persist({ necessary: true, analytics: true });
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ necessary: true, analytics: false });
  }, [persist]);

  const updateConsent = useCallback(
    (partial: Partial<ConsentState>) => {
      persist({ ...consent, ...partial, necessary: true });
    },
    [consent, persist],
  );

  const openBanner = useCallback(() => {
    setShowBanner(true);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasResponded,
        showBanner,
        openBanner,
        acceptAll,
        rejectAll,
        updateConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}
