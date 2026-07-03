"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

import PlateButton from "@/components/ui/PlateButton";
import type { RoomStatePublic } from "@/game/protocol";

export default function HostLobby({
  room,
  state,
  onStart,
  onKick,
}: {
  room: string;
  state: RoomStatePublic;
  onStart: () => void;
  onKick: (playerId: string) => void;
}) {
  const [joinUrl, setJoinUrl] = useState("");
  useEffect(() => {
    setJoinUrl(`${window.location.origin}/play/${room}`);
  }, [room]);

  const connected = state.players.filter((p) => p.connected);

  return (
    <div className="mx-auto max-w-6xl">
      <section className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_auto]">
        <div className="text-center lg:text-left">
          <p className="smallcaps text-sm text-sepia">
            Recruits: report for duty at
          </p>
          <p className="mt-1 font-typewriter text-2xl text-ink sm:text-3xl">
            {joinUrl.replace(/^https?:\/\//, "")}
          </p>
          <p className="smallcaps mt-6 text-sm text-sepia">and quote</p>
          <p className="font-display text-7xl font-black tracking-wider sm:text-8xl lg:text-9xl">
            <span className="smallcaps mr-4 align-middle font-body text-2xl font-bold text-sepia sm:text-3xl">
              Case №
            </span>
            {room}
          </p>
          <div className="mt-6">
            <PlateButton
              primary
              onClick={onStart}
              disabled={connected.length === 0}
              className="text-xl"
            >
              {connected.length === 0
                ? "Awaiting recruits…"
                : "Begin the Investigation"}
            </PlateButton>
            <p className="smallcaps mt-2 text-xs text-sepia">
              {state.config.caseCount} cases — {state.config.tier} tier —
              double points on the final edition
            </p>
          </div>
        </div>
        <div className="plate mx-auto p-4">
          <p className="smallcaps border-b border-ink pb-2 text-center text-xs">
            Scan to join.
          </p>
          <div className="pt-3">
            {joinUrl && (
              <QRCodeSVG
                value={joinUrl}
                size={200}
                fgColor="#1F1B14"
                bgColor="transparent"
                marginSize={0}
              />
            )}
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="rule-oxford" />
        <h2 className="smallcaps py-2 text-center font-body text-lg font-bold">
          The Force Assembled — {connected.length} detective
          {connected.length === 1 ? "" : "s"}.
        </h2>
        <div className="rule-oxford rotate-180" />
        {state.players.length === 0 ? (
          <p className="mt-6 text-center italic text-ink-soft">
            The notice board is empty. It won&apos;t stay that way.
          </p>
        ) : (
          <ul className="mt-6 flex flex-wrap justify-center gap-3">
            {state.players.map((p) => (
              <li key={p.id} className="anim-pop-in">
                <button
                  type="button"
                  onClick={() => onKick(p.id)}
                  title={`Dismiss ${p.name} from the force`}
                  className={`evidence-tag cursor-target font-typewriter text-sm ${
                    p.connected ? "text-ink" : "text-sepia line-through"
                  }`}
                >
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="smallcaps mt-4 text-center text-[11px] text-sepia">
          Tap a name to dismiss it — the detective may rejoin with better manners.
        </p>
      </section>
    </div>
  );
}
