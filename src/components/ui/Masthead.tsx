import Link from "next/link";

/** The blackletter nameplate. `full` adds the flanking ears (landing only). */
export default function Masthead({ full = false }: { full?: boolean }) {
  const plate = (
    <span className="font-masthead letterpress block text-center leading-none">
      The Code Detective
    </span>
  );

  if (!full) {
    return (
      <Link
        href="/"
        className="block text-2xl text-ink no-underline sm:text-3xl"
      >
        {plate}
      </Link>
    );
  }

  return (
    <div className="flex items-end justify-between gap-4">
      <div className="rule-double hidden shrink-0 px-3 py-2 text-center sm:block">
        <p className="smallcaps text-[10px] leading-tight">Est.</p>
        <p className="font-display text-sm font-bold leading-tight">MMXXVI</p>
      </div>
      <h1 className="min-w-0 grow text-[13vw] text-ink sm:text-7xl md:text-8xl">
        {plate}
      </h1>
      <div className="rule-double hidden shrink-0 px-3 py-2 text-center sm:block">
        <p className="smallcaps text-[10px] leading-tight">Price</p>
        <p className="font-display text-sm font-bold leading-tight">One Clue</p>
      </div>
    </div>
  );
}
