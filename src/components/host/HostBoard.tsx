"use client";

import CodeEvidence from "@/components/ui/CodeEvidence";
import ExhibitCard from "@/components/ui/ExhibitCard";
import OutputSlip from "@/components/ui/OutputSlip";
import TimerFuse from "@/components/ui/TimerFuse";
import type { RoomStatePublic } from "@/game/protocol";

/** EVIDENCE + INVESTIGATION: the shared crime-scene board. */
export default function HostBoard({ state }: { state: RoomStatePublic }) {
  const caseFile = state.currentCase;
  if (!caseFile) return null;

  const investigating = state.phase === "investigation";
  const active = state.players.filter((p) => p.connected && !p.spectator);
  const readyCount = active.filter((p) => p.ready).length;
  const resolvedCount = active.filter((p) => p.resolved).length;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mt-4 flex items-center gap-6">
        <p className="smallcaps shrink-0 text-sm font-bold">
          {investigating ? (
            <span className="text-oxblood">The investigation is open.</span>
          ) : (
            <span>Evidence under review — submissions locked.</span>
          )}
        </p>
        <div className="grow">
          <TimerFuse
            endsAt={state.phaseEndsAt}
            durationMs={state.phaseDurationMs}
            paused={state.paused}
            showSeconds
          />
        </div>
        <p className="smallcaps shrink-0 text-sm text-sepia">
          {investigating
            ? `${resolvedCount} of ${active.length} cases closed`
            : `${readyCount} of ${active.length} ready`}
        </p>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CodeEvidence code={caseFile.code} board />
        </div>
        <div className="lg:col-span-2">
          <OutputSlip
            output={caseFile.brokenOutput}
            crashed={caseFile.crashed}
            board
          />
          <p className="smallcaps mt-3 text-center text-xs text-sepia">
            This is the machine&apos;s real output. It is not a re-enactment.
          </p>
        </div>
      </div>

      {investigating &&
        (caseFile.format === "mcq" && caseFile.options ? (
          <section className="mt-6">
            <div className="rule-oxford" />
            <h3 className="smallcaps py-2 text-center font-body text-base font-bold">
              The Exhibits — one repair is genuine.
            </h3>
            <div className="rule-oxford rotate-180" />
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {caseFile.options.map((option, i) => (
                <ExhibitCard
                  key={`${option.line}-${option.text}`}
                  option={option}
                  index={i}
                />
              ))}
            </div>
            <p className="mt-3 text-center font-body italic text-ink-soft">
              Answer on your own device, Detectives.
            </p>
          </section>
        ) : (
          <p className="mt-6 text-center font-body text-xl italic text-ink-soft">
            Inspectors: type the repaired line on your own device. The bureau
            is watching.
          </p>
        ))}
    </div>
  );
}
