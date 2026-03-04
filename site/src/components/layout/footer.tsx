import { useTranslations } from "next-intl";
import { Link } from "@/../../navigation";
import { SITE } from "@/lib/constants";
import { ObfuscatedContact } from "./obfuscated-contact";
import { CookieSettingsButton } from "./cookie-settings-button";

export function Footer() {
  const t = useTranslations("footer");
  const ts = useTranslations("services");
  const tn = useTranslations("nav");

  const serviceKeys = ["seo", "social", "ads", "ai", "content", "web"] as const;

  return (
    <footer className="border-t border-gray-100/[0.06] bg-navy-900">
      <div className="container-custom py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-lg font-extrabold text-white">
                K
              </div>
              <span className="text-lg font-bold tracking-tight text-gray-100">Marketing</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-100/50">{t("tagline")}</p>
            <p className="text-sm text-gray-100/40">{t("location")}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-100/40">{t("nav")}</h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className="text-sm text-gray-100/60 transition-colors hover:text-orange-400">{tn("home")}</Link></li>
              <li><Link href="/servizi" className="text-sm text-gray-100/60 transition-colors hover:text-orange-400">{t("servicesTitle")}</Link></li>
              <li><Link href="/casi-studio" className="text-sm text-gray-100/60 transition-colors hover:text-orange-400">{tn("caseStudies")}</Link></li>
              <li><Link href="/chi-siamo" className="text-sm text-gray-100/60 transition-colors hover:text-orange-400">{tn("about")}</Link></li>
              <li><Link href="/contatti" className="text-sm text-gray-100/60 transition-colors hover:text-orange-400">{t("contactTitle")}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-100/40">{t("servicesTitle")}</h4>
            <ul className="space-y-2.5">
              {serviceKeys.map((key) => (
                <li key={key}><Link href="/servizi" className="text-sm text-gray-100/60 transition-colors hover:text-orange-400">{ts(`items.${key}.title`)}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-100/40">{t("contactTitle")}</h4>
            <ul className="space-y-2.5">
              <ObfuscatedContact />
              <li className="text-sm text-gray-100/60">{SITE.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-100/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-gray-100/30">{t("rights")}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-gray-100/30 transition-colors hover:text-gray-100/50">{t("privacy")}</Link>
            <Link href="/cookies" className="text-xs text-gray-100/30 transition-colors hover:text-gray-100/50">{t("cookies")}</Link>
            <Link href="/termini" className="text-xs text-gray-100/30 transition-colors hover:text-gray-100/50">{t("terms")}</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
