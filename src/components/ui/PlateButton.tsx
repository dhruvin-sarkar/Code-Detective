/** The hard-shadow letterpress button. `primary` = oxblood CTA. */
export default function PlateButton({
  children,
  onClick,
  disabled = false,
  primary = false,
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  primary?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`plate plate-press cursor-target smallcaps px-6 py-3 font-body text-base font-bold disabled:pointer-events-none disabled:opacity-40 ${
        primary
          ? "border-oxblood bg-oxblood text-paper"
          : "text-ink"
      } ${className}`}
    >
      {children}
    </button>
  );
}
