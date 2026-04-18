import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from "@vercel/analytics/react";
import { dir } from "i18next";
import type { Metadata } from "next";
import Footer from "./components/footer";
import Header from "./components/header";
import "./globals.css";
config.autoAddCss = false;

import { GOOGLE_TAG_MANAGER_ID } from "@/constants";
import { GoogleTagManager } from "@next/third-parties/google";
import { useTranslation } from "../i18n";
import { languages } from "../i18n/settings";
import { GoogleAnalytics } from "./components/google/googleAnalytics";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng);

  return {
    title: "RanDOM Plouf",
    description: t("metadata.description"),
    openGraph: {
      images: ["https://random-plouf.vercel.app/api/og"],
    },
    metadataBase: new URL("https://random-plouf.vercel.app"),
    verification: {
      google: "pQFuTos-1aQEos8gtHJEb0wzfkGLzRAb5NLiSG0p2jk",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={dir(lng)} className="h-full">
      <GoogleAnalytics />
      <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
      <body className="flex h-full flex-col bg-neutral-900 pt-5 text-white">
        <header className="px-5">
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
