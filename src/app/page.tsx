import Participant from "@/components/participant";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-5 p-5">
      <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-6xl font-extrabold text-transparent">
        RanDOM Plouf
      </h1>
      <p className="text-xl font-semibold">Add participants to the draw:</p>
      <Participant number={1}></Participant>
      <Participant number={2}></Participant>
      <Participant number={3}></Participant>
      <Participant number={4}></Participant>
      <button className="h-12 w-12 rounded-full bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900">
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
      <div className="flex space-x-5">
        <button className="h-10 w-44 rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900">
          Run a randow draw
        </button>
        <button className="h-10 w-44 rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900">
          Create random teams
        </button>
      </div>
    </main>
  );
}
