import Link from "next/link";

import Stamp from "@/components/ui/Stamp";
import Watermark from "@/components/ui/Watermark";
import WaxSeal from "@/components/ui/WaxSeal";
import type { RoomStatePublic } from "@/game/protocol";

/** Podium in reverse: 3rd, 2nd, a drumroll pause, then 1st (GAME.md). */
export default function HostFinal({ state }: { state: RoomStatePublic }) {
  const podium = state.podium ?? [];
  const [first, second, third] = podium;
  const awards = state.awards;

  return (
    <div className="relative mx-auto mt-6 max-w-5xl text-center">
      <Watermark glyph="❦" />
      <div className="flex justify-center">
        <Stamp animate className="text-3xl">
          Case Closed
        </Stamp>
      </div>
      <h2 className="mt-6 font-display text-4xl font-black uppercase sm:text-5xl">
        The Final Verdict.
      </h2>

      <div className="mt-10 flex items-end justify-center gap-4 sm:gap-8">
        {second && (
          <div className="anim-fade-up anim-delay-podium-2 w-40 sm:w-52">
            <p className="font-typewriter text-lg">{second.name}</p>
            <p className="font-display text-2xl font-bold tabular-nums">
              {second.score}
            </p>
            <div className="plate mt-2 flex h-28 items-center justify-center">
              <span className="font-display text-5xl font-black text-sepia">2</span>
            </div>
          </div>
        )}
        {first && (
          <div className="anim-fade-up anim-delay-podium-1 w-44 sm:w-60">
            <div className="mb-2 flex justify-center">
              <WaxSeal size={56} />
            </div>
            <p className="font-typewriter text-xl font-bold">{first.name}</p>
            <p className="font-display text-3xl font-black tabular-nums text-oxblood">
              {first.score}
            </p>
            <div className="plate mt-2 flex h-40 items-center justify-center border-oxblood">
              <span className="font-display text-7xl font-black text-oxblood">1</span>
            </div>
          </div>
        )}
        {third && (
          <div className="anim-fade-up anim-delay-podium-3 w-36 sm:w-48">
            <p className="font-typewriter text-lg">{third.name}</p>
            <p className="font-display text-2xl font-bold tabular-nums">
              {third.score}
            </p>
            <div className="plate mt-2 flex h-20 items-center justify-center">
              <span className="font-display text-4xl font-black text-sepia">3</span>
            </div>
          </div>
        )}
      </div>

      {awards && (
        <div className="anim-fade-up anim-delay-awards mt-12">
          <div className="rule-oxford" />
          <h3 className="smallcaps py-2 font-body text-lg font-bold">
            Commendations from the Chief Inspector.
          </h3>
          <div className="rule-oxford rotate-180" />
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {awards.fastestSolve && (
              <AwardCard
                title="Fastest Solve"
                name={awards.fastestSolve.playerName}
                detail={awards.fastestSolve.detail}
              />
            )}
            {awards.ironStreak && (
              <AwardCard
                title="Iron Streak"
                name={awards.ironStreak.playerName}
                detail={awards.ironStreak.detail}
              />
            )}
            {awards.sharpestRebound && (
              <AwardCard
                title="Sharpest Rebound"
                name={awards.sharpestRebound.playerName}
                detail={awards.sharpestRebound.detail}
              />
            )}
          </div>
        </div>
      )}

      <p className="mt-12">
        <Link
          href="/"
          className="manicule cursor-target font-body text-lg italic text-oxblood underline-offset-2 hover:underline"
        >
          Return to the front page for a fresh edition
        </Link>
      </p>
    </div>
  );
}

function AwardCard({
  title,
  name,
  detail,
}: {
  title: string;
  name: string;
  detail: string;
}) {
  return (
    <div className="rule-double bg-paper-aged px-4 py-3">
      <p className="smallcaps text-xs font-bold text-brass">{title}</p>
    <p className="mt-1 font-typewriter text-lg">{name}</p>
      <p className="text-sm italic text-ink-soft">{detail}</p>
    </div>
  );
}
