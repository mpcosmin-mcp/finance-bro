const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://finance-bro-nine.vercel.app";

const author = {
  "@type": "Person",
  name: "Moga Cosmin Petrica",
  email: "mailto:mpcosmin@gmail.com",
  url: "https://www.linkedin.com/in/cosmin-moga-465b2ab2/",
  sameAs: [
    "https://www.linkedin.com/in/cosmin-moga-465b2ab2/",
    "https://github.com/mpcosmin-mcp",
  ],
};

const webApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Finance Bro — Calculator FIRE",
  alternateName: "Finance Bro",
  url: SITE_URL,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  inLanguage: "ro-RO",
  description:
    "Calculator de libertate financiara (FIRE) pentru Romania. Afla de cati bani ai nevoie investiti ca sa-ti acoperi cheltuielile lunare din randament si in cat timp ajungi acolo.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "RON" },
  featureList: [
    "Calcul capital necesar la pensie (regula 4% generalizata)",
    "Fond de urgenta si dobanda lunara",
    "Scenarii venit vs. cheltuieli cu timp estimat cu/fara investitii",
    "Randament real (nominal minus inflatie)",
    "Grafic evolutie capital in timp",
  ],
  audience: { "@type": "Audience", geographicArea: "RO" },
  author,
  creator: author,
  publisher: author,
};

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ce este FIRE (Financial Independence, Retire Early)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FIRE inseamna sa ajungi la un capital investit suficient de mare incat randamentul real sa-ti acopere cheltuielile lunare pe termen lung. In forma clasica (regula 4%), capitalul tinta este de 25× cheltuielile anuale.",
      },
    },
    {
      "@type": "Question",
      name: "Cum calculez capitalul necesar pentru pensie?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Capital necesar = (venit lunar dorit × 12) / randament real. Randamentul real este randamentul nominal al investitiilor minus inflatia. Pentru un buget de 10.000 RON/luna si un randament real de 9%, capitalul necesar este aproximativ 1.333.333 RON.",
      },
    },
    {
      "@type": "Question",
      name: "In cat timp pot ajunge la libertate financiara?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depinde de rata ta de economisire si de randamentul real al investitiilor. Cu o economie lunara de 6.500 RON si un randament real de 9%/an, ajungi la un capital de 1,33M RON in aproximativ 10,4 ani. Calculatorul foloseste formula NPER pentru a estima timpul exact.",
      },
    },
    {
      "@type": "Question",
      name: "De ce folosim randamentul real in loc de cel nominal?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Randamentul real (nominal minus inflatie) tine cont de pierderea puterii de cumparare in timp. Daca investitiile cresc cu 12% dar inflatia e 3%, puterea ta reala de cumparare creste doar cu ~9%. Calculatorul foloseste randamentul real ca sa pastrezi acelasi nivel de trai.",
      },
    },
    {
      "@type": "Question",
      name: "Este aplicatia gratuita?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Da, Finance Bro este gratuit si open-source. Nu inlocuieste consultanta financiara personalizata — este un instrument educational pentru planificare.",
      },
    },
  ],
};

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
