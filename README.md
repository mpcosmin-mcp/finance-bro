# Finance Bro — Calculator FIRE

Calculator de libertate financiara (FIRE — Financial Independence, Retire Early) pentru audienta din Romania. Iti arata:

- **Capitalul de care ai nevoie** ca sa-ti acoperi cheltuielile lunare din randamentul real al investitiilor
- **Cat dureaza sa ajungi acolo** in functie de economiile tale lunare, cu si fara investitii
- **Split-ul surselor de venit** la retragere (Pilon 1 / 2 / 3 pensie + investitii)
- **Fond de urgenta** recomandat, cu dobanda estimata

Rescris in web dupa un Excel FIRE existent — vezi [`docs/FIRE plan.xlsx`](docs/FIRE%20plan.xlsx) pentru versiunea originala.

## Stack

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS**
- **shadcn/ui** (Radix + Lucide)
- **Recharts** pentru graficul de evolutie a portofoliului
- Logica financiara izolata in [`src/lib/fire.ts`](src/lib/fire.ts) — functii pure, usor de testat si reutilizat in modulele viitoare

## Development

```bash
npm install
npm run dev
# http://localhost:3000
```

Build productie:

```bash
npm run build
npm start
```

## Structura

```
src/
  app/                    # Next.js App Router (layout + page)
  components/
    fire-calculator.tsx   # Componenta principala
    ui/                   # shadcn/ui primitives
  lib/
    fire.ts               # Formule FIRE (pure functions)
    format.ts             # Formatare RON / EUR / %
    utils.ts              # cn() helper
docs/
  FIRE plan.xlsx          # Excel original (referinta)
```

## Formula principala

Capitalul necesar pentru a sustine un venit lunar pasiv:

```
capital = (venit_lunar × 12) / randament_real
randament_real = randament_nominal - inflatie
```

Timpul pana la capitalul tinta, contribuind lunar si capitalizand randamentul:

```
luni = ln(1 + capital × r / economii_lunare) / ln(1 + r)
r = randament_real / 12
```

(echivalentul functiei Excel `NPER`)

## Roadmap

- [x] **v1** — Calculator FIRE static (acum)
- [ ] **v2** — Platforma de tracking investitii (ETF, bonds, crypto, imobiliare) cu randament anual
- [ ] Auth + persistare cont utilizator
- [ ] Dashboard consultant cu mai multi clienti

## Deploy

Orice platforma care ruleaza Next.js. Recomandat: [Vercel](https://vercel.com) (zero config + preview deployments per PR).

---

*Estimari informative. Nu constituie sfat financiar.*
