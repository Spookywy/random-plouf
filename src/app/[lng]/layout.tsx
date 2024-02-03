import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from "@vercel/analytics/react";
import { dir } from "i18next";
import type { Metadata } from "next";
import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";
config.autoAddCss = false;

import { languages } from "../i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "RanDOM Plouf",
  description:
    "A website for conducting random draws and generating teams randomly.",
  openGraph: {
    images: ["https://random-plouf.vercel.app/api/og"],
  },
  metadataBase: new URL("https://random-plouf.vercel.app"),
};
export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={lng} dir={dir(lng)} className="h-full">
      <body className="flex h-full flex-col bg-neutral-900 pt-5 text-white">
        <header>
          <Header />
        </header>
        <div className="flex-grow">{children}</div>
        <Analytics />
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
