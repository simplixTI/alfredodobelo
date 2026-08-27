import type { Metadata, Viewport } from "next";
import { Anton, Manrope, Caveat } from "next/font/google";
import { site } from "@/content/data";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} 1001 — Deputado Federal / RJ`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Alfredo do Belo",
    "1001",
    "Deputado Federal",
    "Rio de Janeiro",
    "Republicanos",
    "movimento",
    "cultura",
    "família",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    title: `${site.name} 1001 — Deputado Federal`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} 1001 — Deputado Federal`,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#F26522",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    affiliation: { "@type": "PoliticalParty", name: site.party },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rio de Janeiro",
      addressRegion: "RJ",
      addressCountry: "BR",
    },
    email: site.email,
    telephone: site.phone,
    url: site.url,
    sameAs: [site.social.instagram, site.social.facebook, site.social.youtube],
  };

  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${manrope.variable} ${caveat.variable}`}
    >
      <body className="font-sans text-brand-ink antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-orange focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
