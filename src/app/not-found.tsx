import Link from "next/link";

import Masthead from "@/components/ui/Masthead";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center px-4 py-8">
      <Masthead />
      <div className="rule-double mt-8 w-full max-w-md bg-paper-aged p-6 text-center">
        <p className="font-display text-6xl font-black uppercase tracking-tight">
          Missing.
        </p>
        <div className="mx-auto my-4 w-20 border-t-2 border-ink" />
        <div className="rule-double mx-auto flex h-40 w-32 items-center justify-center bg-paper">
          <span className="font-display text-6xl text-paper-edge">?</span>
        </div>
        <p className="mt-4 font-body text-lg italic">
          The page you seek was last spotted fleeing this address.
        </p>
        <p className="smallcaps mt-4 text-sm text-sepia">
          Reward: one working hyperlink
        </p>
        <p className="mt-5">
          <Link
            href="/"
            className="manicule cursor-target font-body text-lg italic text-oxblood underline-offset-2 hover:underline"
          >
            Report the sighting at the front page
          </Link>
        </p>
      </div>
    </div>
  );
}
