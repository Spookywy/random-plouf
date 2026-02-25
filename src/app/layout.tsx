import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
// import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import Footer from "./[lng]/components/footer";
import Header from "./[lng]/components/header";
import "./globals.css";
config.autoAddCss = false;

import { GOOGLE_TAG_MANAGER_ID } from "@/constants";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "./[lng]/components/google/googleAnalytics";

export const metadata: Metadata = {
  title: "RanDOM Plouf",
  description:
    "A website for conducting random draws and generating teams randomly.",
  openGraph: {
    images: ["https://random-plouf.vercel.app/api/og"],
  },
  metadataBase: new URL("https://random-plouf.vercel.app"),
  verification: {
    google: "pQFuTos-1aQEos8gtHJEb0wzfkGLzRAb5NLiSG0p2jk",
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full">
      <GoogleAnalytics />
      <GoogleTagManager gtmId={GOOGLE_TAG_MANAGER_ID} />
      <body className="flex h-full flex-col bg-neutral-900 pt-5 text-white">
        <header>
          <Header />
        </header>
        <div className="flex-grow">{children}</div>
        {/* <Analytics /> */}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
