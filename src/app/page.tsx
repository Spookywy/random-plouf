"use client";
import Participant from "@/components/participant";
import {
  faCircleExclamation,
  faCrown,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Home() {
  const [participantsNames, setParticipantsNames] = useState<Array<string>>(
    new Array(4).fill("")
  );
  const [winnerIndex, setWinnerIndex] = useState<number>(-1);
  const [winnerStreak, setWinnerStreak] = useState<number>(0);
  const [showError, setShowError] = useState<boolean>(false);

  function handleParticipantNameChange(index: number, newName: string) {
    const newParticipantsNames = [...participantsNames];
    newParticipantsNames[index] = newName;
    setParticipantsNames(newParticipantsNames);
  }

  function addParticipant() {
    setParticipantsNames([...participantsNames, ""]);
  }

  function removeParticipant(index: number) {
    const newParticipantsNames = [...participantsNames];
    newParticipantsNames.splice(index, 1);
    setParticipantsNames(newParticipantsNames);
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

  return (
    <main className="flex flex-col items-center gap-4 pt-5">
      <p className="text-xl font-semibold">Add participants to the draw:</p>
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
        <div className="flex items-center gap-2 text-red-600">
          <FontAwesomeIcon icon={faCircleExclamation} />
          <p className="font-bold">
            You need at least two participants to run a random draw.
          </p>
        </div>
      )}
      {winnerIndex !== -1 && !showError && (
        <div className="flex items-center gap-2 text-green-500">
          <FontAwesomeIcon icon={faCrown} />
          <p className="text-xl font-bold">
            {winnerStreak > 1
              ? `${participantsNames[winnerIndex]} won the draw again (${winnerStreak} Streak)!`
              : `${participantsNames[winnerIndex]} won the draw!`}
          </p>
          <FontAwesomeIcon icon={faCrown} />
        </div>
      )}
      <div className="flex w-4/5 flex-col justify-center gap-4 sm:flex-row">
        <button
          onClick={runRandomDraw}
          className="h-10 rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-100 active:text-neutral-900 sm:w-60"
        >
          {winnerIndex === -1 ? "Run a randow draw" : "Run again"}
        </button>
        <button className="h-10 rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-100 active:text-neutral-900 sm:w-60">
          Create random teams
        </button>
      </div>
    </main>
  );
}
