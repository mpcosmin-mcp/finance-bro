# Worklog & ROI Tracker — Finance Bro

Ledger intern al muncii livrate pe proiect. Fiecare commit primeste o intrare
cu ce s-a facut, timpul estimat si costul echivalent la rata convenita.

- **Rata curenta**: 100 RON / ora (rata de inceput, fara TVA). Urmareste
  in `RATE_RON` de mai jos orice schimbare de tarif si recalculeaza totalurile.
- **Monedele**: RON primar, EUR secundar la curs 4,98.
- **Autor**: Moga Cosmin Petrica (mpcosmin@gmail.com).
- **Client-facing**: vezi [RAPORT_ACTIVITATE.md](RAPORT_ACTIVITATE.md) pentru
  raportul pe care il trimiti clientului.

```
RATE_RON = 100
```

---

## Sumar

| Metric                 | Valoare     |
| ---------------------- | ----------- |
| Commit-uri livrate     | 8           |
| Ore estimate           | **19,00 h** |
| Valoare echivalenta    | **1.900 RON** (~381 EUR) |
| Cost infrastructura    | 0 RON (Vercel Hobby + GitHub free) |
| Net (valoare − cost)   | **1.900 RON** |

---

## Mini P&L

| Linie                                  | RON    |
| -------------------------------------- | ------ |
| Revenue echivalent (ore × rata)        | +1.900 |
| Hosting (Vercel Hobby)                 |      0 |
| Repo + CI (GitHub free + Actions free) |      0 |
| Domeniu custom                         |      0 |
| Analytics (Vercel, cookieless free)    |      0 |
| **Total costuri**                      |      0 |
| **Net**                                | **+1.900** |

> Note: Vercel Hobby e gratis pentru proiecte personale/non-comerciale. Daca
> proiectul devine monetizat va trebui Pro (~20 USD/luna / ~100 RON/luna).

---

## Log commit-uri

| Data       | Commit  | Titlu                                                       | Ore  | RON   |
| ---------- | ------- | ----------------------------------------------------------- | ---- | ----- |
| 2026-04-22 | 3a70c1b | Initial commit from Create Next App                         | 0,25 |    25 |
| 2026-04-22 | c0cd6d9 | feat: FIRE calculator v1                                    | 6,00 |   600 |
| 2026-04-22 | 7f67653 | docs: customer-ready README + SPRINT.md v1.1 backlog        | 1,00 |   100 |
| 2026-04-22 | 82e680c | feat(v1.1): mobile polish, SEO, legal, CI                   | 8,00 |   800 |
| 2026-04-22 | 09ac467 | feat: fix input editing + GEO (JSON-LD, llms.txt)           | 2,50 |   250 |
| 2026-04-22 | 5252ac2 | feat: atribuie autoratul proiectului lui Moga Cosmin Petrica | 0,50 |    50 |
| 2026-04-22 | 515ab51 | docs: worklog + ROI tracker per commit                      | 0,75 |    75 |
| 2026-04-22 | (curent)| docs: raport client + rata 100 RON/h                         | 0,00 |     0 |
|            |         | **Total**                                                   | **19,00** | **1.900** |

> Commit-ul curent (raport + rata) e livrat in cadrul orelor deja contorizate.

### Detaliu pe commit

#### [3a70c1b](https://github.com/mpcosmin-mcp/finance-bro/commit/3a70c1b) — scaffolding (0,25h · 25 RON)
- `npx create-next-app` + initializare repo.

#### [c0cd6d9](https://github.com/mpcosmin-mcp/finance-bro/commit/c0cd6d9) — FIRE calculator v1 (6h · 600 RON)
- Analiza `FIRE plan.xlsx` si transpunere matematica in `src/lib/fire.ts`.
- UI cu shadcn/ui: parametri, KPI cards, tabel scenarii, grafic Recharts.
- Wire-up live math cu `useMemo`, RON/EUR formatters, scenarii dinamice.

#### [7f67653](https://github.com/mpcosmin-mcp/finance-bro/commit/7f67653) — docs customer-ready (1h · 100 RON)
- `README.md` cu demo live + descriere produs.
- `SPRINT.md` cu backlog v1.1 (P0/P1/P2).

#### [82e680c](https://github.com/mpcosmin-mcp/finance-bro/commit/82e680c) — v1.1 polish (8h · 800 RON)
- Fix overflow mobile (375px), layout responsive, card scenarii pe mobil.
- SEO full: metadata, OG image dinamica edge, Twitter card, favicon SVG,
  robots.ts, sitemap.ts.
- Legal: `/termeni` cu 6 sectiuni, disclaimer ANPC SAL/SOL, `SiteFooter`.
- Vitest (14 teste paritate Excel), `.github/workflows/ci.yml`,
  Dependabot npm + gh-actions, Vercel Analytics.

#### [09ac467](https://github.com/mpcosmin-mcp/finance-bro/commit/09ac467) — input UX + GEO (2,5h · 250 RON)
- `NumericInput` primitive (string local state) — fix clear/retype bug.
- Refactor toate campurile numerice in calculator.
- JSON-LD `WebApplication` + `FAQPage` (schema.org).
- `public/llms.txt` pentru crawler-e AI.

#### [5252ac2](https://github.com/mpcosmin-mcp/finance-bro/commit/5252ac2) — autorat (0,5h · 50 RON)
- Footer cu semnatura + buton Contact mailto.
- `/termeni` sectiunea "Autor & contact".
- Metadata Next.js (`authors`, `creator`, `publisher`).
- JSON-LD Person + llms.txt sectiune autor.

#### [515ab51](https://github.com/mpcosmin-mcp/finance-bro/commit/515ab51) — worklog intern (0,75h · 75 RON)
- `WORKLOG.md` ledger + mini P&L + template pentru commit viitoare.

#### (curent) — raport client + rata 100 RON/h
- `RAPORT_ACTIVITATE.md` client-facing.
- Update rata la 100 RON/h, recalcul totaluri.

---

## Ghid estimare ore (pentru commit-urile viitoare)

| Tip munca                              | Timp tipic |
| -------------------------------------- | ---------- |
| Bugfix trivial / typo / config minor   | 0,25 h     |
| Refactor localizat, 1–2 fisiere        | 0,5–1 h    |
| Feature mic (componenta, endpoint)     | 1–2 h      |
| Feature mediu (mai multe fisiere)      | 2–4 h      |
| Feature mare (flow complet nou)        | 4–8 h      |
| Research + design de solutie           | 1–3 h      |
| Scris docs / README / continut         | 0,5–2 h    |

## Template entry nou

Copiaza la urmatorul commit:

```markdown
#### [<hash>](https://github.com/mpcosmin-mcp/finance-bro/commit/<hash>) — <titlu scurt> (<X>h · <Y> RON)
- Bullet 1 — ce s-a facut.
- Bullet 2 — de ce.
```

Si adauga un rand in tabelul de sumar + update la totaluri **si in
[RAPORT_ACTIVITATE.md](RAPORT_ACTIVITATE.md)** daca munca livreaza ceva
vizibil pentru client.
