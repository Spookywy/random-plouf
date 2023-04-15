"use client";
import CreateTeamButton from "@/components/createTeamButton";
import Participant from "@/components/participant";
import shuffleArray from "@/utils/shuffleArray";
import {
  faCircleExclamation,
  faCrown,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";

export default function Home() {
  const [participantsNames, setParticipantsNames] = useState<Array<string>>(
    new Array(2).fill("")
  );
  const [winnerIndex, setWinnerIndex] = useState<number>(-1);
  const [winnerStreak, setWinnerStreak] = useState<number>(0);

  const [showError, setShowError] = useState<boolean>(false);
  const [sectionToShow, setSectionToShow] = useState<"participants" | "team">(
    "participants"
  );

  const [numberOfTeams, setNumberOfTeams] = useState<number>(2);
  const [teams, setTeams] = useState<Array<Array<string>>>([]);

  function resetDrawHistory() {
    setWinnerIndex(-1);
    setWinnerStreak(0);
  }

  function handleParticipantNameChanged(index: number, newName: string) {
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

  function handleNumberOfTeamsChanged(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setNumberOfTeams(parseInt(event.target.value));
  }

  function createRandomTeams() {
    const participants = participantsNames.filter((name) => name !== "");
    if (participants.length < 2) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setSectionToShow("team");

    const shuffledParticipants = shuffleArray(participants);
    const teams = Array.from<string[], string[]>(
      { length: numberOfTeams },
      () => []
    );

    for (let i = 0; i < shuffledParticipants.length; i++) {
      teams[i % numberOfTeams].push(shuffledParticipants[i]);
    }

    setTeams(teams);
  }

  function goBackToParticipants() {
    setSectionToShow("participants");
  }

  return (
    <main className="flex flex-col items-center gap-4 p-5">
      {sectionToShow === "participants" ? (
        <>
          <p className="text-xl font-semibold">Add participants</p>
          {participantsNames.map((participantName, index) => (
            <Participant
              key={index}
              name={participantName}
              isWinner={index === winnerIndex}
              index={index}
              onNameChange={handleParticipantNameChanged}
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
              <FontAwesomeIcon icon={faCircleExclamation} /> Please enter at
              least the name of two participants.
            </p>
          )}
          {winnerIndex !== -1 && !showError && (
            <p className="text-center text-xl font-bold text-green-500">
              <FontAwesomeIcon icon={faCrown} />{" "}
              {winnerStreak > 1
                ? `${participantsNames[winnerIndex]} won the draw again! (${winnerStreak} Streak)`
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
            <CreateTeamButton
              numberOfTeams={numberOfTeams}
              handleNumberOfTeamsChanged={handleNumberOfTeamsChanged}
              createRandomTeams={createRandomTeams}
            />
          </div>
        </>
      ) : (
        <>
          {teams.map((team, index) => (
            <div key={index} className="mb-5 text-center">
              <p
                className={`mb-2 bg-gradient-to-r bg-clip-text text-2xl font-semibold text-transparent
              ${classNames({
                " from-blue-500 to-red-500": index === 0,
                " from-yellow-500 to-blue-500": index === 1,
                "from-blue-500 to-green-500": index === 2,
                "from-green-500 to-yellow-500": index === 3,
                "from-yellow-500 to-red-500": index === 4,
              })}`}
              >
                Team {index + 1}
              </p>
              {team.map((participant, index) => (
                <p className="text-xl" key={index}>
                  {participant}
                </p>
              ))}
            </div>
          ))}
          <button
            onClick={goBackToParticipants}
            className="h-10 w-72 rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-100 active:text-neutral-900"
          >
            Go back
          </button>
        </>
      )}
    </main>
  );
}
