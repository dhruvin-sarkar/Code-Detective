import Stamp from "./Stamp";

/** The captured run: stdout or traceback, as a torn-off report slip. */
export default function OutputSlip({
  output,
  crashed = false,
  heading = "Observed at the scene",
  board = false,
}: {
  output: string;
  crashed?: boolean;
  heading?: string;
  board?: boolean;
}) {
  return (
    <figure className="plate relative">
      <figcaption className="smallcaps flex items-center justify-between border-b-2 border-dashed border-ink-soft px-3 py-1.5 text-[11px] text-sepia">
        <span>{heading}.</span>
        {crashed && <Stamp className="text-lg">Crashed</Stamp>}
      </figcaption>
      <pre
        className={`overflow-x-auto whitespace-pre-wrap px-3 py-3 font-code leading-relaxed ${
          board ? "text-base xl:text-lg 2xl:text-xl" : "text-[13px]"
        } ${crashed ? "text-oxblood" : "text-ink"}`}
      >
        {output.trimEnd()}
      </pre>
    </figure>
  );
}
