/** The oxblood wax seal — success states only (DESIGN.md). */
export default function WaxSeal({
  size = 64,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`wax-seal font-display font-black ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      aria-hidden
    >
      CD
    </span>
  );
}
