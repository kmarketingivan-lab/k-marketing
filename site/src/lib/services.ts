export const SERVICE_SLUGS = [
  "seo-brescia",
  "pubblicita-online-brescia",
  "siti-internet-brescia",
  "social-media-brescia",
  "automazione-ai-brescia",
  "content-marketing-brescia",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/** Map slug → service key used in messages */
export const slugToServiceKey: Record<ServiceSlug, string> = {
  "seo-brescia": "seo",
  "pubblicita-online-brescia": "ads",
  "siti-internet-brescia": "web",
  "social-media-brescia": "social",
  "automazione-ai-brescia": "ai",
  "content-marketing-brescia": "content",
};
