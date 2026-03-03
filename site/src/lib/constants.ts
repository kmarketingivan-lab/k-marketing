/** Site-wide constants */

export const SITE = {
  name: "K-Marketing",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://k-marketing.it",
  email: "kmarketing.ivan@gmail.com",
  phone: "+39 375 739 2959",
  address: "Brescia, Italia",
  founder: "Ivan Crescini",
  foundedYear: 2020,
  projectCount: "20+",
} as const;
