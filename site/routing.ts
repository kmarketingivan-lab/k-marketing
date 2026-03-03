import { defineRouting } from "next-intl/routing";

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  // Static export needs "always" so all links include the locale prefix.
  // SSR (Vercel) uses "as-needed" where middleware handles the default locale.
  localePrefix: isStaticExport ? "always" : "as-needed",
});

export type Locale = (typeof routing.locales)[number];
