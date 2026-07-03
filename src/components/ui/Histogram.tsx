import type { CaseOption } from "@/game/protocol";

import ExhibitMarker, { exhibitSuit } from "./ExhibitMarker";

/** Reveal-phase answer distribution: ink bars, one per exhibit. */
export default function Histogram({
  options,
  counts,
  correctOption,
}: {
  options: CaseOption[];
  counts: number[];
  correctOption: number;
}) {
  const max = Math.max(1, ...counts);
  return (
    <div className="space-y-2">
      {options.map((option, i) => {
        const correct = i === correctOption;
        return (
          <div key={i} className="flex items-center gap-3">
            <ExhibitMarker index={i} />
            <div className="grow">
              <div className="flex items-baseline justify-between gap-2">
                <code
                  className={`font-code text-sm ${
                    correct ? "font-bold text-oxblood" : "text-ink-soft"
                  }`}
                >
                  {option.text}
                </code>
                <span className="font-display text-sm font-bold tabular-nums">
                  {counts[i]}
                </span>
              </div>
              <div className="mt-0.5 h-2.5 border border-ink-soft bg-paper">
                <div
                  className={`h-full ${correct ? "bg-oxblood" : "bg-sepia/60"}`}
                  style={{ width: `${(counts[i] / max) * 100}%` }}
                />
              </div>
            </div>
            {correct && (
              <span className="smallcaps shrink-0 text-xs font-bold text-oxblood">
                {exhibitSuit(i)} — the genuine repair
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
