import { useTranslation } from "@/app/i18n/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ParticipantProps = {
  name: string;
  isWinner: boolean;
  isAnimated: boolean;
  index: number;
  onNameChange: (index: number, newName: string) => void;
  onRemoveParticipant: (index: number) => void;
  lastParticipantInputRef: React.RefObject<HTMLInputElement> | null;
  isDrawInProgress: boolean;
};

export default function Participant({
  name,
  isWinner,
  isAnimated,
  index,
  onNameChange,
  onRemoveParticipant,
  lastParticipantInputRef,
  isDrawInProgress,
}: ParticipantProps) {
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newName = event.target.value;
    onNameChange(index, newName);
  }
  const { t } = useTranslation();

  return (
    <div>
      <input
        className={`relative h-12 w-60 rounded p-4 sm:w-72
        ${
          isWinner || isAnimated
            ? "bg-green-500 font-bold text-white"
            : "text-neutral-900"
        }
        ${isAnimated ? "animate-ping" : ""}`}
        type="text"
        value={name}
        placeholder={t("participant", { participantNumber: index + 1 })}
        onChange={handleNameChange}
        ref={lastParticipantInputRef}
        readOnly={isDrawInProgress}
      />
      {!isDrawInProgress && (
        <button
          className="absolute ml-2 p-2"
          onClick={() => onRemoveParticipant(index)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
}
