export interface BlogPost {
  slug: string;
  date: string;
  readingTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "come-scegliere-agenzia-marketing-brescia",
    date: "2026-03-01",
    readingTime: "8 min",
  },
  {
    slug: "quanto-costa-sito-internet-brescia",
    date: "2026-02-20",
    readingTime: "7 min",
  },
  {
    slug: "seo-locale-brescia-guida-completa",
    date: "2026-02-10",
    readingTime: "10 min",
  },
];

export const BLOG_SLUGS = blogPosts.map((p) => p.slug);
