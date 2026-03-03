/** Google Analytics 4 helpers and type declarations */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type GtagCommand = "config" | "event" | "js" | "consent" | "set";

declare global {
  interface Window {
    gtag: (command: GtagCommand, ...args: unknown[]) => void;
    dataLayer: Record<string, unknown>[];
  }
}

/** Track a page view */
export function pageview(url: string): void {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

/** Track a custom event */
export function event(
  action: string,
  params: Record<string, unknown> = {},
): void {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  window.gtag("event", action, params);
}
