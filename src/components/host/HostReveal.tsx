import CodeEvidence from "@/components/ui/CodeEvidence";
import Histogram from "@/components/ui/Histogram";
import OutputSlip from "@/components/ui/OutputSlip";
import type { RoomStatePublic } from "@/game/protocol";

/** Staged reveal: distribution -> culprit -> repair -> explanation. */
export default function HostReveal({ state }: { state: RoomStatePublic }) {
  const caseFile = state.currentCase;
  const reveal = state.reveal;

  if (!caseFile || !reveal) return null;

  return (
    <div className="mx-auto mt-4 max-w-7xl">
      <section className="anim-fade-up">
        {reveal.histogram && reveal.correctOption !== null && caseFile.options ? (
          <>
            <h3 className="smallcaps mb-3 text-center font-body text-lg font-bold">
              How the room voted.
            </h3>
            <Histogram
              options={caseFile.options}
              counts={reveal.histogram}
              correctOption={reveal.correctOption}
            />
          </>
        ) : (
          <p className="text-center font-display text-3xl font-bold">
            {reveal.solvedCount} of {reveal.attemptedCount || state.players.length}{" "}
            detectives cracked it.
          </p>
        )}
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <section className="anim-fade-up anim-delay-3 lg:col-span-3">
          <CodeEvidence
            code={caseFile.code}
            culpritLine={reveal.culpritLine}
            board
          />
        </section>
        <section className="anim-fade-up anim-delay-5 space-y-4 lg:col-span-2">
          <div className="rule-double bg-paper-aged px-4 py-3">
            <p className="smallcaps text-[11px] text-sepia">the repair</p>
            <pre className="mt-1 overflow-x-auto font-code text-base font-bold text-oxblood xl:text-lg">
              {reveal.fixedLines.join("\n")}
            </pre>
          </div>
          <OutputSlip output={reveal.fixedOutput} heading="After the repair" />
        </section>
      </div>

      <section className="anim-fade-up anim-delay-6 mx-auto mt-6 max-w-3xl">
        <div className="rule-oxford" />
        <p className="justified drop-cap py-4 font-body text-lg leading-relaxed">
          {reveal.explanation}
        </p>
        <div className="rule-oxford rotate-180" />
      </section>
    </div>
  );
}
