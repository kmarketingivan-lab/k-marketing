export interface BlogPost {
  slug: string;
  date: string;
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  { slug: "quanto-costa-gestione-social-brescia",          date: "2026-04-10", readingTime: "7 min" },
  { slug: "come-funzionano-campagne-social-brescia",        date: "2026-04-07", readingTime: "8 min" },
  { slug: "quando-serve-consulente-marketing-digitale-brescia", date: "2026-04-03", readingTime: "6 min" },
  { slug: "seo-locale-brescia-come-funziona",              date: "2026-03-28", readingTime: "9 min" },
  { slug: "errori-gestione-social-media-pmi",              date: "2026-03-20", readingTime: "6 min" },
  { slug: "strategie-social-media-pmi-brescia",            date: "2026-03-15", readingTime: "8 min" },
];

export const BLOG_SLUGS = blogPosts.map((p) => p.slug);
