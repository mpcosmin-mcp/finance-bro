# Raport de activitate — Finance Bro

Document client-facing cu orele lucrate si livrabilele. Trimite-l ca atasament
sau exporta in PDF (`Print → Save as PDF` din browser pe fisierul acesta).

---

**Prestator:** Moga Cosmin Petrica
**Email:** mpcosmin@gmail.com
**LinkedIn:** https://www.linkedin.com/in/cosmin-moga-465b2ab2/

**Proiect:** Finance Bro — calculator FIRE (web app)
**Perioada:** 22 aprilie 2026 — sprint initial v1 + v1.1
**Onorariu:** 100 RON / ora (rata de inceput, fara TVA)

---

## Sumar facturabil

| Metric              | Valoare            |
| ------------------- | ------------------ |
| Ore lucrate         | **19,00 h**        |
| Onorariu total      | **1.900 RON**      |
| Echivalent EUR      | **~381 EUR** (la 4,98) |
| Costuri infra       | 0 RON (Vercel Hobby + GitHub free) |

---

## Activitati livrate

### 1. Analiza & transpunere matematica FIRE (1,0 h · 100 RON)
- Studiat modelul Excel `FIRE plan.xlsx` primit de la consultant.
- Transpunere formule in TypeScript (`src/lib/fire.ts`): capital necesar,
  fond de urgenta, randament real, NPER pentru timp pana la tinta.

### 2. Dezvoltare calculator v1 (5,0 h · 500 RON)
- UI interactiv cu parametri editabili live (shadcn/ui + Tailwind).
- KPI cards: capital necesar (RON + EUR), fond urgenta, venit pasiv.
- Tabel scenarii editabil cu calcul automat ani cu/fara investitii.
- Grafic evolutie capital in timp (Recharts AreaChart cu referinta tinta).
- Formatari localizate ro-RO pentru RON, EUR si procente.

### 3. Testare & CI (1,5 h · 150 RON)
- 14 teste unitare Vitest care blocheaza paritatea cu Excel-ul original
  (orice modificare care strica valorile va esua la CI).
- GitHub Actions: typecheck + lint + test + build la fiecare PR.
- Dependabot (update-uri saptamanale de securitate pentru dependente).

### 4. UX mobil & SEO (4,0 h · 400 RON)
- Layout responsive: card-uri pe mobil (< 768px), tabele pe desktop.
- Fix overflow orizontal la 375px, spacing revizuit pe toate breakpoint-urile.
- SEO complet: metadata OpenGraph + Twitter, favicon SVG, `robots.txt`,
  `sitemap.xml`, OG image dinamica 1200x630 generata la edge.

### 5. Legal & compliance RO (1,5 h · 150 RON)
- Pagina `/termeni` cu 6 sectiuni: natura serviciului, disclaimer
  randamente, date & confidentialitate, IP, solutionare disputa ANPC
  (SAL + SOL conform OG 38/2015), contact.
- Footer global cu disclaimer persistent pe toate paginile.

### 6. UX fix editare numere + GEO (AI discovery) (2,5 h · 250 RON)
- Fix bug editare numere: inainte nu puteai sterge complet valoarea unui
  input; acum permite clear + retype curat.
- JSON-LD schema.org (`WebApplication` + `FAQPage` cu 5 intrebari RO)
  pentru motoarele AI (ChatGPT, Perplexity, Google AI Overviews).
- `public/llms.txt` — standard emergent pentru crawler-e LLM cu descriere
  aplicatie, ipoteze, limitari si autor.

### 7. Atribuire autor & contact (0,5 h · 50 RON)
- Semnatura "construit de Moga Cosmin Petrica" in footer cu link LinkedIn.
- Buton Contact mailto in footer.
- Sectiune dedicata in `/termeni` cu email, LinkedIn, GitHub Issues.
- Autor in metadata Next.js + JSON-LD Person (`author` / `creator` /
  `publisher` cu `sameAs` LinkedIn + GitHub).

### 8. Documentatie & tracking (3,0 h · 300 RON)
- `README.md` customer-ready cu demo live si descriere functionalitate.
- `SPRINT.md` backlog prioritizat (P0/P1/P2) pentru iteratii viitoare.
- `WORKLOG.md` — ledger intern cu ore si valoare per commit.
- `RAPORT_ACTIVITATE.md` — document curent, client-facing.

---

## Livrabile finale

| Livrabil              | Stare       | Link                                                      |
| --------------------- | ----------- | --------------------------------------------------------- |
| Aplicatie live        | Publicat    | https://finance-bro-nine.vercel.app                       |
| Cod sursa             | Public      | https://github.com/mpcosmin-mcp/finance-bro               |
| Termeni & disclaimer  | Publicat    | https://finance-bro-nine.vercel.app/termeni               |
| Deploy automat        | Activ       | Vercel — push pe `main` → live in ~60s                    |
| Teste automate        | 14/14 trec  | GitHub Actions la fiecare PR                              |

---

## Note contractuale

- Onorariul de **100 RON/ora** este o rata de start. Pentru sprint-uri
  viitoare mai complexe (autentificare, baza de date, integrare broker)
  se poate revizui.
- **Fara TVA** in aceasta faza.
- Hosting gratuit cat timp ramanem pe Vercel Hobby. Daca aplicatia
  devine comerciala (monetizare, publicitate), trebuie Vercel Pro
  (~100 RON/luna).
- Codul sursa este public pe GitHub; continutul, designul si brandul
  Finance Bro raman proprietatea autorului (Moga Cosmin Petrica).

---

*Document generat 22 aprilie 2026. Toate orele sunt estimate si
auditabile din istoricul Git al proiectului (WORKLOG.md).*
