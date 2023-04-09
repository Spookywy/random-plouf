import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
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
  );
}
