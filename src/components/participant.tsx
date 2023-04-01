import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ParticipantProps = {
  name: string;
  index: number;
  onNameChange: (index: number, newName: string) => void;
};

export default function Participant({
  name,
  index,
  onNameChange,
}: ParticipantProps) {
  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    let newName = event.target.value;
    onNameChange(index, newName);
  }

  return (
    <div>
      <input
        className="h-10 w-60 rounded p-2 text-neutral-900"
        type="text"
        value={name}
        placeholder={`Participant ${index + 1}`}
        onChange={handleNameChange}
      />
      <button className="p-2">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}
