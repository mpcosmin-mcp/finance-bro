# Sprint v1.1 — Drumul de la prototip la "gata de client"

Scop: dupa acest sprint, linkul poate fi trimis catre orice prospect, arata profesional, genereaza lead-uri pentru consultant si nu expune niciun risc (tehnic sau legal).

Legenda prioritati:
- **P0** — blocant pentru lansare (fara asta nu trimitem linkul)
- **P1** — impact direct asupra conversiei / perceptiei
- **P2** — nice-to-have, poate aluneca intr-un sprint urmator

---

## P0 · Blocante pentru lansare

### [ ] 1. Deploy pe Vercel + domeniu custom
- Conecteaza repo-ul GitHub la Vercel (zero config)
- URL initial: `finance-bro.vercel.app`
- Dupa validare: domeniu propriu (ex. `financebro.ro`) — cumparat de client sau de noi
- Activeaza Vercel Web Analytics (gratis, fara cookies)

### [ ] 2. SEO + Open Graph
- Titlu si description clare pe pagina
- `app/opengraph-image.png` — imagine 1200x630 care se vede cand linkul e distribuit pe WhatsApp / Facebook / LinkedIn
- `metadata.openGraph` si `metadata.twitter` populate in `layout.tsx`
- `robots.txt` + `sitemap.ts`
- Rezultat: cand consultantul trimite linkul, apare preview cu imagine si descriere

### [ ] 3. Favicon + branding minimal
- Inlocuieste favicon-ul default Next.js cu ceva care spune "Finance Bro"
- Logo text sau icon simplu in header
- Culoare accent consistenta

### [ ] 4. Disclaimer / termeni legali
- Pagina `/termeni` cu:
  - Nu suntem consultanti financiari (decat prin partenerul X)
  - Calculatorul e informativ, nu constituie sfat personalizat
  - Randamentele istorice nu garanteaza randamentele viitoare
  - Mentiune ANPC (obligatoriu in RO pentru servicii online)
- Link discret in footer
- **De ce P0**: protectie legala pentru un produs cu numere financiare

### [ ] 5. Cookie / privacy banner (daca avem analytics)
- Daca folosim Vercel Analytics fara cookies → nu e nevoie
- Daca adaugam orice tracking cu cookies → banner GDPR (ex. `cookieconsent`)
- Pagina scurta `/privacy`

### [ ] 6. Un test de sanatate pentru lib/fire.ts
- Un singur test care verifica ca iesirea functiei `calculeazaFire` cu valorile implicite din Excel produce aceleasi numere (capital 1.333.333 RON, scenariul 1 = 10.4 ani etc.)
- Vitest sau Node test runner, simplu
- **De ce**: daca cineva modifica formulele, prindem regresiile inainte de productie

### [ ] 7. GitHub Actions CI
- Workflow pe PR care face `npm ci && npm run build && npm test && npm run lint`
- Status check obligatoriu pe `main`
- Zero cost pe repo public

### [ ] 8. Dependabot / security audit
- Activeaza Dependabot in Settings → Security pentru update-uri automate la dependente
- Zero cost

---

## P1 · Conversie & perceptie

### [ ] 9. Lead capture CTA (cel mai important pentru bani)
- Sectiune "Vrei sa discutam planul tau personalizat?" sub rezultate
- Buton sau formular scurt (nume + email + telefon) care trimite catre consultant
- Variante:
  - **Simplu**: link `mailto:` sau buton "Rezerva consultatie" catre Calendly-ul consultantului
  - **Medium**: formular cu Resend / Formspree / Web3Forms → email catre consultant
  - **Premium**: salvat intr-un DB (Supabase / Neon) cu dashboard pentru consultant
- **De ce P1**: asta e motorul de monetizare — fara CTA, calculatorul e doar un tool gratis

### [ ] 10. Share scenariu prin URL
- Encode input-urile + scenariile in query string sau hash (ex. `/?s=eyJidWdldCI6MTAwMDB9`)
- Cand modifici inputs, URL-ul se update-aza (`router.replace`)
- La incarcare, daca exista `?s=...`, hidrata state-ul din URL
- **De ce**: utilizatorul poate trimite linkul cu configuratia lui catre consultant ("uite ce mi-a iesit")

