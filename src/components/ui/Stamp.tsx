/** Rubber stamp. Max one rotated element per viewport (DESIGN.md). */
export default function Stamp({
  children,
  tone = "red",
  className = "",
  animate = false,
}: {
  children: React.ReactNode;
  tone?: "red" | "ink";
  className?: string;
  animate?: boolean;
}) {
  return (
    <span
      className={`stamp ${tone === "ink" ? "stamp-ink" : ""} ${
        animate ? "anim-thump" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}
