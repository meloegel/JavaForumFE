export type ButtonType = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  text,
  onClick,
  disabled,
  className,
}: ButtonType): JSX.Element {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-50 border rounded-2xl px-5 py-1 ${className}`}
    >
      {text}
    </button>
  );
}
