"use client";
import Participant from "@/components/participant";
import {
  faAngleDown,
  faCircleExclamation,
  faCrown,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [participantsNames, setParticipantsNames] = useState<Array<string>>(
    new Array(2).fill("")
  );
  const [winnerIndex, setWinnerIndex] = useState<number>(-1);
  const [winnerStreak, setWinnerStreak] = useState<number>(0);

  const [showError, setShowError] = useState<boolean>(false);

  const [numberOfTeams, setNumberOfTeams] = useState<number>(2);
  const [teams, setTeams] = useState<Array<Array<string>>>([]);

  const possibleNumberOfTeam = Array.from(
    { length: 4 },
    (_, index) => index + 2
  );

  function resetDrawHistory() {
    setWinnerIndex(-1);
    setWinnerStreak(0);
  }

  function handleParticipantNameChange(index: number, newName: string) {
    const newParticipantsNames = [...participantsNames];
    newParticipantsNames[index] = newName;
    setParticipantsNames(newParticipantsNames);
    resetDrawHistory();
  }

  function addParticipant() {
    setParticipantsNames([...participantsNames, ""]);
    resetDrawHistory();
  }

  function removeParticipant(index: number) {
    const newParticipantsNames = [...participantsNames];
    newParticipantsNames.splice(index, 1);
    setParticipantsNames(newParticipantsNames);
    resetDrawHistory();
  }

  function runRandomDraw() {
    const participants = participantsNames.filter((name) => name !== "");
    if (participants.length < 2) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setParticipantsNames(participants);

    const randomIndex = Math.floor(Math.random() * participants.length);

    if (winnerIndex === randomIndex) {
      setWinnerStreak(winnerStreak + 1);
    } else {
      setWinnerStreak(1);
    }

    setWinnerIndex(randomIndex);
  }

  function createRandomTeams() {
    const participants = participantsNames.filter((name) => name !== "");
    if (participants.length < 2) {
      setShowError(true);
      return;
    }
  }

  function handleNumberOfTeamsChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setNumberOfTeams(parseInt(event.target.value));
  }

  return (
    <main className="flex flex-col items-center gap-4 p-5">
      <p className="text-xl font-semibold">Add participants:</p>
      {participantsNames.map((participantName, index) => (
        <Participant
          key={index}
          name={participantName}
          isWinner={index === winnerIndex}
          index={index}
          onNameChange={handleParticipantNameChange}
          onRemoveParticipant={removeParticipant}
        />
      ))}
      <button
        className="h-12 w-12 rounded-full bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-100 active:text-neutral-900"
        onClick={addParticipant}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
      {showError && (
        <p className="text-center font-bold text-red-600">
          <FontAwesomeIcon icon={faCircleExclamation} /> Please enter at least
          the name of two participants.
        </p>
      )}
      {winnerIndex !== -1 && !showError && (
        <p className="text-center text-xl font-bold text-green-500">
          <FontAwesomeIcon icon={faCrown} />{" "}
          {winnerStreak > 1
            ? `${participantsNames[winnerIndex]} won the draw again (${winnerStreak} Streak)!`
            : `${participantsNames[winnerIndex]} won the draw!`}
        </p>
      )}
      <div className="flex w-4/5 flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          onClick={runRandomDraw}
          className="h-10 w-72 rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-100 active:text-neutral-900"
        >
          {winnerIndex === -1 ? "Run a randow draw" : "Run again"}
        </button>
        <div className="flex w-72">
          <div className="relative">
            <select
              value={numberOfTeams}
              onChange={handleNumberOfTeamsChange}
              className="h-10 w-12 appearance-none rounded-none rounded-l border-r border-neutral-400 bg-neutral-700 pl-3 text-neutral-100"
            >
              {possibleNumberOfTeam.map((numbeOfTeam) => (
                <option key={numbeOfTeam} value={numbeOfTeam}>
                  {numbeOfTeam}
                </option>
              ))}
            </select>
            <FontAwesomeIcon
              icon={faAngleDown}
              className="pointer-events-none absolute right-2 top-3 text-white"
            />
          </div>
          <button
            onClick={createRandomTeams}
            className="h-10 flex-grow rounded-r bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-100 active:text-neutral-900"
          >
            Create <b>{numberOfTeams}</b> random teams
          </button>
        </div>
      </div>
    </main>
  );
}
