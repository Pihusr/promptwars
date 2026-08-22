import * as React from "react";
import Link from "next/link";
import { Compass, Terminal, ShieldCheck, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#050811] py-8 text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-navy-950 font-bold">
                <Compass className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                Where Do I Begin?
              </span>
            </div>
            <p className="max-w-sm text-slate-400 text-xs leading-relaxed">
              Empowering college students and aspiring technologists to bridge the gap between their current skill baseline and high-impact career goals.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Diagnostic Engine Ready</span>
              <span>•</span>
              <span>v0.1 Foundation</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Core Platform
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-emerald-400 transition-colors">
                  Career Roadmap
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-emerald-400 transition-colors">
                  Curated Resources
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-emerald-400 transition-colors">
                  Student Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Pathways */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Journeys
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/onboarding" className="hover:text-emerald-400 transition-colors">
                  Student Onboarding
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="hover:text-emerald-400 transition-colors">
                  Skill Assessment
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-emerald-400 transition-colors">
                  Student Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack Info */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Architecture
            </h4>
            <div className="space-y-1 text-slate-400">
              <p className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Next.js & TypeScript
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Tailwind CSS
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <p>© {new Date().getFullYear()} Where Do I Begin? Built for Hackathons & Student Success.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Designed with high-contrast tech precision
          </p>
        </div>
      </div>
    </footer>
  );
}
