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
      <body className="bg-neutral-900 p-5 text-white">
        <header>
          <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-center text-6xl font-extrabold text-transparent">
            RanDOM Plouf
          </h1>
        </header>
        {children}
      </body>
    </html>
  );
}
