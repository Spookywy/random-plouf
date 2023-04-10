import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function TeamResults() {
  return (
    <main className="flex flex-col items-center gap-4 p-5">
      <p className="text-xl font-semibold">Team Results</p>
      <Link
        href=""
        className="flex h-10 w-72 items-center justify-center rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-100 active:text-neutral-900"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="pr-2" />
        Back
      </Link>
    </main>
  );
}
