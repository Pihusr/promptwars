import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { SkillLevel } from "@/components/ui/SkillLevel";
import {
  LayoutDashboard,
  Compass,
  Map,
  Flame,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Calendar,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      <SectionHeader
        badgeText="Student Overview"
        badgeVariant="glow-green"
        title="Student Command Center"
        description="Track your daily learning sprint, bridge critical gaps, and see your readiness percentage increase toward your target career."
        action={
          <div className="flex items-center gap-2.5">
            <Link href="/assessment">
              <Button variant="outline" size="sm" leftIcon={<Flame className="h-3.5 w-3.5 text-red-400" />}>
                Diagnostic
              </Button>
            </Link>
            <Link href="/roadmap">
              <Button variant="primary" size="sm" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
                View Roadmap
              </Button>
            </Link>
          </div>
        }
      />

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-navy-900/80 border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase font-mono">Current Goal</span>
              <Badge variant="glow-green" size="sm">Full-Stack AI</Badge>
            </div>
            <div className="text-xl font-bold text-white">Full-Stack Engineer</div>
            <p className="text-xs text-slate-400">Targeting Fall 2026 Campus Hiring</p>
          </div>
        </Card>

        <Card className="p-5 bg-navy-900/80 border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase font-mono">Overall Readiness</span>
              <span className="text-emerald-400 font-bold font-mono">68%</span>
            </div>
            <ProgressBar value={68} variant="emerald" size="md" />
            <p className="text-xs text-slate-400">+12% growth in last 14 days</p>
          </div>
        </Card>

        <Card className="p-5 bg-navy-900/80 border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase font-mono">Critical Gap Remaining</span>
              <span className="text-red-400 font-bold font-mono">32%</span>
            </div>
            <ProgressBar value={32} variant="red" size="md" />
            <p className="text-xs text-red-300">2 priority modules to complete</p>
          </div>
        </Card>

        <Card className="p-5 bg-navy-900/80 border-slate-800">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase font-mono">Sprint Streak</span>
              <Flame className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-xl font-bold text-amber-400 font-mono">9 Days Active</div>
            <p className="text-xs text-slate-400">Daily practice streak active</p>
          </div>
        </Card>
      </div>

      {/* Main Grid: Active Sprint + Key Skill Levels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Learning Sprint */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              Active Milestone Sprint: "Async Queues & Distributed Systems"
            </h3>
            <Badge variant="glow-green" size="sm">In Progress</Badge>
          </div>

          <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-white">Milestone Completion</span>
                <span className="font-mono text-emerald-400 font-bold">3 of 5 tasks finished</span>
              </div>
              <ProgressBar value={60} variant="gradient" size="lg" showLabel />
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-navy-950 border border-emerald-500/30 text-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200">Understand Redis Message Broker & Pub/Sub architecture</span>
                </div>
                <Badge variant="success" size="sm">Completed</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-navy-950 border border-emerald-500/30 text-xs">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-200">Build background task worker with BullMQ and Node.js</span>
                </div>
                <Badge variant="success" size="sm">Completed</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-navy-850 border border-cyan-500/40 text-xs">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-cyan-400 shrink-0 animate-spin" />
                  <span className="text-white font-medium">Implement retry backoff & dead-letter queue handlers</span>
                </div>
                <Badge variant="info" size="sm">Up Next</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Target Milestone Deadline: in 4 days
              </span>
              <Link href="/roadmap">
                <Button variant="outline" size="sm">
                  Manage Sprint Tasks →
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Skill Diagnostic Snapshot */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-400" />
            Top Skill Targets
          </h3>

          <div className="space-y-3">
            <SkillLevel
              skillName="Next.js App Router"
              category="Frontend"
              currentLevel="intermediate"
              targetLevel="master"
            />
            <SkillLevel
              skillName="PostgreSQL & Indexing"
              category="Database"
              currentLevel="beginner"
              targetLevel="advanced"
            />
            <SkillLevel
              skillName="Docker & Cloud Run"
              category="DevOps"
              currentLevel="beginner"
              targetLevel="intermediate"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
