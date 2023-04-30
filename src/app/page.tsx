"use client";
import CreateTeamButton from "@/components/buttons/createTeamButton";
import StyledButton from "@/components/buttons/styledButton";
import Participant from "@/components/participant";
import Team from "@/components/team";
import getNewRandomNumber from "@/utils/getNewRandomNumber";
import shuffleArray from "@/utils/shuffleArray";
import {
  faCircleExclamation,
  faCrown,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const initialNumberOfParticipants = 2;
  const initialNumberOfTeams = 2;

  const [participantsNames, setParticipantsNames] = useState<Array<string>>(
    new Array(initialNumberOfParticipants).fill("")
  );
  const [shouldFocusLastInput, setShouldFocusLastInput] =
    useState<boolean>(false);
  const [drawIsInProgress, setDrawIsInProgress] = useState<boolean>(false);
  const [participantToAnimate, setParticipantToAnimate] = useState<number>(-1);
  const [teamsAreAnimated, setTeamsAreAnimated] = useState<boolean>(false);
  const [winnerIndex, setWinnerIndex] = useState<number>(-1);
  const [winnerStreak, setWinnerStreak] = useState<number>(0);

  const [showError, setShowError] = useState<boolean>(false);
  const [sectionToShow, setSectionToShow] = useState<"participants" | "team">(
    "participants"
  );

  const [numberOfTeams, setNumberOfTeams] =
    useState<number>(initialNumberOfTeams);
  const [teams, setTeams] = useState<Array<Array<string>>>([]);

  const lastParticipantInputRef = useRef<HTMLInputElement>(null);

  const { t, lang } = useTranslation("home");

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
    setShouldFocusLastInput(true);
    setParticipantsNames([...participantsNames, ""]);
    resetDrawHistory();
  }

  function removeParticipant(index: number) {
    setShouldFocusLastInput(false);
    const newParticipantsNames = [...participantsNames];
    newParticipantsNames.splice(index, 1);
    setParticipantsNames(newParticipantsNames);
    resetDrawHistory();
  }

  function handleRunRandomDrawButtonClick() {
    const participants = participantsNames.filter((name) => name !== "");
    if (participants.length < 2) {
      setShowError(true);
      return;
    }

    setShouldFocusLastInput(false);
    setShowError(false);
    setParticipantsNames(participants);

    setDrawIsInProgress(true);

    let animationTimePerParticipant = 300;
    let newRandomNumber = getNewRandomNumber(participants.length);

    const intervalId = setInterval(() => {
      setParticipantToAnimate(newRandomNumber);
      newRandomNumber = getNewRandomNumber(
        participants.length,
        newRandomNumber
      );
    }, animationTimePerParticipant);

    setTimeout(() => {
      clearInterval(intervalId);
      setDrawIsInProgress(false);
      setParticipantToAnimate(-1);

      runRandomDraw(participants);
    }, 2500);
  }

  function runRandomDraw(participant: Array<string>) {
    const randomIndex = Math.floor(Math.random() * participant.length);

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

  function handleCreateTeamsButtonClick() {
    const participants = participantsNames.filter((name) => name !== "");
    if (participants.length < 2) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setParticipantsNames(participants);

    resetDrawHistory();
    setSectionToShow("team");

    createRandomTeams();
  }

  function createRandomTeams() {
    setTeamsAreAnimated(true);
    setTimeout(() => {
      setTeamsAreAnimated(false);
    }, 100);

    const shuffledParticipants = shuffleArray(participantsNames);

    const numberOfTeamToCreate =
      participantsNames.length > numberOfTeams
        ? numberOfTeams
        : participantsNames.length;

    const teams = Array.from<string[], string[]>(
      { length: numberOfTeamToCreate },
      () => []
    );

    for (let i = 0; i < shuffledParticipants.length; i++) {
      teams[i % numberOfTeamToCreate].push(shuffledParticipants[i]);
    }

    setTeams(teams);
  }

  function goBackToParticipants() {
    setSectionToShow("participants");
  }

  useEffect(() => {
    if (lastParticipantInputRef.current && shouldFocusLastInput) {
      lastParticipantInputRef.current.focus();
    }
  }, [participantsNames.length, shouldFocusLastInput]);

  return (
    <main className="flex flex-col items-center gap-4 p-5">
      {sectionToShow === "participants" ? (
        <>
          <p className="text-xl font-semibold">{t("addParticipants")}</p>
          {participantsNames.map((participantName, index) => (
            <Participant
              key={index}
              name={participantName}
              isWinner={index === winnerIndex && !drawIsInProgress}
              isAnimated={drawIsInProgress && index === participantToAnimate}
              index={index}
              onNameChange={handleParticipantNameChanged}
              onRemoveParticipant={removeParticipant}
              lastParticipantInputRef={
                index === participantsNames.length - 1
                  ? lastParticipantInputRef
                  : null
              }
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
          {winnerIndex !== -1 && !showError && !drawIsInProgress && (
            <p className="text-center text-xl font-bold text-green-500">
              <FontAwesomeIcon icon={faCrown} />{" "}
              {winnerStreak > 1
                ? `${participantsNames[winnerIndex]} won the draw again!`
                : `${participantsNames[winnerIndex]} won the draw!`}
            </p>
          )}
          <div className="flex w-4/5 flex-col items-center justify-center gap-4 sm:flex-row">
            <StyledButton
              disabled={drawIsInProgress}
              onClick={handleRunRandomDrawButtonClick}
              label={winnerIndex === -1 ? "Run a randow draw" : "Run again"}
            />
            <CreateTeamButton
              disabled={drawIsInProgress}
              numberOfTeams={numberOfTeams}
              handleNumberOfTeamsChanged={handleNumberOfTeamsChanged}
              createRandomTeams={handleCreateTeamsButtonClick}
            />
          </div>
        </>
      ) : (
        <>
          <p className="text-xl font-semibold">Team results</p>
          {teams.map((team, index) => (
            <Team
              key={index}
              team={team}
              teamIndex={index}
              isAnimated={teamsAreAnimated}
            />
          ))}
          <StyledButton onClick={createRandomTeams} label="Create new teams" />
          <StyledButton onClick={goBackToParticipants} label="Go back" />
        </>
      )}
    </main>
  );
}
