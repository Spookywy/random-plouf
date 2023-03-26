import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ParticipantProps = {
  number: number;
};

export default function Participant({ number }: ParticipantProps) {
  return (
    <div>
      <input
        className="h-10 w-60 rounded p-2 text-neutral-900"
        type="text"
        placeholder={`Name ${number}`}
      />
      <button className="p-2">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}
