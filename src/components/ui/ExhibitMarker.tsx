/**
 * Dual-coded MCQ marker (DESIGN.md -> Evidence markers): card suit +
 * palette color, no letters. Shapes carry the distinction; color is
 * reinforcement, never the only signal.
 */

const MARKERS = [
  { suit: "♠", name: "spade", colorClass: "bg-ink" },
  { suit: "♦", name: "diamond", colorClass: "bg-oxblood" },
  { suit: "♣", name: "club", colorClass: "bg-sepia" },
  { suit: "♥", name: "heart", colorClass: "bg-brass" },
] as const;

export function exhibitSuit(index: number): string {
  return MARKERS[index].suit;
}

export function exhibitName(index: number): string {
  return MARKERS[index].name;
}

export function exhibitColorClass(index: number): string {
  return MARKERS[index].colorClass;
}

export default function ExhibitMarker({
  index,
  size = "md",
}: {
  index: number;
  size?: "md" | "lg";
}) {
  const marker = MARKERS[index];
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center font-display font-bold text-paper ${marker.colorClass} ${
        size === "lg" ? "h-12 w-12 text-3xl" : "h-8 w-8 text-lg"
      }`}
      aria-label={`The ${marker.name} exhibit`}
    >
      <span aria-hidden>{marker.suit}</span>
    </span>
  );
}
