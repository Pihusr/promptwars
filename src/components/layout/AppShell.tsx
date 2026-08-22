import * as React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

export interface AppShellProps {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
}

export function AppShell({
  children,
  className,
  showFooter = true,
}: AppShellProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#070A13] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Subtle Ambient Background Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Emerald ambient top glow */}
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />
        {/* Navy/Cyan ambient right glow */}
        <div className="absolute top-1/3 -right-20 h-[600px] w-[600px] rounded-full bg-cyan-500/[0.03] blur-[140px]" />
        {/* Subtle Red ambient bottom-left glow */}
        <div className="absolute -bottom-20 left-10 h-[500px] w-[500px] rounded-full bg-red-500/[0.025] blur-[130px]" />
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      </div>

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className={cn("relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10", className)}>
        {children}
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
}
