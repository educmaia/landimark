import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AnalyticsComponent from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pesquisa: Marketing Digital e IA em PMEs | MUST University",
  description: "Participe da pesquisa de mestrado sobre o uso de Inteligência Artificial no Marketing Digital em PMEs de Capivari-SP. Contribua para o avanço do conhecimento empresarial.",
  keywords: [
    "marketing digital",
    "inteligência artificial",
    "PMEs",
    "Capivari-SP",
    "pesquisa mestrado",
    "transformação digital",
    "IA generativa",
    "pequenas empresas",
  ],
  authors: [{ name: "Eduardo Camargo Maia" }],
  creator: "Eduardo Camargo Maia",
  publisher: "MUST University",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Pesquisa: Marketing Digital e IA em PMEs",
    description: "Participe da pesquisa de mestrado sobre IA no Marketing Digital. Sua experiência é valiosa!",
    siteName: "Pesquisa Marketing Digital e IA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pesquisa: Marketing Digital e IA em PMEs",
    description: "Contribua para pesquisa acadêmica sobre transformação digital em empresas",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0284c7" />
      </head>
      <body className="font-sans">
        <AnalyticsComponent />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
