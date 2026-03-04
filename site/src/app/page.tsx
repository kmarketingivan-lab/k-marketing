"use client";

import { useEffect } from "react";

/**
 * Root page — detects browser language and redirects to /it/ or /en/.
 * Used in static export mode (Altervista) where next-intl middleware is unavailable.
 * In SSR mode (Vercel), the middleware handles locale detection before this renders.
 *
 * SEO: meta refresh + visible links ensure Googlebot can discover locale pages
 * even without JavaScript execution.
 */
export default function RootPage() {
  useEffect(() => {
    const browserLang = navigator.language || "";
    const locale = browserLang.startsWith("en") ? "en" : "it";
    window.location.replace(`/${locale}/`);
  }, []);

  return (
    <>
      <head>
        <meta httpEquiv="refresh" content="0;url=/it/" />
        <link rel="canonical" href="https://k-marketing.it/it/" />
      </head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#060724] font-sans text-gray-100">
        <h1 className="mb-6 text-3xl font-bold">
          K-Marketing — Agenzia Marketing e Pubblicità a Brescia
        </h1>
        <p className="mb-8 max-w-lg text-center text-gray-100/60">
          Agenzia di marketing digitale a Brescia. SEO, siti internet, campagne pubblicitarie, automazione AI per PMI.
        </p>
        <nav className="flex gap-6 text-lg">
          <a href="/it/" className="text-orange-500 underline">Italiano</a>
          <a href="/en/" className="text-orange-500 underline">English</a>
        </nav>
        <noscript>
          <p className="mt-4">
            <a href="/it/">Italiano</a> | <a href="/en/">English</a>
          </p>
        </noscript>
      </div>
    </>
  );
}
