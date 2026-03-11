/** Site-wide constants */

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
