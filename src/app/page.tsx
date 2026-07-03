"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Masthead from "@/components/ui/Masthead";
import PlateButton from "@/components/ui/PlateButton";
import Stamp from "@/components/ui/Stamp";
import { NAME_MAX_LENGTH, suggestAlias } from "@/game/names";
import type { Tier } from "@/game/protocol";
import {
  isValidRoomCode,
  randomRoomCode,
  recallName,
  rememberName,
} from "@/lib/identity";

const TIER_COPY: Record<Tier, { label: string; grades: string; blurb: string }> = {
  rookie: {
    label: "Rookie",
    grades: "Grades 6–8",
    blurb: "Plain-sight blunders. Four exhibits; pick the repair.",
  },
  detective: {
    label: "Detective",
    grades: "Grades 8–10",
    blurb: "Bugs that demand a trace. The decoys fight back.",
  },
  inspector: {
    label: "Inspector",
    grades: "Grades 10–12",
    blurb: "Python's dark corners. Type the repaired line yourself.",
  },
};

export default function FrontPage() {
  const router = useRouter();

  const [dateline, setDateline] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [joinError, setJoinError] = useState<string | null>(null);
  const [tier, setTier] = useState<Tier>("rookie");
  const [caseCount, setCaseCount] = useState<3 | 5>(5);

  useEffect(() => {
    setName(recallName());
    setDateline(
      new Date()
        .toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .toUpperCase(),
    );
  }, []);

  function joinGame(event: React.FormEvent) {
    event.preventDefault();
    if (!isValidRoomCode(code)) {
      setJoinError("A case number is five digits, Detective.");
      return;
    }
    if (name.trim().length === 0) {
      setJoinError("Every detective signs the register — enter a name.");
      return;
    }
    rememberName(name.trim());
    router.push(`/play/${code}`);
  }

  function openCaseFile() {
    router.push(`/host/${randomRoomCode()}?tier=${tier}&count=${caseCount}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-8">
      {/* Masthead */}
      <header className="anim-fade-up">
        <Masthead full />
        <div className="rule-oxford mt-3">
          <p className="smallcaps flex flex-wrap items-baseline justify-center gap-x-3 py-1.5 text-center text-[11px] text-sepia sm:text-xs">
            <span>Vol. I</span>
            <span aria-hidden>—</span>
            <span>{dateline || "THIS VERY MORNING"}</span>
            <span aria-hidden>—</span>
            <span>A bug-hunting gazette for grades 6–12</span>
          </p>
          <div className="rule-oxford rotate-180" />
        </div>
      </header>

      {/* Lead headline decks */}
      <section className="anim-fade-up anim-delay-1 mt-8 text-center">
        <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl">
          Mysterious Bugs Terrorize Local&nbsp;Codebase.
        </h2>
        <div className="mx-auto my-3 w-16 border-t border-ink" />
        <p className="font-body text-lg italic text-ink-soft sm:text-xl">
          Chief Inspector Seeks Sharp-Eyed Recruits; Handsome Rewards Offered.
        </p>
        <div className="mx-auto mt-3 w-16 border-t border-ink" />
        <p className="smallcaps mt-2 text-xs text-sepia">
          Full particulars from our correspondent, below.
        </p>
      </section>

      {/* The two classified boxes */}
      <main className="mt-10 grid gap-8 md:grid-cols-2">
        {/* REPORT FOR DUTY (join) */}
        <section className="anim-fade-up anim-delay-2 plate p-5">
          <h3 className="smallcaps border-b border-ink pb-2 text-center font-body text-xl font-bold">
            Report for Duty.
          </h3>
          <p className="mt-3 text-center text-sm italic text-ink-soft">
            Your Chief Inspector has a case number for you.
          </p>
          <form onSubmit={joinGame} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="join-code"
                className="smallcaps block font-typewriter text-xs text-sepia"
              >
                Form 27-A — Case №
              </label>
              <input
                id="join-code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 5));
                  setJoinError(null);
                }}
                inputMode="numeric"
                autoComplete="off"
                placeholder="00000"
                className="mt-1 w-full border-0 border-b-2 border-ink bg-transparent py-1 text-center font-code text-3xl tracking-[0.4em] placeholder:text-paper-edge focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="join-name"
                className="smallcaps block font-typewriter text-xs text-sepia"
              >
                Form 27-B — Name of Detective
              </label>
              <input
                id="join-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setJoinError(null);
                }}
                maxLength={NAME_MAX_LENGTH}
                autoComplete="off"
                autoCapitalize="words"
                spellCheck={false}
                placeholder="e.g. Insp. Fogg"
                className="mt-1 w-full border-0 border-b-2 border-ink bg-transparent py-1 text-center font-typewriter text-xl placeholder:text-paper-edge focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setName(suggestAlias())}
                className="manicule cursor-target mt-1.5 font-body text-sm italic text-oxblood underline-offset-2 hover:underline"
              >
                Suggest an alias
              </button>
            </div>
            {joinError && (
              <p role="alert" className="text-center font-typewriter text-sm text-stamp-red">
                {joinError}
              </p>
            )}
            <PlateButton type="submit" primary className="w-full">
              Join the Investigation
            </PlateButton>
          </form>
        </section>

        {/* OPEN A CASE FILE (host) */}
        <section className="anim-fade-up anim-delay-3 plate p-5">
          <h3 className="smallcaps border-b border-ink pb-2 text-center font-body text-xl font-bold">
            Open a Case File.
          </h3>
          <p className="mt-3 text-center text-sm italic text-ink-soft">
            For the Chief Inspector running the room — every recruit plays on
            their own device.
          </p>
          <fieldset className="mt-4">
            <legend className="smallcaps font-typewriter text-xs text-sepia">
              Form 31 — Difficulty of the Docket
            </legend>
            <div className="mt-2 space-y-2">
              {(Object.keys(TIER_COPY) as Tier[]).map((t) => (
                <label
                  key={t}
                  className={`cursor-target flex cursor-pointer items-baseline gap-3 border px-3 py-2 ${
                    tier === t
                      ? "border-oxblood bg-paper-aged"
                      : "hairline border"
                  }`}
                >
                  <input
                    type="radio"
                    name="tier"
                    value={t}
                    checked={tier === t}
                    onChange={() => setTier(t)}
                    className="sr-only"
                  />
                  <span
                    className={`font-display text-lg font-bold ${
                      tier === t ? "text-oxblood" : ""
                    }`}
                  >
                    {TIER_COPY[t].label}
                  </span>
                  <span className="smallcaps whitespace-nowrap text-xs text-sepia">
                    {TIER_COPY[t].grades}
                  </span>
                  <span className="ml-auto hidden text-right text-xs italic text-ink-soft sm:block">
                    {TIER_COPY[t].blurb}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-4">
            <legend className="smallcaps font-typewriter text-xs text-sepia">
              Form 32 — Cases on the Docket
            </legend>
            <div className="mt-2 flex gap-2">
              {([3, 5] as const).map((n) => (
                <label
                  key={n}
                  className={`cursor-target flex-1 cursor-pointer border px-3 py-2 text-center ${
                    caseCount === n
                      ? "border-oxblood bg-paper-aged"
                      : "hairline border"
                  }`}
                >
                  <input
                    type="radio"
                    name="caseCount"
                    value={n}
                    checked={caseCount === n}
                    onChange={() => setCaseCount(n)}
                    className="sr-only"
                  />
                  <span className="font-display text-lg font-bold">{n} cases</span>
                  <span className="block text-xs italic text-ink-soft">
                    {n === 3 ? "a short sitting" : "the full docket"}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-5">
            <PlateButton onClick={openCaseFile} className="w-full">
              Convene the Court
            </PlateButton>
          </div>
        </section>
      </main>

      {/* How it's played — the article columns */}
      <section className="anim-fade-up anim-delay-4 mt-12">
        <div className="rule-oxford" />
        <h3 className="smallcaps py-3 text-center font-body text-2xl font-bold">
          How the Game Is Played.
        </h3>
        <div className="rule-oxford rotate-180" />
        <div className="column-rules justified mt-5 gap-10 font-body text-[15px] leading-relaxed md:columns-3">
          <p className="drop-cap">
            Somewhere in this city, a program has gone wrong — and it has done
            so in public. Each round, the Chief Inspector pins a fresh case
            file to the board: ten to fifteen lines of honest Python, one
            seeded bug, and the very output the machine produced at the scene
            of the crime. Nothing is hypothetical. The crash you see truly
            happened.
          </p>
          <p className="mt-4">
            For a fixed reading window, the evidence stands alone and{" "}
            <em>submissions are locked</em>. This bureau does not tolerate
            guess-and-check: read the wrong output, read the traceback, form a
            theory. Only then does the investigation open — three attempts,
            scored on the fewest attempts and the swiftest correct fix. A wrong
            theory earns a discreet hint; it never earns points.
          </p>
          <p className="mt-4">
            Rookies and Detectives choose among four exhibits — candidate
            repairs, one genuine, three impostors. Inspectors enjoy no such
            courtesy: they type the repaired line themselves, on their own
            devices, while the board keeps the whole room honest. Five cases,
            a leaderboard between rounds, double points on the final edition,
            and a podium ceremony to close the night. Bring a sharp eye; the
            bugs certainly did.
          </p>
        </div>
      </section>

      <footer className="mt-12">
        <div className="rule-oxford" />
        <p className="smallcaps flex flex-wrap items-center justify-center gap-3 py-2 text-center text-[11px] text-sepia">
          <span className="font-bold text-ink">
            Produced by Dhruvin Sarkar
          </span>
          <span aria-hidden>—</span>
          <span>Printed on recycled electrons</span>
          <span aria-hidden>—</span>
          <Stamp tone="ink" className="text-[10px]">
            No bugs were harmed
          </Stamp>
        </p>
      </footer>
    </div>
  );
}
