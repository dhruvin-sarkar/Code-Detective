/** A near-invisible enormous glyph behind a screen's content (DESIGN.md). */
export default function Watermark({ glyph }: { glyph: string }) {
  return (
    <div className="watermark" aria-hidden>
      <span className="text-[42vmin] leading-none">{glyph}</span>
    </div>
  );
}
