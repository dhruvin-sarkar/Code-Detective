import Stamp from "@/components/ui/Stamp";
import type { RoomStatePublic } from "@/game/protocol";

const RANK_WORDS = ["First", "Second", "Third", "Fourth", "Fifth"];
const ROW_DELAYS = ["", "anim-delay-1", "anim-delay-2", "anim-delay-3", "anim-delay-4"];

/** Top five only — the bottom of the class is protected (GAME.md). */
export default function HostDocket({ state }: { state: RoomStatePublic }) {
  const ranked = [...state.players]
    .filter((p) => !p.spectator)
    .sort((a, b) => b.score - a.score);
  const topFive = ranked.slice(0, 5);
  const riser = ranked.reduce(
    (best, p) => (p.lastDelta > (best?.lastDelta ?? 0) ? p : best),
    null as (typeof ranked)[number] | null,
  );

  return (
    <div className="mx-auto mt-6 max-w-4xl">
      <div className="rule-oxford" />
      <h2 className="smallcaps py-3 text-center font-body text-2xl font-bold">
        The Docket — standings after case {state.caseIndex + 1} of{" "}
        {state.caseTotal}.
      </h2>
      <div className="rule-oxford rotate-180" />

      <table className="mt-6 w-full">
        <tbody>
          {topFive.map((p, i) => (
            <tr
              key={p.id}
              className={`anim-slide-in ${ROW_DELAYS[i]} border-b hairline`}
            >
              <td className="w-20 py-3 pr-4 text-right font-display text-4xl font-black text-sepia">
                {i + 1}
              </td>
              <td className="py-3">
                <span className="evidence-tag inline-block font-typewriter text-lg">
                  {p.name}
                </span>
                {riser && riser.id === p.id && riser.lastDelta > 0 && (
                  <Stamp className="ml-3 text-lg">Rising</Stamp>
                )}
                {!p.connected && (
                  <span className="smallcaps ml-3 text-xs text-sepia">
                    (line gone dead)
                  </span>
                )}
              </td>
              <td className="smallcaps hidden py-3 text-sm text-sepia sm:table-cell">
                {RANK_WORDS[i]} place
              </td>
              <td className="py-3 text-right font-display text-3xl font-bold tabular-nums">
                {p.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {riser && riser.lastDelta > 0 && !topFive.some((p) => p.id === riser.id) && (
        <p className="mt-4 text-center font-body italic text-ink-soft">
          Rising through the ranks: <strong>{riser.name}</strong>, up{" "}
          {riser.lastDelta} points this case.
        </p>
      )}
      <p className="smallcaps mt-6 text-center text-xs text-sepia">
        Every detective&apos;s private standing is on their own device.
      </p>
    </div>
  );
}
