import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://finance-bro-nine.vercel.app";
const title = "Finance Bro — Calculator FIRE";
const description =
  "Calculator de libertate financiara (FIRE). Afla de cati bani ai nevoie investiti ca sa-ti acoperi cheltuielile lunare din randament, si in cat timp ajungi acolo.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Finance Bro",
  },
  description,
  applicationName: "Finance Bro",
  keywords: [
    "FIRE",
    "calculator",
    "libertate financiara",
    "pensie",
    "investitii",
    "Romania",
    "Pilon 2",
    "Pilon 3",
    "ETF",
  ],
  authors: [
    {
      name: "Moga Cosmin Petrica",
      url: "https://www.linkedin.com/in/cosmin-moga-465b2ab2/",
    },
  ],
  creator: "Moga Cosmin Petrica",
  publisher: "Moga Cosmin Petrica",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: siteUrl,
    siteName: "Finance Bro",
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Finance Bro — Calculator FIRE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
