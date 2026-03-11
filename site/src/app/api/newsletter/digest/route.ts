import { NextRequest, NextResponse } from "next/server";
import { fetchNewsArticles, NEWS_CATEGORIES, type NewsArticle } from "@/lib/news-feed";

/**
 * POST /api/newsletter/digest
 * Body: { locale?: "it" | "en", limit?: number }
 *
 * Returns a ready-to-send newsletter digest with the latest marketing news.
 * Output: { subject, html, text, articles }
 *
 * Use this endpoint to generate newsletter content that can be sent via
 * any email provider (Mailchimp, Brevo, Resend, etc.).
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const locale = (body.locale ?? "it") as "it" | "en";
  const limit = Math.min(Number(body.limit ?? 5), 10);

  const articles = await fetchNewsArticles(locale);
  const top = articles.slice(0, limit);

  if (top.length === 0) {
    return NextResponse.json({ error: "no_articles" }, { status: 404 });
  }

  const isIt = locale === "it";
  const today = new Date().toLocaleDateString(isIt ? "it-IT" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const subject = isIt
    ? `K-Marketing Weekly — Le news dal marketing digitale (${today})`
    : `K-Marketing Weekly — Digital marketing news (${today})`;

  const html = generateHtml(top, locale, today);
  const text = generateText(top, locale, today);

  return NextResponse.json({
    subject,
    html,
    text,
    articles: top,
    generated_at: new Date().toISOString(),
  });
}

function generateHtml(
  articles: NewsArticle[],
  locale: "it" | "en",
  date: string
): string {
  const isIt = locale === "it";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://k-marketing.it";

  const articleRows = articles
    .map((a) => {
      const catLabel =
        NEWS_CATEGORIES[a.category]?.[locale] ?? a.category;
      return `
      <tr>
        <td style="padding: 20px 0; border-bottom: 1px solid #e5e7eb;">
          ${a.image ? `<img src="${a.image}" alt="${a.title}" style="width:100%;max-height:200px;object-fit:cover;border-radius:8px;margin-bottom:12px;" />` : ""}
          <span style="display:inline-block;background:#fff3e8;color:#ff6700;font-size:11px;font-weight:600;padding:2px 8px;border-radius:12px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">${catLabel}</span>
          <h3 style="margin:8px 0 6px;font-size:18px;color:#060724;">
            <a href="${siteUrl}/${locale === "en" ? "en/" : ""}blog/news/${a.id}" style="color:#060724;text-decoration:none;">${a.title}</a>
          </h3>
          <p style="margin:0 0 8px;font-size:14px;color:#6b7280;line-height:1.6;">${a.excerpt}</p>
          <a href="${siteUrl}/${locale === "en" ? "en/" : ""}blog/news/${a.id}" style="font-size:13px;color:#ff6700;text-decoration:none;font-weight:600;">${isIt ? "Leggi di più →" : "Read more →"}</a>
        </td>
      </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background:#060724;padding:32px 24px;text-align:center;">
            <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:12px;">
              <div style="background:#ff6700;color:#fff;font-weight:800;font-size:18px;width:36px;height:36px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;">K</div>
              <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.5px;">Marketing</span>
            </div>
            <h1 style="margin:12px 0 4px;color:#ffffff;font-size:22px;font-weight:600;">${isIt ? "News dal marketing digitale" : "Digital marketing news"}</h1>
            <p style="margin:0;color:rgba(255,255,255,0.5);font-size:13px;">${date}</p>
          </td>
        </tr>
        <!-- Articles -->
        <tr>
          <td style="padding:8px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${articleRows}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0 0 8px;font-size:12px;color:#9ca3af;">${isIt ? "Ricevi questa email perché ti sei iscritto alla newsletter di K-Marketing." : "You receive this email because you subscribed to the K-Marketing newsletter."}</p>
            <a href="${siteUrl}" style="font-size:12px;color:#ff6700;text-decoration:none;">k-marketing.it</a>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function generateText(
  articles: NewsArticle[],
  locale: "it" | "en",
  date: string
): string {
  const isIt = locale === "it";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://k-marketing.it";

  const header = isIt
    ? `K-MARKETING — News dal marketing digitale\n${date}\n${"=".repeat(50)}\n`
    : `K-MARKETING — Digital marketing news\n${date}\n${"=".repeat(50)}\n`;

  const body = articles
    .map((a, i) => {
      const catLabel =
        NEWS_CATEGORIES[a.category]?.[locale] ?? a.category;
      return `${i + 1}. [${catLabel}] ${a.title}\n   ${a.excerpt}\n   ${siteUrl}/${locale === "en" ? "en/" : ""}blog/news/${a.id}\n`;
    })
    .join("\n");

  const footer = isIt
    ? `\n---\nk-marketing.it | Brescia, Italia`
    : `\n---\nk-marketing.it | Brescia, Italy`;

  return header + body + footer;
}
