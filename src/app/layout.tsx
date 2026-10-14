import type { Metadata } from "next";
import "./globals.css";
import { getProfile } from "@/lib/data";

const profile = getProfile();

export const metadata: Metadata = {
  title: `${profile.name} · Resume`,
  description: profile.summary,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
