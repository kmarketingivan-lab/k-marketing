# CLAUDE.md — Contesto progetto K-Marketing

## Stack
- Next.js 14 + TypeScript + Tailwind CSS 3 + next-intl (i18n)
- Framer Motion per animazioni
- Zod per validazione form
- Design: Navy #060724, Orange #ff6700, Plus Jakarta Sans

## Struttura attiva (SOLO queste cartelle contengono codice in uso)
- `src/app/` — pages + layouts (App Router)
- `src/components/sections-v4/` — sezioni homepage v4 (ATTIVA)
- `src/components/layout/` — header + footer
- `src/components/forms/` — contact form
- `src/components/ui/` — button, particle-field
- `src/components/theme-provider.tsx` — dark/light mode
- `src/components/set-lang.tsx` — imposta document.lang
- `src/lib/` — constants, contact, case-studies, utils
- `messages/` — it.json, en.json
- `navigation.ts`, `routing.ts`, `i18n.ts`

## ⚠️ NON toccare questi file (usati da altri TODO in parallelo)
Ogni TODO ha la sua lista esclusiva di file. Rispettala.

## Regole
- Tutti i testi UI devono venire da messages/*.json (mai hardcoded)
- Dark mode: usa `dark:` prefix (class strategy)
- Body bg: `bg-gray-50 dark:bg-navy-800`
- Verifica build con `npx tsc --noEmit && npm run build` alla fine
