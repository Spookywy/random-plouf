type StyledButtonProps = {
  onClick: () => void;
  label: string;
  disabled?: boolean;
};

export default function StyledButton({
  onClick,
  label,
  disabled,
}: StyledButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="h-10 w-72 rounded bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-900 active:bg-neutral-100 active:text-neutral-900"
    >
      {label}
    </button>
  );
}
