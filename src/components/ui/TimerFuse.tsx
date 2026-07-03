"use client";

import { useEffect, useState } from "react";

/**
 * The burning-fuse rule: a bar that shortens with the phase timer,
 * turning stamp-red in the last 20%. Renders from the server's
 * phaseEndsAt — clients never decide transitions.
 */
export default function TimerFuse({
  endsAt,
  durationMs,
  paused,
  showSeconds = false,
}: {
  endsAt: number | null;
  durationMs: number | null;
  paused: boolean;
  showSeconds?: boolean;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, []);

  if (endsAt === null || durationMs === null) return null;

  const remaining = paused ? durationMs : Math.max(0, endsAt - now);
  const frac = Math.min(1, remaining / durationMs);
  const urgent = frac <= 0.2;

  return (
    <div className="flex items-center gap-3">
      <div
        className="h-[6px] grow border border-ink-soft bg-paper"
        role="timer"
        aria-label={`${Math.ceil(remaining / 1000)} seconds remaining`}
      >
        <div
          className={`fuse-bar h-full ${urgent ? "bg-stamp-red" : "bg-ink"}`}
          style={{ width: `${frac * 100}%` }}
        />
      </div>
      {showSeconds && (
        <span
          className={`w-16 shrink-0 text-right font-display text-3xl font-black tabular-nums ${
            urgent ? "text-stamp-red" : "text-ink"
          }`}
        >
          {Math.ceil(remaining / 1000)}
        </span>
      )}
    </div>
  );
}
