"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { SkillLevel } from "@/components/ui/SkillLevel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Compass,
  ArrowRight,
  Target,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Map,
  BookOpen,
  Users,
  Sparkles,
  Zap,
  ArrowDown,
  Layers,
  GraduationCap,
  TrendingUp,
  Cpu,
  ShieldAlert,
  Search,
  ExternalLink,
  ChevronRight,
  Clock,
  Award,
} from "lucide-react";

// Interactive Simulator Mock Roles
const SIMULATOR_ROLES = [
  {
    id: "fullstack",
    title: "Full-Stack Web & Cloud",
    tagline: "React, Next.js, Node.js, PostgreSQL, Docker",
    readiness: 62,
    gap: 38,
    timeEst: "8 Weeks",
    currentSkills: [
      { name: "JavaScript / TypeScript", level: "intermediate" as const, target: "master" as const, match: 80 },
      { name: "HTML5 & Tailwind CSS", level: "advanced" as const, target: "master" as const, match: 90 },
      { name: "Git & Version Control", level: "intermediate" as const, target: "advanced" as const, match: 75 },
    ],
    gapSkills: [
      { name: "Next.js App Router (RSC)", level: "beginner" as const, target: "advanced" as const, gapScore: 60, status: "Critical Gap" },
      { name: "Docker & Containerization", level: "beginner" as const, target: "intermediate" as const, gapScore: 70, status: "High Priority" },
      { name: "PostgreSQL Query Optimization", level: "beginner" as const, target: "advanced" as const, gapScore: 65, status: "High Priority" },
    ],
    roadmapPhases: [
      { phase: "Phase 1", title: "Next.js 15 Server Components & Route Handlers", duration: "Wks 1-2", status: "Immediate Focus" },
      { phase: "Phase 2", title: "PostgreSQL Schemas, Indexing & Prisma ORM", duration: "Wks 3-4", status: "Prerequisite of Ph. 3" },
      { phase: "Phase 3", title: "Async Message Queues & Microservice APIs", duration: "Wks 5-6", status: "Upcoming" },
      { phase: "Phase 4", title: "Docker Deployment & Cloud CI/CD Actions", duration: "Wks 7-8", status: "Capstone Goal" },
    ],
  },
  {
    id: "ai-engineer",
    title: "AI & Machine Learning",
    tagline: "Python, PyTorch, Vector Search, LLM Pipelines",
    readiness: 48,
    gap: 52,
    timeEst: "10 Weeks",
    currentSkills: [
      { name: "Python Programming", level: "intermediate" as const, target: "master" as const, match: 85 },
      { name: "Data Structures & Algorithms", level: "intermediate" as const, target: "advanced" as const, match: 70 },
      { name: "Basic Statistics & Probability", level: "intermediate" as const, target: "advanced" as const, match: 65 },
    ],
    gapSkills: [
      { name: "Neural Networks & PyTorch", level: "beginner" as const, target: "advanced" as const, gapScore: 75, status: "Critical Gap" },
      { name: "Vector Databases & Embeddings", level: "beginner" as const, target: "advanced" as const, gapScore: 80, status: "Critical Gap" },
      { name: "Model Deployment & FastAPI", level: "beginner" as const, target: "intermediate" as const, gapScore: 60, status: "High Priority" },
    ],
    roadmapPhases: [
      { phase: "Phase 1", title: "Data Pipelines with Pandas & Matrix Math", duration: "Wks 1-3", status: "Immediate Focus" },
      { phase: "Phase 2", title: "Supervised & Deep Learning with PyTorch", duration: "Wks 4-6", status: "Prerequisite of Ph. 3" },
      { phase: "Phase 3", title: "RAG Architecture, Vector DBs & LangChain", duration: "Wks 7-8", status: "Upcoming" },
      { phase: "Phase 4", title: "Model Inference Microservice Deployment", duration: "Wks 9-10", status: "Capstone Goal" },
    ],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Defense",
    tagline: "Linux CLI, OWASP Top 10, Auth Protocols, Auditing",
    readiness: 55,
    gap: 45,
    timeEst: "7 Weeks",
    currentSkills: [
      { name: "Linux Command Line & Shell", level: "intermediate" as const, target: "advanced" as const, match: 75 },
      { name: "Networking Fundamentals", level: "intermediate" as const, target: "advanced" as const, match: 70 },
      { name: "Python Scripting", level: "intermediate" as const, target: "intermediate" as const, match: 80 },
    ],
    gapSkills: [
      { name: "OWASP Web Security Audits", level: "beginner" as const, target: "master" as const, gapScore: 80, status: "Critical Gap" },
      { name: "OAuth2, JWT & Identity Security", level: "beginner" as const, target: "advanced" as const, gapScore: 65, status: "High Priority" },
      { name: "Cloud IAM & Network Isolation", level: "beginner" as const, target: "intermediate" as const, gapScore: 55, status: "High Priority" },
    ],
    roadmapPhases: [
      { phase: "Phase 1", title: "Web Vulnerability Hands-on Labs (OWASP)", duration: "Wks 1-2", status: "Immediate Focus" },
      { phase: "Phase 2", title: "Cryptography, Auth Tokens & Secure Headers", duration: "Wks 3-4", status: "Prerequisite of Ph. 3" },
      { phase: "Phase 3", title: "Network Packet Analysis & Firewall Config", duration: "Wks 5-6", status: "Upcoming" },
      { phase: "Phase 4", title: "Collegiate CTF Defense Competition Project", duration: "Wks 7", status: "Capstone Goal" },
    ],
  },
];

