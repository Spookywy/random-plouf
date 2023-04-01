"use client";
import Participant from "@/components/participant";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Home() {
  const [participantsNames, setParticipantsNames] = useState<Array<string>>(
    new Array(4).fill("")
  );

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

  return (
    <main className="flex flex-col items-center space-y-5 p-5">
      <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-6xl font-extrabold text-transparent">
        RanDOM Plouf
      </h1>
      <p className="text-xl font-semibold">Add participants to the draw:</p>
      {participantsNames.map((participantName, index) => (
        <Participant
          key={index}
          name={participantName}
          index={index}
          onNameChange={handleParticipantNameChange}
          onRemoveParticipant={removeParticipant}
        />
      ))}
      <button
        className="h-12 w-12 rounded-full bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900"
        onClick={addParticipant}
      >
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
