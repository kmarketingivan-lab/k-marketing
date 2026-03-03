"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/../../navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { SITE } from "@/lib/constants";

function FlagIT({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className}>
      <rect width="213.3" height="480" fill="#009246" />
      <rect x="213.3" width="213.4" height="480" fill="#fff" />
      <rect x="426.7" width="213.3" height="480" fill="#ce2b37" />
    </svg>
  );
}

function FlagGB({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" className={className}>
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
      <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
      <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
      <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
    </svg>
  );
}

const languages = [
  { code: "it", label: "Italiano", Flag: FlagIT },
  { code: "en", label: "English", Flag: FlagGB },
];

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, mounted, toggleTheme } = useTheme();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/servizi", label: t("services") },
    { href: "/casi-studio", label: t("caseStudies") },
    { href: "/chi-siamo", label: t("about") },
  ];

  const currentLang = languages.find((l) => l.code === locale) ?? languages[0]!;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-navy-800 transition-all duration-300",
        scrolled && "border-b border-gray-100/[0.06] shadow-lg",
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-orange-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <div className="container-custom flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-lg font-extrabold text-white">
            K
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-100">Marketing</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-orange-400"
                  : "text-gray-100/60 hover:text-gray-100",
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* Language Dropdown */}
          <div ref={langRef} className="relative ml-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-gray-100/60 transition-colors hover:bg-gray-100/10 hover:text-gray-100"
              aria-label="Language"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <currentLang.Flag className="h-4 w-5 rounded-[2px]" />
              <span className="text-xs font-medium">{currentLang.code.toUpperCase()}</span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                className={cn("transition-transform duration-200", langOpen && "rotate-180")}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1 min-w-[140px] overflow-hidden rounded-lg border border-gray-100/[0.08] bg-navy-800 shadow-lg">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={pathname}
                    locale={lang.code}
                    onClick={() => setLangOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 px-3.5 py-2.5 text-sm transition-colors",
                      locale === lang.code
                        ? "bg-orange-500/10 font-medium text-orange-500"
                        : "text-gray-100/70 hover:bg-gray-100/5",
                    )}
                  >
                    <lang.Flag className="h-4 w-5 rounded-[2px]" />
                    <span>{lang.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-md text-gray-100/50 transition-colors hover:bg-gray-100/10 hover:text-gray-100"
            aria-label="Toggle theme"
          >
            {!mounted ? (
              <span className="h-[18px] w-[18px]" />
            ) : theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* CTA */}
          <Button variant="primary" size="sm" className="ml-3" asChild>
            <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">{t("cta")}</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-gray-100 transition-colors hover:bg-gray-100/10 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100/[0.06] bg-navy-800/95 backdrop-blur-xl md:hidden">
          <nav className="container-custom flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-orange-500/10 text-orange-400"
                    : "text-gray-100/60 hover:bg-gray-100/5 hover:text-gray-100",
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile language + theme + CTA */}
            <div className="mt-2 flex items-center gap-3 border-t border-gray-100/[0.06] pt-4">
              <div className="flex overflow-hidden rounded-md border border-gray-100/[0.08]">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={pathname}
                    locale={lang.code}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors",
                      locale === lang.code
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-gray-100/50 hover:bg-gray-100/5",
                    )}
                  >
                    <lang.Flag className="h-3.5 w-[18px] rounded-[2px]" />
                    <span>{lang.code.toUpperCase()}</span>
                  </Link>
                ))}
              </div>
              <button
                onClick={toggleTheme}
                className="flex h-9 w-9 items-center justify-center rounded-md text-gray-100/50 transition-colors hover:bg-gray-100/10 hover:text-gray-100"
                aria-label="Toggle theme"
              >
                {!mounted ? (
                  <span className="h-4 w-4" />
                ) : theme === "dark" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
              <Button variant="primary" size="sm" className="flex-1" asChild>
                <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer">{t("cta")}</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
