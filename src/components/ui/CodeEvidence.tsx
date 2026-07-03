/**
 * The crime scene: numbered typewritten source on an aged plate.
 * `culpritLine` (reveal only) gets the lens highlight.
 */
export default function CodeEvidence({
  code,
  culpritLine = null,
  board = false,
}: {
  code: string;
  culpritLine?: number | null;
  board?: boolean;
}) {
  const lines = code.split("\n");
  const numWidth = String(lines.length).length;

  return (
    <figure className="rule-double bg-paper-aged">
      <figcaption className="smallcaps flex items-center justify-between border-b border-ink-soft px-3 py-1.5 text-[11px] text-sepia">
        <span>Exhibit — the source, as recovered</span>
        <span className="font-typewriter">crime_scene.py</span>
      </figcaption>
      <pre
        className={`overflow-x-auto px-3 py-3 font-code leading-relaxed ${
          board ? "text-base xl:text-lg 2xl:text-xl" : "text-[13px]"
        }`}
      >
        {lines.map((line, i) => {
          const n = i + 1;
          const isCulprit = culpritLine === n;
          return (
            <div
              key={n}
              className={
                isCulprit
                  ? "-mx-3 border-l-4 border-oxblood bg-paper px-3 font-bold"
                  : ""
              }
            >
              <span className="select-none pr-3 text-sepia">
                {String(n).padStart(numWidth, " ")}
              </span>
              <span className={isCulprit ? "text-oxblood" : ""}>
                {line === "" ? " " : line}
              </span>
              {isCulprit && (
                <span className="smallcaps pl-3 text-[10px] text-oxblood">
                  ← the culprit
                </span>
              )}
            </div>
          );
        })}
      </pre>
    </figure>
  );
}
