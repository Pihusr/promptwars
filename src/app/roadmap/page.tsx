import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { Map, CheckCircle2, Lock, ArrowRight, Sparkles, BookOpen, Clock } from "lucide-react";

export default function RoadmapPage() {
  const milestones = [
    {
      id: 1,
      phase: "Phase 1",
      title: "Foundational Full-Stack & Type Safety",
      status: "completed",
      progress: 100,
      skills: ["TypeScript 5.x", "React 19 Hooks", "Tailwind CSS", "REST API Design"],
      duration: "Weeks 1 - 2",
    },
    {
      id: 2,
      phase: "Phase 2",
      title: "Server Components & Modern Framework Architecture",
      status: "in-progress",
      progress: 60,
      skills: ["Next.js App Router", "Server Actions", "PostgreSQL", "Prisma/Drizzle ORM"],
      duration: "Weeks 3 - 4",
    },
    {
      id: 3,
      phase: "Phase 3",
      title: "Distributed Systems, Caching & Message Queues",
      status: "upcoming",
      progress: 0,
      skills: ["Redis", "BullMQ Async Workers", "Docker Containers", "Microservice Basics"],
      duration: "Weeks 5 - 6",
    },
    {
      id: 4,
      phase: "Phase 4",
      title: "AI Integrations, Vector Search & Production Deployment",
      status: "locked",
      progress: 0,
      skills: ["OpenAI API / LLMs", "pgvector / Embeddings", "CI/CD Actions", "Cloud Hosting"],
      duration: "Weeks 7 - 8",
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      <SectionHeader
        badgeText="Career Milestone Pathway"
        badgeVariant="glow-green"
        title="Custom Career Roadmap: Full-Stack Engineer"
        description="Structured into 4 sequential phases designed to turn your baseline skill gaps into tangible portfolio-grade mastery."
        action={
          <Link href="/assessment">
            <Button variant="outline" size="sm">
              Adjust Target Goal
            </Button>
          </Link>
        }
      />

      {/* Overall Pathway Progress Card */}
      <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white">Full-Stack AI Pathway Completion</h3>
            <p className="text-xs text-slate-400">Total estimated completion: 8 Weeks (Phase 2 Active)</p>
          </div>
          <Badge variant="glow-green" size="md">
            40% Total Pathway Complete
          </Badge>
        </div>
        <ProgressBar value={40} variant="gradient" size="lg" showLabel />
      </Card>

      {/* Roadmap Phase Timeline */}
      <div className="space-y-6">
        {milestones.map((m, idx) => (
          <div key={m.id} className="relative pl-6 md:pl-8">
            {/* Timeline vertical connector line */}
            {idx !== milestones.length - 1 && (
              <div className="absolute left-[11px] md:left-[15px] top-8 bottom-0 w-[2px] bg-slate-800" />
            )}

            {/* Timeline icon indicator */}
            <div
              className={`absolute left-0 top-3 flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full border text-xs font-bold ${
                m.status === "completed"
                  ? "border-emerald-400 bg-emerald-950 text-emerald-300 shadow-glow-green"
                  : m.status === "in-progress"
                  ? "border-cyan-400 bg-cyan-950 text-cyan-300 shadow-glow-cyan"
                  : "border-slate-800 bg-navy-950 text-slate-600"
              }`}
            >
              {m.status === "completed" ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : m.status === "in-progress" ? (
                <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              ) : (
                <Lock className="h-3.5 w-3.5 text-slate-600" />
              )}
            </div>

            {/* Milestone Card */}
            <Card
              variant={m.status === "in-progress" ? "glow-green" : "default"}
              className="p-5 md:p-6"
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase font-mono text-emerald-400 font-bold">
                        {m.phase}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400">{m.duration}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{m.title}</h4>
                  </div>
                  <div>
                    {m.status === "completed" && <Badge variant="success">Completed</Badge>}
                    {m.status === "in-progress" && (
                      <Badge variant="glow-green" dot dotColor="green">
                        Active Phase
                      </Badge>
                    )}
                    {m.status === "upcoming" && <Badge variant="default">Up Next</Badge>}
                    {m.status === "locked" && <Badge variant="outline">Locked</Badge>}
                  </div>
                </div>

                {m.status === "in-progress" && (
                  <ProgressBar
                    value={m.progress}
                    variant="emerald"
                    showLabel
                    label="Phase Progress"
                  />
                )}

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {m.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2.5 py-1 rounded bg-navy-950 border border-slate-800 text-slate-300 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> 4 Guided Modules
                  </span>
                  <Link href="/resources">
                    <Button variant="ghost" size="sm">
                      View Curriculum Resources →
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
