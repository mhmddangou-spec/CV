import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PS CV Studio | Créez votre CV professionnel avec l'IA",
  description: "Plateforme SaaS professionnelle de création, d'optimisation et d'export de CV avec l'intelligence artificielle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