export default function HomePage() {
  const [selectedRole, setSelectedRole] = React.useState(SIMULATOR_ROLES[0]);

  // Smooth scroll handler for secondary CTA
  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-24 md:space-y-32 py-4">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (10-Second Value Proposition) */}
      {/* ========================================================================= */}
      <section
        aria-label="Hero Introduction"
        className="relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-b from-navy-900/90 via-navy-950/95 to-[#070A13] p-6 sm:p-10 md:p-16 shadow-2xl backdrop-blur-md"
      >
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none motion-safe:animate-pulse" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-96 w-96 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-4xl space-y-7">
          {/* Badge indicator */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="glow-green" size="md" dot dotColor="green">
              Built for College Engineers
            </Badge>
            <Badge variant="outline" size="md">
              Prerequisite-Driven Acceleration
            </Badge>
          </div>

          {/* Core Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            You know where you want to go.{" "}
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              We tell you where to begin.
            </span>
          </h1>

          {/* Short Explanation */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
            Stop wasting semesters drowning in endless tutorial loops. We benchmark your current baseline, pinpoint your critical skill deficits, and generate your fastest mathematical path to an industry-ready tech career.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/onboarding">
              <Button
                size="lg"
                variant="primary"
                className="text-base px-7 h-13 shadow-glow-green"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                aria-label="Build My Personalized Roadmap"
              >
                Build My Roadmap
              </Button>
            </Link>
            <a href="#how-it-works" onClick={scrollToHowItWorks}>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-6 h-13 border-slate-700 hover:border-slate-500 text-slate-200"
                rightIcon={<ArrowDown className="h-4 w-4 text-emerald-400" />}
                aria-label="Scroll to See How It Works"
              >
                See How It Works
              </Button>
            </a>
          </div>
        </div>

        {/* Live Telemetry Preview Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">
              Diagnostic Precision
            </span>
            <p className="text-base md:text-lg font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              1–6 Level Scale
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">
              Knowledge Graph
            </span>
            <p className="text-base md:text-lg font-bold text-emerald-400 font-mono flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-emerald-400 shrink-0" />
              60+ Verified Skills
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">
              Gap Detection
            </span>
            <p className="text-base md:text-lg font-bold text-red-400 font-mono flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-red-400 shrink-0" />
              Prerequisite Mapping
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 uppercase font-mono tracking-wider">
              Target Timeframe
            </span>
            <p className="text-base md:text-lg font-bold text-cyan-300 font-mono flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
              Custom Weekly Sprints
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE PROBLEM SECTION: Students Don't Lack Resources. They Lack Direction */}
      {/* ========================================================================= */}
      <section aria-labelledby="problem-heading" className="space-y-8">
        <SectionHeader
          id="problem-heading"
          badgeText="The Real Student Bottleneck"
          badgeVariant="glow-red"
          title="Students don't lack resources. They lack direction."
          description="Every college student has access to 10,000+ free courses and YouTube tutorials. Yet most remain unprepared for interviews because nobody diagnosed their missing prerequisites."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem Card: The Old Way (Red Deficit Accent) */}
          <Card variant="glow-red" className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-950/60 border border-red-500/40 text-red-400 shadow-glow-red/20">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">The Fragmented Way</h3>
                  <span className="text-xs text-red-400 font-mono">Random Tutorial Hopping</span>
                </div>
              </div>
              <Badge variant="danger" size="sm">High Churn</Badge>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-red-400 shrink-0 mt-1.5 shadow-glow-red" />
                <span>
                  <strong>Overwhelmed by Noise:</strong> Starting massive 60-hour courses only to abandon them at 20% when unmastered prerequisites hit.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-red-400 shrink-0 mt-1.5 shadow-glow-red" />
                <span>
                  <strong>False Sense of Competence:</strong> Copy-pasting code alongside video tutorials without building autonomous problem-solving muscles.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-red-400 shrink-0 mt-1.5 shadow-glow-red" />
                <span>
                  <strong>Blind Application Rejections:</strong> Submitting 200+ resumes with hidden gaps in production-grade concepts like indexing and async queues.
                </span>
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-800/80">
              <ProgressBar
                value={25}
                gapValue={75}
                variant="red"
                size="md"
                showLabel
                label="Average Completion Rate without Roadmap"
              />
            </div>
          </Card>

          {/* Solution Card: The Where Do I Begin? Way (Emerald Green Accent) */}
          <Card variant="glow-green" className="p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 shadow-glow-green/20">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">The "Where Do I Begin?" Way</h3>
                  <span className="text-xs text-emerald-400 font-mono">Prerequisite Graph Alignment</span>
                </div>
              </div>
              <Badge variant="success" size="sm">Structured Mastery</Badge>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0 mt-1.5 shadow-glow-green" />
                <span>
                  <strong>Precision Baseline:</strong> We diagnose your exact 1–6 skill tier so you skip fundamentals you already know.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0 mt-1.5 shadow-glow-green" />
                <span>
                  <strong>Sequential Milestones:</strong> Learn every topic in the exact topological order required by real production systems.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0 mt-1.5 shadow-glow-green" />
                <span>
                  <strong>Blended Campus & Peer Execution:</strong> Leverage vetted courses, TIET societies, and study squads to build milestone projects.
                </span>
              </li>
            </ul>

            <div className="pt-2 border-t border-slate-800/80">
              <ProgressBar
                value={85}
                variant="emerald"
                size="md"
                showLabel
                label="Roadmap Milestone Velocity"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THREE-STEP EXPLANATION: CURRENT → TARGET → PATH */}
      {/* ========================================================================= */}
      <section id="how-it-works" aria-labelledby="steps-heading" className="space-y-10 scroll-mt-24">
        <SectionHeader
          id="steps-heading"
          badgeText="Simple 3-Step Methodology"
          badgeVariant="glow-green"
          title="From where you stand to where you belong"
          description="Three logical steps that turn abstract career ambition into actionable, sprint-by-sprint engineering mastery."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Step 1: CURRENT */}
          <Card variant="interactive" className="p-6 space-y-4 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-emerald-400/30">01</span>
                <Badge variant="glow-green" size="sm">Baseline</Badge>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  CURRENT
                </h3>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Diagnostic Evaluation
                </p>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Take a 5-minute diagnostic to benchmark your verified competencies across frontend, backend, databases, and cognitive soft skills on a 1–6 proficiency scale.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 text-xs text-emerald-400 font-mono">
              ✓ Pinpoints exact knowledge frontier
            </div>
          </Card>

          {/* Step 2: TARGET */}
          <Card variant="interactive" className="p-6 space-y-4 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-cyan-400/30">02</span>
                <Badge variant="info" size="sm">Destination</Badge>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Target className="h-5 w-5 text-cyan-400" />
                  TARGET
                </h3>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Role Rubric Deconstruction
                </p>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Choose your dream career destination. We map the exact industry criteria, production patterns, and target proficiency tiers expected by top tech recruiters.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 text-xs text-cyan-400 font-mono">
              ✓ Deconstructs real hiring bars
            </div>
          </Card>

          {/* Step 3: PATH */}
          <Card variant="interactive" className="p-6 space-y-4 relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-black text-red-400/30">03</span>
                <Badge variant="glow-red" size="sm">Execution</Badge>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <Map className="h-5 w-5 text-red-400" />
                  PATH
                </h3>
                <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                  Prerequisite-Ordered Roadmap
                </p>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Receive your custom milestone sequence. Each sprint pairs you with top vetted materials, campus lab resources, and peer study squads to build proof-of-work projects.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-800/80 text-xs text-red-400 font-mono">
              ✓ Zero unlearned prerequisites
            </div>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE VISUAL WIDGET: Current Skills → Skill Gaps → Roadmap */}
      {/* ========================================================================= */}
      <section aria-labelledby="interactive-heading" className="space-y-8">
        <SectionHeader
          id="interactive-heading"
          badgeText="Live Interactive Visualizer"
          badgeVariant="glow-green"
          title="See how your skill gap translates into a roadmap"
          description="Select a career track below to see how our engine calculates readiness deltas and assembles your prerequisite milestone sequence."
        />

        {/* Role Selector Tabs */}
        <div className="flex flex-wrap gap-3 pb-1" role="tablist" aria-label="Career track selector">
          {SIMULATOR_ROLES.map((role) => {
            const isSelected = selectedRole.id === role.id;
            return (
              <button
                key={role.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedRole(role)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? "bg-emerald-500 text-navy-950 shadow-glow-green border border-emerald-400"
                    : "bg-navy-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-navy-850 hover:text-white"
                }`}
              >
                <Target className={`h-4 w-4 ${isSelected ? "text-navy-950" : "text-emerald-400"}`} />
                <span>{role.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive 3-Panel Visual System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Panel A: Verified Baseline (Green) */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 bg-navy-900/90 border-slate-800 h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> 1. Verified Baseline
                  </span>
                  <Badge variant="glow-green" size="sm">{selectedRole.readiness}% Match</Badge>
                </div>
                <h4 className="text-base font-bold text-white">Skills You Already Have</h4>
                <p className="text-xs text-slate-400">
                  Calculated from diagnostic baseline. No need to waste time relearning these.
                </p>

                <div className="space-y-3 pt-2">
                  {selectedRole.currentSkills.map((sk) => (
                    <div key={sk.name} className="p-3 rounded-lg bg-navy-950 border border-emerald-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{sk.name}</span>
                        <span className="text-emerald-400 font-mono font-bold">{sk.match}%</span>
                      </div>
                      <ProgressBar value={sk.match} variant="emerald" size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                ✓ Ready to bridge to next tier
              </div>
            </Card>
          </div>

          {/* Panel B: Critical Skill Gaps (Red) */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 bg-navy-900/90 border-red-500/30 shadow-glow-red/20 h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono text-red-400 font-bold flex items-center gap-1.5">
                    <Flame className="h-4 w-4" /> 2. Critical Skill Gaps
                  </span>
                  <Badge variant="glow-red" size="sm">-{selectedRole.gap}% Deficit</Badge>
                </div>
                <h4 className="text-base font-bold text-white">Prerequisite Deficits</h4>
                <p className="text-xs text-slate-400">
                  Identified deficits blocking you from clearing junior technical screens.
                </p>

                <div className="space-y-3 pt-2">
                  {selectedRole.gapSkills.map((gap) => (
                    <div key={gap.name} className="p-3 rounded-lg bg-navy-950 border border-red-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{gap.name}</span>
                        <Badge variant="danger" size="sm">{gap.status}</Badge>
                      </div>
                      <ProgressBar value={100 - gap.gapScore} gapValue={gap.gapScore} variant="dual" size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-red-400 font-mono">
                ⚠ Prioritized in custom learning sequence
              </div>
            </Card>
          </div>

          {/* Panel C: Generated Personalized Roadmap */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="p-5 bg-navy-900/90 border-slate-800 h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                    <Map className="h-4 w-4" /> 3. Personalized Roadmap
                  </span>
                  <Badge variant="info" size="sm">{selectedRole.timeEst}</Badge>
                </div>
                <h4 className="text-base font-bold text-white">Prerequisite Sequence</h4>
                <p className="text-xs text-slate-400">
                  Ordered milestone sprints designed to close all gaps with zero roadblocks.
                </p>

                <div className="space-y-2.5 pt-2">
                  {selectedRole.roadmapPhases.map((phase, idx) => (
                    <div
                      key={phase.phase}
                      className={`p-3 rounded-lg border text-xs space-y-1 ${
                        idx === 0
                          ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                          : "bg-navy-950 border-slate-800 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="font-bold text-emerald-400">{phase.phase} • {phase.duration}</span>
                        <span className="text-slate-400">{phase.status}</span>
                      </div>
                      <p className="font-medium text-white">{phase.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <Link href="/onboarding" className="block w-full">
                  <Button variant="primary" size="sm" className="w-full justify-center">
                    Generate My Custom Version →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FEATURE CARDS GRID (4 Key Product Pillars) */}
      {/* ========================================================================= */}
      <section aria-labelledby="features-heading" className="space-y-8">
        <SectionHeader
          id="features-heading"
          badgeText="Engineered For Execution"
          badgeVariant="glow-green"
          title="Everything you need to reach industry-grade competence"
          description="Designed to systematically eliminate tutorial paralysis and build high-confidence student developers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature 1: Skill Gap Analysis */}
          <Card variant="interactive" className="p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shadow-glow-green/20">
                <Flame className="h-6 w-6 text-red-400" />
              </div>
              <Badge variant="glow-red" size="sm">Diagnostic Core</Badge>
            </div>
            <h3 className="text-xl font-bold text-white">Skill Gap Analysis</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We separate surface-level syntax knowledge from deep production competence. By comparing your baseline to real junior job rubrics, you always know the exact deficit standing between you and an offer.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> 1–6 Discrete Proficiency Calibration
            </div>
          </Card>

          {/* Feature 2: Personalized Roadmaps */}
          <Card variant="interactive" className="p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shadow-glow-cyan/20">
                <Map className="h-6 w-6" />
              </div>
              <Badge variant="info" size="sm">Prerequisite Engine</Badge>
            </div>
            <h3 className="text-xl font-bold text-white">Personalized Roadmaps</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              No two students have the same background. Our knowledge graph calculates dependency weights so you never attempt complex concepts before mastering their foundational building blocks.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-cyan-400">
              <CheckCircle2 className="h-4 w-4" /> Custom 4-Phase Milestone Sequencing
            </div>
          </Card>

          {/* Feature 3: College + Online Resources */}
          <Card variant="interactive" className="p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 border border-slate-700 text-emerald-400">
                <GraduationCap className="h-6 w-6" />
              </div>
              <Badge variant="glow-green" size="sm">TIET + Global</Badge>
            </div>
            <h3 className="text-xl font-bold text-white">College + Online Resources</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Why learn alone online when campus resources exist? We bridge top interactive courses (Next.js, Fast.ai, CS50) with verified campus societies (CCS TIET, ACM, OWASP) and prototyping labs.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> Blended Campus & Open-Source Curriculum
            </div>
          </Card>

          {/* Feature 4: Find Your People */}
          <Card variant="interactive" className="p-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400">
                <Users className="h-6 w-6" />
              </div>
              <Badge variant="outline" size="sm">Peer Accountability</Badge>
            </div>
            <h3 className="text-xl font-bold text-white">Find Your People</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Milestone completion speeds triple when you build in squads. Match with campus peers sharing your target career goal to build hackathon projects, conduct mock reviews, and keep each other accountable.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-purple-400">
              <CheckCircle2 className="h-4 w-4" /> Goal-Aligned Study Squads
            </div>
          </Card>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section
        aria-label="Final Call to Action"
        className="relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-navy-900 via-navy-950 to-[#070A13] p-8 sm:p-12 md:p-16 text-center shadow-glow-green/30"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <Badge variant="glow-green" size="md" dot dotColor="green">
            Start Today • Free for Students
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Stop wondering where to start.{" "}
            <span className="block mt-1 text-emerald-400">Build your roadmap now.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join hundreds of collegiate builders mastering real skills, closing knowledge gaps, and preparing for high-impact engineering careers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/onboarding">
              <Button
                size="lg"
                variant="primary"
                className="text-base px-8 h-13 shadow-glow-green"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Build My Roadmap
              </Button>
            </Link>
            <Link href="/assessment">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-6 h-13 border-slate-700 text-slate-300 hover:text-white"
                leftIcon={<Flame className="h-4 w-4 text-red-400" />}
              >
                Take Skill Diagnostic
              </Button>
            </Link>
          </div>

          <p className="text-xs text-slate-500 pt-3 font-mono">
            No credit card required • Designed for hackathons & campus accelerators
          </p>
        </div>
      </section>
    </div>
  );
}
