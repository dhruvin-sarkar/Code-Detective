"use client";

import { useEffect, useState } from "react";

import PlateButton from "@/components/ui/PlateButton";

/**
 * The Inspector-tier typewriter form. Everything "smart" is disabled —
 * autocorrect silently destroys code answers (GAME.md free-text rules).
 * The typed line is echoed in a confirmation state before it counts as
 * an attempt (GAME.md): type -> FILE THE FIX -> read it back -> confirm.
 */
export default function TextFixInput({
  pending,
  attemptsUsed,
  onSubmit,
}: {
  pending: boolean;
  attemptsUsed: number;
  onSubmit: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const [confirming, setConfirming] = useState(false);

  // A new attempt (wrong answer came back) reopens the editor.
  useEffect(() => {
    setConfirming(false);
  }, [attemptsUsed]);

  function fileFix(event: React.FormEvent) {
    event.preventDefault();
    if (text.trim().length === 0 || pending) return;
    setConfirming(true);
  }

  if (confirming) {
    return (
      <div className="anim-pop-in mt-4 space-y-3">
        <p className="smallcaps block text-center font-typewriter text-xs text-sepia">
          read it back before it goes in the file
        </p>
        <pre className="overflow-x-auto border-2 border-ink bg-paper-aged px-3 py-3 font-code text-lg leading-relaxed">
          {text.trim()}
        </pre>
        <div className="flex gap-2">
          <PlateButton
            onClick={() => setConfirming(false)}
            disabled={pending}
            className="flex-1"
          >
            Amend It
          </PlateButton>
          <PlateButton
            primary
            onClick={() => onSubmit(text)}
            disabled={pending}
            className="flex-1"
          >
            {pending ? "Filing…" : "File This Fix"}
          </PlateButton>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={fileFix} className="mt-4 space-y-3">
      <label
        htmlFor="fix-input"
        className="smallcaps block font-typewriter text-xs text-sepia"
      >
        Form 44 — type the repaired line, exactly as Python should read it
      </label>
      <textarea
        id="fix-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        autoCorrect="off"
        autoCapitalize="none"
        autoComplete="off"
        spellCheck={false}
        placeholder="your_fix = here"
        className="w-full border-2 border-ink bg-paper px-3 py-2 font-code text-lg leading-relaxed placeholder:text-paper-edge focus:outline-none"
      />
      <p className="text-right font-typewriter text-[11px] text-sepia">
        spacing is forgiven; spelling is not
      </p>
      <PlateButton
        type="submit"
        primary
        disabled={pending || text.trim().length === 0}
        className="w-full"
      >
        File the Fix
      </PlateButton>
    </form>
  );
}
