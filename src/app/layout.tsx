import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-center text-6xl font-extrabold text-transparent">
            RanDOM Plouf
          </h1>
        </header>
        <div className="flex-grow">{children}</div>
        <footer>
          <div className="mr-10 ml-10 mt-auto flex h-28 flex-col items-center justify-center border-t border-neutral-700 text-neutral-400 sm:h-16 sm:flex-row sm:gap-5">
            <p>
              Made with
              <FontAwesomeIcon className="mr-2 ml-2" icon={faHeart} />
              by Valentin Menoret
            </p>
            <p>&#8226;</p>
            <a
              href="https://github.com/Spookywy/random-plouf"
              className="hover:text-neutral-100"
            >
              Source code
              <FontAwesomeIcon className="ml-2 text-xl" icon={faGithub} />
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
