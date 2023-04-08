import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ParticipantProps = {
  name: string;
  isWinner: boolean;
  index: number;
  onNameChange: (index: number, newName: string) => void;
  onRemoveParticipant: (index: number) => void;
};

export default function Participant({
  name,
  isWinner,
  index,
  onNameChange,
  onRemoveParticipant,
}: ParticipantProps) {
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newName = event.target.value;
    onNameChange(index, newName);
  }

  return (
    <div>
      <input
        className={`h-10 w-60 rounded p-2  sm:w-72 ${
          isWinner ? "bg-green-500 font-bold text-white" : "text-neutral-900"
        }`}
        type="text"
        value={name}
        placeholder={`Participant ${index + 1}`}
        onChange={handleNameChange}
      />
      <button className="p-2" onClick={() => onRemoveParticipant(index)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}
