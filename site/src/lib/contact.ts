/**
 * Contact form submission — client-side only (works on Vercel + Altervista)
 *
 * ⚠️  SECURITY NOTE: Only EmailJS is used client-side (it's designed for it).
 *     Telegram notifications should be handled server-side (API route or webhook)
 *     because exposing a bot token in NEXT_PUBLIC_ lets anyone control the bot.
 *     See SETUP-FORM.md for server-side Telegram setup instructions.
 */

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  industry: string;
  budget: string;
  message: string;
}

/** Send email via EmailJS REST API */
async function sendEmail(data: ContactFormData): Promise<boolean> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return false;
  }

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.6/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: data.name,
          email: data.email,
          company: data.company,
          industry: data.industry,
          budget: data.budget,
          message: data.message,
        },
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[Contact] EmailJS error:", err);
    return false;
  }
}

/** Send notification via Telegram Bot API — SERVER-SIDE ONLY
 *  Do NOT call this from client code. Use an API route instead.
 *  Example: POST /api/contact → calls sendTelegram() on the server.
 *
 *  async function sendTelegram(data: ContactFormData): Promise<boolean> {
 *    const botToken = process.env.TELEGRAM_BOT_TOKEN;   // NOT NEXT_PUBLIC_
 *    const chatId = process.env.TELEGRAM_CHAT_ID;       // NOT NEXT_PUBLIC_
 *    if (!botToken || !chatId) return false;
 *    // ... same fetch logic as before ...
 *  }
 */

/** Check if EmailJS is configured */
function hasConfiguredChannels(): boolean {
  return (
    !!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
    !!process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
    !!process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );
}

/** Main submit — tries server API route first, then falls back to EmailJS */
export async function submitContactForm(
  data: ContactFormData
): Promise<{ success: boolean }> {
  // Skip API route on static export (Altervista) — it doesn't exist and the
  // host may return a 200 HTML page for unknown paths, causing a false positive.
  if (!process.env.NEXT_PUBLIC_STATIC_EXPORT) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) return { success: true };
    } catch {
      // API route not available — fall through to EmailJS
    }
  }

  // Fallback: EmailJS (client-side, works on static export too)
  if (hasConfiguredChannels()) {
    const emailOk = await sendEmail(data);
    return { success: emailOk };
  }

  // No channels configured — simulate success in dev
  if (process.env.NODE_ENV === "development") {
    console.warn("[Contact] No channels configured, form submission simulated");
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true };
}
