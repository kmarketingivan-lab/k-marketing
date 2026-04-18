export interface BlogPost {
  slug: string;
  date: string;
  readingTime: string;
}

// Articoli rimossi — nuovi articoli in arrivo su temi specifici
export const blogPosts: BlogPost[] = [];

export const BLOG_SLUGS = blogPosts.map((p) => p.slug);
