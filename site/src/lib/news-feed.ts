/**
 * Fetches marketing news articles from the K-Marketing News Agent (CloudFront).
 * Used by blog pages to display automated news alongside editorial posts.
 */

const CLOUDFRONT_BASE = "https://d4gy5ea465kim.cloudfront.net/data";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  source_url: string;
  source_name: string;
  date: string;
  image?: string;
  language: "it" | "en";
}

/** Category labels for display */
export const NEWS_CATEGORIES: Record<string, { it: string; en: string }> = {
  SEO: { it: "SEO", en: "SEO" },
  Social: { it: "Social Media", en: "Social Media" },
  Content: { it: "Content Marketing", en: "Content Marketing" },
  Email: { it: "Email Marketing", en: "Email Marketing" },
  Advertising: { it: "Pubblicità Online", en: "Online Advertising" },
  Analytics: { it: "Analytics", en: "Analytics" },
  Strategy: { it: "Strategia", en: "Strategy" },
  Branding: { it: "Branding", en: "Branding" },
};

/**
 * Fetch news articles from CloudFront.
 * Revalidates every 5 minutes (ISR).
 */
export async function fetchNewsArticles(
  locale: "it" | "en"
): Promise<NewsArticle[]> {
  try {
    const res = await fetch(`${CLOUDFRONT_BASE}/${locale}/articles.json`, {
      next: { revalidate: 300 }, // 5 minutes ISR
    });
    if (!res.ok) return [];
    const articles: NewsArticle[] = await res.json();
    // Sort by date descending
    return articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch {
    return [];
  }
}

/** Get a single article by ID */
export async function fetchNewsArticleById(
  locale: "it" | "en",
  id: string
): Promise<NewsArticle | null> {
  const articles = await fetchNewsArticles(locale);
  return articles.find((a) => a.id === id) ?? null;
}

/** Get all article IDs (for generateStaticParams) */
export async function fetchNewsArticleIds(
  locale: "it" | "en"
): Promise<string[]> {
  const articles = await fetchNewsArticles(locale);
  return articles.map((a) => a.id);
}
