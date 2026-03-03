"use client";

import Script from "next/script";
import { usePathname } from "@/../../navigation";
import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/components/cookie-consent-provider";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";

export function GoogleAnalytics() {
  const { consent } = useCookieConsent();
  const pathname = usePathname();
  const scriptLoaded = useRef(false);

  // Track route changes when consent is granted
  useEffect(() => {
    if (consent.analytics && scriptLoaded.current) {
      pageview(pathname);
    }
  }, [pathname, consent.analytics]);

  // No GA ID configured — render nothing
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      {consent.analytics && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
          onLoad={() => {
            scriptLoaded.current = true;
            window.gtag("config", GA_MEASUREMENT_ID, {
              anonymize_ip: true,
              send_page_view: true,
            });
          }}
        />
      )}
    </>
  );
}
