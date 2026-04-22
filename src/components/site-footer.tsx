import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="inline-block size-2 rounded-full bg-emerald-500" />
          <span className="font-medium text-foreground">Finance Bro</span>
          <span>© {year}</span>
          <span className="opacity-60">·</span>
          <span>
            construit de{" "}
            <a
              href="https://www.linkedin.com/in/cosmin-moga-465b2ab2/"
              target="_blank"
              rel="noreferrer noopener author"
              className="text-foreground hover:underline underline-offset-4"
            >
              Moga Cosmin Petrica
            </a>
          </span>
        </div>
        <nav className="flex flex-wrap gap-4">
          <Link href="/termeni" className="hover:text-foreground">
            Termeni & disclaimer
          </Link>
          <a
            href="mailto:mpcosmin@gmail.com"
            className="hover:text-foreground"
          >
            Contact
          </a>
          <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground"
          >
            ANPC — SAL
          </a>
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground"
          >
            ANPC — SOL
          </a>
          <a
            href="https://github.com/mpcosmin-mcp/finance-bro"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-8 text-xs text-muted-foreground">
        Informatiile si calculele de pe acest site sunt doar informative si nu
        constituie consultanta financiara. Randamentele istorice nu garanteaza
        randamentele viitoare. Consulta un specialist autorizat inainte de a
        lua decizii financiare majore.
      </div>
    </footer>
  );
}
