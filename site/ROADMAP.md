# ROADMAP — K-Marketing Site

> Ultimo aggiornamento: 2 marzo 2026

## Legenda stato
- [x] Completato
- [ ] Da fare
- [~] In corso

---

## Fase 1 — Core del sito (COMPLETATA)

- [x] Struttura Next.js 14 + TypeScript + Tailwind
- [x] App Router con layout per locale
- [x] Homepage (hero + particle field + ticker + servizi + CTA)
- [x] Pagina Servizi
- [x] Pagina Chi Siamo
- [x] Pagina Contatti + form (Zod, honeypot, rate limit)
- [x] 6 Casi Studio con dati reali + pagine dettaglio dinamiche
- [x] i18n completo italiano/inglese (next-intl, messages/*.json)
- [x] Pagine legal: Privacy, Cookies, Termini
- [x] Dark mode con persistenza localStorage
- [x] Header + Footer responsive
- [x] SEO: sitemap.ts, robots.ts, metadata per pagina, hreflang
- [x] API route /api/contact con notifica Telegram
- [x] Obfuscation email/telefono nel footer (anti-scraping)
- [x] Fix pointer-events ParticleField (TODO-F)
- [x] Sitemap legal + console.warn condizionale + escape MarkdownV2 (TODO-G)

---

## Fase 2 — Asset e contenuti visivi

- [ ] Aggiungere immagini reali casi studio in `public/images/cases/`
  - [ ] i-peruvia.jpg
  - [ ] charme-extensions.jpg
  - [ ] nemesis.jpg
  - [ ] bottega-matta.jpg
  - [ ] villa-riviera.jpg
  - [ ] auto-brescia.jpg
- [ ] Open Graph image personalizzata (verifica `opengraph-image.tsx`)
- [ ] Favicon multi-formato (apple-touch-icon, favicon.ico, ecc.)
- [ ] Immagini/illustrazioni per la pagina Servizi
- [ ] Foto team per la pagina Chi Siamo (se previsto)

---

## Fase 3 — Blog / Contenuti

- [ ] Definire sistema blog (MDX locale vs CMS headless)
- [ ] Implementare pagina lista articoli `/blog`
- [ ] Implementare pagina dettaglio articolo `/blog/[slug]`
- [ ] Aggiungere blog alla sitemap
- [ ] Scrivere primi 3-5 articoli seed

---

## Fase 4 — Analytics e tracking

- [ ] Scegliere soluzione analytics (Plausible / Vercel Analytics / GA4)
- [ ] Implementare tracking rispettando GDPR
- [ ] Cookie banner con consenso (se analytics third-party)
- [ ] Tracking conversioni form contatto
- [ ] Collegamento Google Search Console

---

## Fase 5 — Produzione e deploy

- [ ] Configurare variabili d'ambiente produzione:
  - [ ] `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`
  - [ ] `NEXT_PUBLIC_EMAILJS_*` (fallback)
  - [ ] `SITE_URL` definitivo
- [ ] Deploy su Vercel (o hosting scelto)
- [ ] Configurazione dominio personalizzato
- [ ] Certificato SSL (automatico su Vercel)
- [ ] Test cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Lighthouse audit (performance, accessibility, SEO)
- [ ] Redirect da vecchio sito Altervista (se necessario)

---

## Fase 6 — Miglioramenti futuri

- [ ] Animazioni di scroll (Framer Motion InView)
- [ ] Pagina 404 personalizzata con grafica
- [ ] Schema.org structured data (LocalBusiness, FAQPage)
- [ ] Web Vitals monitoring
- [ ] A/B testing CTA
- [ ] Testimonianze clienti (sezione dedicata o integrata)
- [ ] Portfolio/gallery espandibile
- [ ] Newsletter signup (se previsto)

---

## Note

- I file `TODO-F.md` e `TODO-G.md` possono essere eliminati (task completati)
- Stack: Next.js 14 | React 18 | TypeScript | Tailwind 3 | Framer Motion | Zod | next-intl
- Design system: Navy #060724, Orange #ff6700, Plus Jakarta Sans
- Repo: https://github.com/Code-Wizard-IT/k-marketing.git
