import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  company: z.string().max(200).optional().default(""),
  industry: z.string().max(100).optional().default(""),
  budget: z.string().max(50).optional().default(""),
  howFound: z.string().max(100).optional().default(""),
  message: z.string().min(20).max(5000),
});

// Simple in-memory rate limit (resets on cold start, good enough)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const lastSubmit = rateLimitMap.get(ip) ?? 0;
    if (Date.now() - lastSubmit < RATE_LIMIT_MS) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "validation_failed" },
        { status: 400 }
      );
    }

    rateLimitMap.set(ip, Date.now());
    const data = parsed.data;

    // Send Telegram notification
    const botToken = process.env.TELEGRAM_BOT_TOKEN; // NOT NEXT_PUBLIC_!
    const chatId = process.env.TELEGRAM_CHAT_ID; // NOT NEXT_PUBLIC_!

    if (botToken && chatId) {
      const text = [
        "📩 *Nuovo contatto da k\\-marketing\\.it*",
        "",
        `👤 *Nome:* ${escapeMarkdown(data.name)}`,
        `📧 *Email:* ${escapeMarkdown(data.email)}`,
        `🏢 *Azienda:* ${escapeMarkdown(data.company || "—")}`,
        `📂 *Settore:* ${escapeMarkdown(data.industry || "—")}`,
        `💰 *Budget:* ${escapeMarkdown(data.budget || "—")}`,
        `🔍 *Come trovato:* ${escapeMarkdown(data.howFound || "—")}`,
        "",
        `💬 *Messaggio:*`,
        escapeMarkdown(data.message),
      ].join("\n");

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "MarkdownV2",
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
