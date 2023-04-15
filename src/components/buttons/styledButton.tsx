type StyledButtonProps = {
  onClick: () => void;
  label: string;
};

export default function StyledButton({ onClick, label }: StyledButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-10 w-72 rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-100 active:text-neutral-900"
    >
      {label}
    </button>
  );
}
