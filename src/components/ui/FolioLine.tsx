/** The metadata row bounded by Oxford rules: VOL. I — CASE № 40312 — … */
export default function FolioLine({ items }: { items: string[] }) {
  return (
    <div className="rule-oxford">
      <p className="smallcaps flex flex-wrap items-baseline justify-center gap-x-3 py-1.5 text-center text-[11px] text-sepia sm:text-xs">
        {items.map((item, i) => (
          <span key={i} className="flex items-baseline gap-x-3">
            {i > 0 && <span aria-hidden>—</span>}
            <span>{item}</span>
          </span>
        ))}
      </p>
      <div className="rule-oxford rotate-180" />
    </div>
  );
}
