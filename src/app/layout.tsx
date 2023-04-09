import Footer from "@/components/footer";
import Header from "@/components/header";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
config.autoAddCss = false;

export const metadata = {
  title: "RanDOM Plouf",
  description:
    "A website for conducting random draws and generating teams randomly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-neutral-900 pt-5 text-white">
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
