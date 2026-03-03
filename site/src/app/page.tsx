"use client";

import { useEffect } from "react";

/**
 * Root page — detects browser language and redirects to /it/ or /en/.
 * Used in static export mode (Altervista) where next-intl middleware is unavailable.
 * In SSR mode (Vercel), the middleware handles locale detection before this renders.
 */
export default function RootPage() {
  useEffect(() => {
    const browserLang = navigator.language || "";
    const locale = browserLang.startsWith("en") ? "en" : "it";
    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center font-sans text-gray-100">
      <noscript>
        <p>
          <a href="/it/">Italiano</a> | <a href="/en/">English</a>
        </p>
      </noscript>
    </div>
  );
}
