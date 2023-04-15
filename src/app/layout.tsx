import Footer from "@/components/footer";
import Header from "@/components/header";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import "./globals.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "RanDOM Plouf",
  description:
    "A website for conducting random draws and generating teams randomly.",
  openGraph: {
    images: ["https://random-plouf.vercel.app/api/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex h-full flex-col bg-neutral-900 pt-5 text-white">
        <header>
          <Header />
        </header>
        <div className="flex-grow">{children}</div>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
