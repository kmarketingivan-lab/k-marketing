import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().max(200),
});

// Simple in-memory rate limit
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

export async function POST(req: NextRequest) {
  try {
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
    const { email } = parsed.data;

    // Notify via Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const text = [
        "📬 *Nuova iscrizione newsletter*",
        "",
        `📧 *Email:* ${escapeMarkdown(email)}`,
        `📅 *Data:* ${new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" })}`,
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