### [ ] 11. Export PDF / print view
- Butonul "Exporta raport" → vedere de print cu toate rezultatele + scenariile + graficul
- CSS `@media print` care ascunde input-urile editabile si afiseaza valorile ca text
- Opusul: `react-to-print` sau `jsPDF`
- **De ce**: consultantul vrea sa ataseze rapoarte in mail-uri catre clientii lui

### [ ] 12. Polish mobile
- QA pe iPhone SE, iPhone 14, Android mediu
- Tabelul scenarii → card-uri stack pe mobile (nu scroll orizontal)
- Input-uri mari, tap-friendly
- Focus visible pe toate controalele

### [ ] 13. Mesaje de validare clare
- Daca `randament - inflatie <= 0` → explicatie: "Randamentul trebuie sa depaseasca inflatia"
- Daca procentele surselor nu fac 100% → deja avertizat, dar explica impactul
- Daca economii <= 0 → mesaj "Nu economisesti — ajustati venit sau cheltuieli"
- Input-uri fara "NaN RON" cand user-ul le goleste

### [ ] 14. Explicatie "Ce inseamna FIRE?"
- Sectiune introductiva (sub hero sau intr-un card dedicat) care educa:
  - Ce inseamna regula 4%
  - De ce folosim randament real, nu nominal
  - De ce avem nevoie de fond de urgenta
- 3-4 paragrafe scurte, ton prietenos
- **De ce**: audienta mass nu stie FIRE — fara educatie, calculul pare random

### [ ] 15. Tracking conversie
- Event-uri in Vercel Analytics sau Plausible:
  - `calculator_used` (primul input modificat)
  - `scenario_added`
  - `cta_clicked` (daca avem CTA)
- Stim ce functioneaza si ce nu

---

## P2 · Nice to have

### [ ] 16. Dark mode toggle
- CSS-ul suporta deja `.dark` (variabilele sunt acolo)
- Adauga un toggle si `next-themes`

### [ ] 17. i18n EN / RO
- `next-intl` sau `next-international`
- Expunere internationala, mai ales pt diaspora romana

### [ ] 18. Integrare curs BNR
- Inlocuieste `eurRonRate` hardcoded cu fetch zilnic din BNR
- API gratis, fara auth: `https://www.bnr.ro/nbrfxrates.xml`
- Cron Vercel sau server component cu revalidate 24h

### [ ] 19. Mai multe tipuri de randament
- Presetari: "conservator 6%", "balansat 9%", "agresiv 12%"
- Toggle "randament istoric S&P 500" (~10% nominal)

### [ ] 20. Simulare Monte Carlo
- In loc de randament fix, rulam 10000 simulari cu volatilitate
- Afisam probabilitatea de succes la varsta de retragere
- **De ce P2**: complex, dar diferentiator puternic pt v1.2

---

## Securitate si "safety"

### Starea actuala (v1.0)
- **Zero risc server-side**: aplicatia e 100% client-side, nu stocheaza nimic, nu trimite date, nu avem backend
- **Zero secret-uri**: nu exista API keys in cod, nu exista `.env`
- **Zero PII**: nu colectam nume, email, IP — calculatorul ruleaza in browserul utilizatorului

### Ce adaugam in sprint
- [x] ~~Dependabot activat~~ (P0 task 8)
- [x] ~~CI cu `npm audit` / build check~~ (P0 task 7)
- [ ] CSP header via `next.config` → previne injection
- [ ] Limitare validare input (numere finite, non-negative unde e cazul) — deja partial facut, formalizat cu `zod`
- [ ] Rate limiting pe CTA (daca ajunge la formular) — Vercel are edge rate limits

### Legal (obligatoriu RO pentru servicii online)
- [ ] Link ANPC (SAL si SOL) in footer — obligatoriu conform OG 38/2015
- [ ] Politica de confidentialitate scurta
- [ ] Termeni si conditii

---

## Estimare efort

| Zona | Timp |
|---|---|
| P0 (1-8) | 1-2 zile |
| P1 (9-15) | 2-3 zile |
| P2 | optional |
| **Total minim ca sa trimiti linkul** | **1-2 zile de munca focusata** |

## Definition of Done pentru v1.1

Cand putem spune "e gata sa dam la client":

1. Linkul live functioneaza pe mobile si desktop
2. Meta tags / OG arata pro cand dai link pe WhatsApp
3. Favicon + domeniu custom (sau `.vercel.app` curat)
4. Disclaimer + termeni in footer
5. CTA-ul catre consultant e vizibil si functional
6. CI verde, Dependabot activ
7. Macar o runda de QA pe mobil real
