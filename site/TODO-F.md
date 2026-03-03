# TODO-F: Fix Hero z-index + ParticleField pointer-events

> PARALLEL-SAFE: tocca SOLO:
> - src/components/ui/particle-field.tsx
> - src/components/sections-v4/hero.tsx

## Problema

ParticleField ha `pointer-events-auto` sul canvas per intercettare mousemove (effetto slingshot).
Ma il canvas è `absolute inset-0` senza z-index esplicito, e il contenuto hero ha `z-[2]`.

In alcuni browser il canvas assorbe i click rendendo impossibile cliccare i CTA hero
("Prenota una call" e "Vedi i risultati") quando il cursore è sopra una particella.

## Task 1 — Fix pointer-events in particle-field.tsx

Il canvas deve:
- Ricevere mousemove (per effetto slingshot) ✅
- NON bloccare click sugli elementi sottostanti

Cambia il canvas da `pointer-events-auto` a `pointer-events-none` e usa un
event listener globale sul parent invece del canvas diretto:

In `particle-field.tsx`, cambia:
```tsx
// PRIMA:
canvas.addEventListener("mousemove", handleMouse);
canvas.addEventListener("mouseleave", handleLeave);

// DOPO:
const parent = canvas.parentElement;
if (parent) {
  parent.addEventListener("mousemove", handleMouse);
  parent.addEventListener("mouseleave", handleLeave);
}
```

E nel cleanup:
```tsx
// PRIMA:
canvas.removeEventListener("mousemove", handleMouse);
canvas.removeEventListener("mouseleave", handleLeave);

// DOPO:
parent?.removeEventListener("mousemove", handleMouse);
parent?.removeEventListener("mouseleave", handleLeave);
```

E cambia la className del canvas:
```tsx
// PRIMA:
className={`pointer-events-auto absolute inset-0 ${className}`}

// DOPO:
className={`pointer-events-none absolute inset-0 ${className}`}
```

Questo fa passare il mousemove attraverso il parent (che lo riceve comunque)
ma i click passano attraverso il canvas fino ai bottoni sottostanti.

## Task 2 — Verifica hero cliccabilità

In `hero.tsx`, verifica che i link CTA siano cliccabili.
Il contenuto è `z-[2]` e il canvas non ha z-index → OK, contenuto sta sopra.
Ma assicurati che `pointer-events-none` sul canvas non rompa nulla.

## Task 3 — Verifica

```bash
npx tsc --noEmit
npm run build
```
