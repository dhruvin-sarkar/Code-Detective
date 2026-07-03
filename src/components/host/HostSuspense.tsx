import Watermark from "@/components/ui/Watermark";

export default function HostSuspense() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Watermark glyph="…" />
      <p className="font-display text-4xl font-bold italic sm:text-5xl">
        The Inspector clears his throat…
      </p>
      <p className="smallcaps mt-4 text-sm text-sepia">
        the verdict follows presently
      </p>
    </div>
  );
}
