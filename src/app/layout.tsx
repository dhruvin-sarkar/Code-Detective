import type { Metadata } from "next";
import {
  Courier_Prime,
  Old_Standard_TT,
  Playfair_Display,
  Special_Elite,
  UnifrakturCook,
} from "next/font/google";

import DetectiveCursor from "@/components/DetectiveCursor";
import PageDecor from "@/components/PageDecor";

import "./globals.css";

const unifraktur = UnifrakturCook({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-unifraktur",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const oldStandard = Old_Standard_TT({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oldstandard",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-specialelite",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-courier",
});

export const metadata: Metadata = {
  title: "The Code Detective — A Bug-Hunting Gazette",
  description:
    "A live multiplayer debugging party game for grades 6-12. Read the evidence, form a theory, submit the fix. No guessing.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${unifraktur.variable} ${playfair.variable} ${oldStandard.variable} ${specialElite.variable} ${courierPrime.variable}`}
    >
      <body className="antialiased">
        <div className="page-frame" aria-hidden />
        <PageDecor />
        <DetectiveCursor />
        {children}
      </body>
    </html>
  );
}
