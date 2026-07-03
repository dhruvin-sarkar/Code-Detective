/** A discreet hint from the bureau, after a wrong theory. */
export default function HintSlip({ hint }: { hint: string }) {
  return (
    <div className="anim-pop-in border-2 border-dashed border-ink-soft bg-paper-aged px-3 py-2.5">
      <p className="smallcaps text-[10px] text-sepia">
        a note slides under the door
      </p>
      <p className="mt-1 font-typewriter text-sm leading-relaxed">{hint}</p>
    </div>
  );
}
