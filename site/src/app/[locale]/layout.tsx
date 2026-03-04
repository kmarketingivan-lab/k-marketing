import { NextIntlClientProvider, useMessages } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "../../../routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SetLang } from "@/components/set-lang";
import { CookieConsentProvider } from "@/components/cookie-consent-provider";
import { CookieBanner } from "@/components/cookie-banner";
import { GoogleAnalytics } from "@/components/google-analytics";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Blocking script: set correct lang attribute before paint (SEO: crawlers see correct lang) */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${locale}"`,
        }}
      />
      <SetLang locale={locale} />
      <ThemeProvider>
        <CookieConsentProvider>
          <Header />
          <main id="main-content" className="animate-fade-in pt-16 md:pt-20">{children}</main>
          <Footer />
          <CookieBanner />
          <GoogleAnalytics />
        </CookieConsentProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
