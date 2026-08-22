import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Where Do I Begin? | Student Skill-to-Career Navigator",
  description:
    "Helping college students bridge the gap from their current skill level to their dream tech careers through tailored diagnostics, roadmaps, and milestones.",
  keywords: [
    "student careers",
    "skill roadmap",
    "developer roadmap",
    "skill gap analysis",
    "tech careers",
    "college students",
    "skill assessment",
  ],
};

export const viewport: Viewport = {
  themeColor: "#070A13",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-[#070A13] text-slate-100 min-h-screen">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
