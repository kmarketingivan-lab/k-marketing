# TODO-G: Sitemap + Contact cleanup + Email obfuscation

> PARALLEL-SAFE: tocca SOLO:
> - src/app/sitemap.ts
> - src/lib/contact.ts
> - src/components/layout/footer.tsx (SOLO la sezione Contact)
> - src/app/api/contact/route.ts

## Task 1 — Aggiungi pagine legal alla sitemap

In `src/app/sitemap.ts`, aggiungi `/privacy`, `/cookies`, `/termini` a `staticRoutes`:

```ts
const staticRoutes = [
  "",
  "/servizi",
  "/casi-studio",
  "/chi-siamo",
  "/contatti",
  "/privacy",
  "/cookies",
  "/termini",
];
```

Le pagine legal devono avere `priority: 0.3` e `changeFrequency: "yearly"`.
Modifica il .map() per gestire priority diverse:

```ts
const itPages: MetadataRoute.Sitemap = staticRoutes.map((route) => {
  const isLegal = ["/privacy", "/cookies", "/termini"].includes(route);
  return {
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : isLegal ? "yearly" : "monthly",
    priority: route === "" ? 1 : isLegal ? 0.3 : 0.8,
    alternates: {
      languages: {
        it: `${SITE_URL}${route}`,
        en: `${SITE_URL}/en${route}`,
      },
    },
  };
});
```

Fai lo stesso per `enPages`.

## Task 2 — Condiziona console.warn in contact.ts

In `src/lib/contact.ts`, il `console.warn` a fine file appare in console utente in produzione
se EmailJS non è configurato. Wrappalo:

```ts
// PRIMA:
console.warn("[Contact] No channels configured, form submission simulated");

// DOPO:
if (process.env.NODE_ENV === "development") {
  console.warn("[Contact] No channels configured, form submission simulated");
}
```

## Task 3 — Email obfuscation nel footer

In `src/components/layout/footer.tsx`, email e telefono sono in chiaro nell'HTML:
```tsx
<a href={`mailto:${SITE.email}`}>...</a>
<a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>...</a>
```

I bot li scraperanno. Soluzione: renderizza email/telefono solo lato client.

Footer è già `"use client"` (usa useTranslations)? Verifica. Se sì, usa un pattern come:

```tsx
const [showContact, setShowContact] = useState(false);
useEffect(() => setShowContact(true), []);

// Poi nel render:
{showContact ? (
  <a href={`mailto:${SITE.email}`} className="...">{SITE.email}</a>
) : (
  <span className="...">info@...</span>
)}
```

Questo fa sì che i bot vedano solo "info@..." nel HTML statico,
mentre gli utenti reali vedono l'email completa dopo hydration.

Fai lo stesso per il telefono.

**NOTA:** Il footer potrebbe non avere `"use client"`. Se è un Server Component,
NON aggiungere useState. In quel caso, crea un piccolo componente client
`ObfuscatedContact` e usalo nel footer.

## Task 4 — Migliora escapeMarkdown in api/contact

In `src/app/api/contact/route.ts`, la regex escape per MarkdownV2 potrebbe
non coprire il carattere "—" (em-dash) e altri Unicode.

Verifica che la regex includa tutti i caratteri richiesti da Telegram MarkdownV2:
```
_ * [ ] ( ) ~ ` > # + - = | { } . !
```

La regex attuale è:
```ts
return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
```

Questo è corretto per i caratteri base. Aggiungi solo un safety check:
- Il trattino "—" (em-dash, U+2014) NON serve escape
- Il backslash `\\` è già nella regex ✅

Nessuna modifica necessaria se la regex è come sopra. Solo verifica.

## Task 5 — Verifica

```bash
npx tsc --noEmit
npm run build
```
