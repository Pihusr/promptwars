"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Compass,
  LayoutDashboard,
  Map,
  BookOpen,
  Users,
  User,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Flame,
} from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Roadmap", href: "/roadmap", icon: Map },
  { label: "Resources", href: "/resources", icon: BookOpen },
  { label: "Community", href: "/community", icon: Users },
  { label: "Profile", href: "/profile", icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close mobile menu when pathname changes
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#070A13]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-glow-green text-navy-950 font-black">
            <Compass className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Where Do I Begin?
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PRO
              </span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 tracking-wide">
              Skill-to-Career Navigator
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-150",
                  isActive
                    ? "text-emerald-400 bg-emerald-500/10 font-semibold border border-emerald-500/30 shadow-glow-green/20"
                    : "text-slate-300 hover:text-white hover:bg-navy-800/60"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-emerald-400" : "text-slate-400")} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-emerald-400 rounded-full shadow-glow-green" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right CTA / Action */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/assessment">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Flame className="h-3.5 w-3.5 text-red-400" />}
              className="border-red-500/30 hover:border-red-500/60 text-slate-200"
            >
              Take Skill Diagnostic
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ChevronRight className="h-3.5 w-3.5" />}
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/assessment">
            <Button variant="outline" size="sm" className="h-8 px-2 text-xs border-slate-700">
              Diagnostic
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-navy-900 text-slate-300 hover:bg-navy-800 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-navy-950/95 px-4 py-5 backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="space-y-1.5">
            {NAV_LINKS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30"
                      : "text-slate-300 hover:bg-navy-800 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-4 w-4", isActive ? "text-emerald-400" : "text-slate-400")} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <Badge variant="glow-green" size="sm">Active</Badge>}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
            <Link href="/onboarding" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Launch Onboarding
              </Button>
            </Link>
            <Link href="/assessment" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center border-slate-700">
                Run Skill Assessment
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
