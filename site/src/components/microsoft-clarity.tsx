"use client";

import Script from "next/script";
import { useCookieConsent } from "@/components/cookie-consent-provider";

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";

/**
 * Microsoft Clarity — heatmaps e session recording.
 * Caricato solo dopo il consenso analytics (stesso flag di GA4).
 */
export function MicrosoftClarity() {
  const { consent } = useCookieConsent();

  if (!CLARITY_ID || !consent.analytics) return null;

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${CLARITY_ID}");
        `.trim(),
      }}
    />
  );
}
