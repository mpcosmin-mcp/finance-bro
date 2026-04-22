import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termeni & disclaimer",
  description:
    "Termenii de utilizare si disclaimerul Finance Bro — calculator FIRE informativ, fara consultanta financiara personalizata.",
};

export default function TermeniPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16 space-y-8">
        <div className="space-y-2">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Inapoi la calculator
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Termeni & disclaimer
          </h1>
          <p className="text-muted-foreground">
            Ultima actualizare: {new Date().toLocaleDateString("ro-RO")}
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Natura serviciului</h2>
          <p className="text-muted-foreground">
            Finance Bro este un calculator educational pentru planificarea
            libertatii financiare (FIRE — Financial Independence, Retire
            Early). Informatiile afisate sunt strict informative si
            ilustrative. Finance Bro <strong>nu ofera</strong> consultanta
            financiara, fiscala sau juridica personalizata.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">
            2. Fara garantii asupra rezultatelor
          </h2>
          <p className="text-muted-foreground">
            Randamentele utilizate in calcule sunt valori asumate de
            utilizator. Randamentele istorice ale pietelor de capital{" "}
            <strong>nu garanteaza</strong> randamentele viitoare. Inflatia,
            taxele, comisioanele si evolutia personala pot modifica
            semnificativ rezultatele reale. Nu ne asumam responsabilitatea
            pentru deciziile financiare luate pe baza informatiilor prezentate
            aici.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Date & confidentialitate</h2>
          <p className="text-muted-foreground">
            Calculatorul ruleaza in intregime in browserul utilizatorului. Nu
            colectam, nu stocam si nu transmitem valorile pe care le introduci.
            Pentru masuratori agregate de audienta folosim Vercel Analytics,
            care nu seteaza cookies si nu identifica utilizatori individuali.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Proprietate intelectuala</h2>
          <p className="text-muted-foreground">
            Codul sursa este publicat pe{" "}
            <a
              href="https://github.com/mpcosmin-mcp/finance-bro"
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4 hover:text-foreground"
            >
              GitHub
            </a>
            . Continutul, designul si brandul Finance Bro raman proprietatea
            autorilor.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Solutionarea disputelor</h2>
          <p className="text-muted-foreground">
            In conformitate cu OG 38/2015, utilizatorii pot apela la
            Autoritatea Nationala pentru Protectia Consumatorilor (ANPC) pentru
            solutionarea alternativa a litigiilor:
          </p>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li>
              <a
                href="https://anpc.ro/ce-este-sal/"
                target="_blank"
                rel="noreferrer noopener"
                className="underline underline-offset-4 hover:text-foreground"
              >
                ANPC — SAL (Solutionarea Alternativa a Litigiilor)
              </a>
            </li>
            <li>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noreferrer noopener"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Comisia Europeana — SOL (Solutionarea Online a Litigiilor)
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Contact</h2>
          <p className="text-muted-foreground">
            Pentru intrebari legate de acest calculator sau pentru colaborari
            comerciale, ne poti contacta prin{" "}
            <a
              href="https://github.com/mpcosmin-mcp/finance-bro/issues"
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4 hover:text-foreground"
            >
              GitHub Issues
            </a>
            .
          </p>
        </section>

        <p className="text-xs text-muted-foreground pt-8">
          Prin utilizarea acestui site accepti termenii de mai sus.
        </p>
      </div>
    </main>
  );
}
