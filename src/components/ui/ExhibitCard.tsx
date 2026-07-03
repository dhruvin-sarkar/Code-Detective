"use client";

import {
  exhibitColorClass,
  exhibitName,
  exhibitSuit,
} from "./ExhibitMarker";
import type { CaseOption } from "@/game/protocol";

/**
 * One candidate repair, styled as an admission ticket: a colored suit
 * stub behind a perforated rule, then the proposed line. Interactive on
 * the player's device (pass onPick); static evidence on the host board.
 */
export default function ExhibitCard({
  option,
  index,
  refuted = false,
  pending = false,
  locked = false,
  onPick,
}: {
  option: CaseOption;
  index: number;
  refuted?: boolean;
  /** This card's submission is in flight — show it pressed down. */
  pending?: boolean;
  /** Any submission is in flight — no card may be tapped. */
  locked?: boolean;
  onPick?: () => void;
}) {
  const stub = (
    <span
      className={`flex w-14 shrink-0 flex-col items-center justify-center gap-1 border-r-2 border-dashed border-ink-soft ${exhibitColorClass(index)} text-paper`}
    >
      <span className="text-3xl leading-none" aria-hidden>
        {exhibitSuit(index)}
      </span>
      <span className="smallcaps text-[8px] leading-none opacity-80" aria-hidden>
        {exhibitName(index)}
      </span>
    </span>
  );

  const body = (
    <span className="min-w-0 grow px-3 py-2.5">
      <span className="smallcaps block text-[10px] text-sepia">
        proposes for line {option.line}
        {refuted ? " — refuted" : ""}
      </span>
      <code className="block whitespace-pre-wrap break-words font-code text-sm font-bold leading-snug xl:text-base">
        {option.text}
      </code>
      {option.note && (
        <span className="block text-[11px] italic text-ink-soft">
          {option.note}
        </span>
      )}
    </span>
  );

  if (!onPick) {
    return (
      <div className="plate flex min-h-[64px] items-stretch">
        {stub}
        {body}
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={refuted || locked}
      onClick={onPick}
      aria-label={`Submit the ${exhibitName(index)} exhibit: ${option.text}`}
      className={`plate plate-press flex min-h-[72px] w-full items-stretch text-left ${
        refuted ? "pointer-events-none opacity-35" : ""
      } ${pending ? "translate-x-[4px] translate-y-[4px]" : ""}`}
    >
      {stub}
      {body}
    </button>
  );
}
