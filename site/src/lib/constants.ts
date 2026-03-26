/** Site-wide constants */

/**
 * Returns the URL prefix for a given locale.
 * Static export (Altervista, localePrefix="always"): /it or /en
 * SSR (Vercel, localePrefix="as-needed"):            ""  or /en
 */
export function localeBase(locale: string): string {
  const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
  if (locale === "en") return "/en";
  return isStatic ? "/it" : "";
}

export const SITE = {
  name: "K-Marketing",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://k-marketing.it",
  email: "info@k-marketing.it",
  phone: "+39 375 739 2959",
  address: "Brescia, Italia",
  founder: "Ivan Crescini",
  foundedYear: 2020,
  projectCount: "20+",
  bookingUrl: "https://calendar.app.google/BauatAzFmdj6THD4A",
} as const;
