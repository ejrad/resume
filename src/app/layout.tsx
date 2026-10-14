import type { Metadata } from "next";
import { Bebas_Neue, EB_Garamond } from "next/font/google";
import "./globals.css";
import { getProfile } from "@/lib/data";

const display = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const serif = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const profile = getProfile();

export const metadata: Metadata = {
  title: `${profile.name} · Live Resume`,
  description: profile.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-serif)]">{children}</body>
    </html>
  );
}
