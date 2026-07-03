"use client";

import ExhibitCard from "@/components/ui/ExhibitCard";
import type { CaseOption } from "@/game/protocol";

/**
 * Four exhibits as admission tickets. A tap submits and locks that
 * attempt; refuted exhibits stay visible but dead (GAME.md MCQ rules).
 */
export default function McqInput({
  options,
  wrongOptions,
  pendingOption,
  onPick,
}: {
  options: CaseOption[];
  wrongOptions: number[];
  pendingOption: number | null;
  onPick: (option: number) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="smallcaps text-center text-xs text-sepia">
        which repair is genuine? — a tap is final
      </p>
      <div className="grid gap-3">
        {options.map((option, i) => (
          <ExhibitCard
            key={`${option.line}-${option.text}`}
            option={option}
            index={i}
            refuted={wrongOptions.includes(i)}
            pending={pendingOption === i}
            locked={pendingOption !== null}
            onPick={() => onPick(i)}
          />
        ))}
      </div>
    </div>
  );
}
