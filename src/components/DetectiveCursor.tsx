"use client";

import { useEffect, useState } from "react";

import TargetCursor from "./TargetCursor";

/** Mirrors TargetCursor's own mobile check so the html class stays in sync. */
function isMobileLike(): boolean {
  const hasTouchScreen =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const isSmallScreen = window.innerWidth <= 768;
  const isMobileUserAgent =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      navigator.userAgent.toLowerCase(),
    );
  return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
}

/**
 * TargetCursor in the palette colorway (DESIGN.md -> React Bits).
 * Not rendered under prefers-reduced-motion or on touch devices.
 * While active, the `cursor-hidden` class on <html> suppresses every
 * native cursor (pointer over buttons, I-beam over the evidence text) —
 * the detective's reticle is the only cursor on the page.
 */
export default function DetectiveCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!media.matches && !isMobileLike());
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("cursor-hidden", enabled);
    return () => document.documentElement.classList.remove("cursor-hidden");
  }, [enabled]);

  if (!enabled) return null;

  return (
    <TargetCursor
      spinDuration={5}
      hideDefaultCursor={true}
      parallaxOn={true}
      cursorColor="#1F1B14"
      cursorColorOnTarget="#9E2B25"
    />
  );
}
