import Stamp from "@/components/ui/Stamp";
import Watermark from "@/components/ui/Watermark";
import type { RoomStatePublic } from "@/game/protocol";

/** The case-file slam: title card scales 1.06 -> 1 with a 2px settle. */
export default function HostBriefing({ state }: { state: RoomStatePublic }) {
  const caseFile = state.currentCase;
  if (!caseFile) return null;

  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Watermark glyph="?" />
      <div className="anim-slam">
        <p className="smallcaps text-lg text-sepia">
          Case {state.caseIndex + 1} of {state.caseTotal}
        </p>
        <div className="mx-auto my-4 w-24 border-t-2 border-ink" />
        <h2 className="font-display text-5xl font-black uppercase leading-tight tracking-tight sm:text-7xl">
          {caseFile.title}.
        </h2>
        <div className="mx-auto my-4 w-24 border-t-2 border-ink" />
        <p className="font-body text-xl italic text-ink-soft">
          The evidence goes up in a moment. Read before you theorize.
        </p>
        {state.doublePoints && (
          <div className="mt-6">
            <Stamp animate className="text-2xl">
              Final Edition — Double Points
            </Stamp>
          </div>
        )}
      </div>
    </div>
  );
}
