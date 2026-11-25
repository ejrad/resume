import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { assetPath } from "@/lib/assets";
import { getBasePath } from "@/lib/base-path";
import { getProfile } from "@/lib/data";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

const profile = getProfile();
const basePath = getBasePath();

export const metadata: Metadata = {
  title: `${profile.name} · Frutiger Aero Resume`,
  description: profile.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const cssVars = {
    ["--font-sans" as string]: `${nunito.style.fontFamily}, "Segoe UI", system-ui, sans-serif`,
    ["--bg-sky" as string]: `url("${assetPath("/aero/blue-sky-with-clouds.jpg", basePath)}")`,
    ["--bg-grass" as string]: `url("${assetPath("/aero/grass-bubbles.jpg", basePath)}")`,
    ["--bg-clear-sky" as string]: `url("${assetPath("/aero/clear-blue-sky.jpg", basePath)}")`,
    ["--bg-vista" as string]: `url("${assetPath("/aero/aero-vista.jpg", basePath)}")`,
    ["--bg-drops" as string]: `url("${assetPath("/aero/water-drops.jpg", basePath)}")`,
  };

  return (
    <html lang="en" className={`${nunito.variable} h-full`}>
      <body className="min-h-full" style={cssVars}>
        {children}
      </body>
    </html>
  );
}
