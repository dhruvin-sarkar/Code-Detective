import Stamp from "@/components/ui/Stamp";

/**
 * The phone's LOCKED and WAITING states (GAME.md: the phone always shows
 * exactly one of INPUT / LOCKED / WAITING). Telegram voice.
 */
export default function StatusCard({
  kind,
  headline,
  detail,
  stamp,
}: {
  kind: "locked" | "waiting";
  headline: string;
  detail?: string;
  stamp?: string;
}) {
  return (
    <div className="plate anim-pop-in mx-auto mt-6 w-full max-w-md px-4 py-8 text-center">
      {stamp && (
        <div className="mb-4">
          {/* stamp-red text stays >= 18px (DESIGN.md palette rule) */}
          <Stamp animate tone={kind === "locked" ? "red" : "ink"} className="text-lg">
            {stamp}
          </Stamp>
        </div>
      )}
      <p className="font-typewriter text-lg leading-relaxed">
        {headline.toUpperCase()} STOP
      </p>
      {detail && (
        <p className="mt-3 font-body italic text-ink-soft">{detail}</p>
      )}
      <p className="smallcaps mt-5 text-xs text-sepia">
        ☞ the chief inspector sets the pace
      </p>
    </div>
  );
}
