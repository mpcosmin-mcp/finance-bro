# Finance Bro — Calculator FIRE

> Calculator de libertate financiara (FIRE — *Financial Independence, Retire Early*) pentru audienta din Romania.

**Live demo:** _coming soon (Vercel deploy)_
**Repository:** [github.com/mpcosmin-mcp/finance-bro](https://github.com/mpcosmin-mcp/finance-bro)

---

## Ce face

Raspunde la trei intrebari simple pentru oricine vrea sa stie de cati bani are nevoie ca sa fie liber financiar:

1. **Cat capital imi trebuie investit** ca sa-mi acopere cheltuielile lunare din randamentul real?
2. **In cat timp ajung acolo**, in functie de economiile mele lunare, cu si fara investitii?
3. **Cum se imparte venitul la retragere** intre Pilon 1 / 2 / 3 pensie + investitii?

Include fond de urgenta, curs EUR/RON, randament real (corectat cu inflatia) si un grafic al evolutiei portofoliului pe toate scenariile.

## Screenshots

_TODO: adauga captura pagina principala dupa deploy._

## Stack

- **[Next.js 15](https://nextjs.org)** (App Router) + **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** + **[shadcn/ui](https://ui.shadcn.com)** (Radix + Lucide)
- **[Recharts](https://recharts.org)** pentru graficul de evolutie
- Logica financiara izolata in [`src/lib/fire.ts`](src/lib/fire.ts) — functii pure, usor testabile si reutilizabile

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Structura

```
src/
  app/                      # Next.js App Router
    layout.tsx              #  - root layout
    page.tsx                #  - home (monteaza calculatorul)
    globals.css             #  - Tailwind + CSS variables pentru shadcn
  components/
    fire-calculator.tsx     # Componenta principala
    ui/                     # shadcn/ui primitives (button, card, input, ...)
  lib/
    fire.ts                 # Formule FIRE (pure functions)
    format.ts               # Formatare RON / EUR / %
    utils.ts                # cn() helper
docs/
  FIRE plan.xlsx            # Excel original (referinta)
SPRINT.md                   # Planul de v1 spre productie
```

## Formula principala

Capitalul necesar pentru a sustine venitul lunar pasiv din investitii:

```
capital = (venit_lunar × 12) / randament_real
randament_real = randament_nominal − inflatie
```

Timpul pana la capitalul tinta, contribuind lunar si capitalizand randamentul (echivalent Excel `NPER`):

```
luni = ln(1 + capital × r / economii_lunare) / ln(1 + r)
r = randament_real / 12
```

## Roadmap

- [x] **v1.0** — Calculator FIRE static (acum)
- [ ] **v1.1** — Productie-ready (vezi [SPRINT.md](SPRINT.md))
- [ ] **v2** — Platforma de tracking investitii (ETF, bonds, crypto, imobiliare) cu randament anual si portofoliu
- [ ] Auth + cont utilizator
- [ ] Dashboard consultant cu clientii sai

## Deploy

Zero-config pe [Vercel](https://vercel.com) — import repo, click Deploy, primesti URL `finance-bro.vercel.app`. Fiecare commit → deploy automat + preview links per branch.

## Licenta

Proprietar — toate drepturile rezervate.

---

*Estimari informative. Nu constituie sfat financiar. Consulta un specialist inainte de a lua decizii financiare majore.*
