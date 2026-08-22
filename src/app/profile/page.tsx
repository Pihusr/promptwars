import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";
import { SkillLevel } from "@/components/ui/SkillLevel";
import {
  User,
  GraduationCap,
  Target,
  Award,
  Calendar,
  Sparkles,
  Flame,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      <SectionHeader
        badgeText="Student Identity & Targets"
        badgeVariant="glow-green"
        title="Student Profile & Career Target"
        description="Manage your academic background, target industry milestones, and verified skill badges."
        action={
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        }
      />

      {/* Profile Overview Card */}
      <Card className="p-6 bg-navy-900/80 border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-glow-green text-navy-950 font-black text-2xl">
              SD
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Student Developer</h3>
                <Badge variant="glow-green" size="sm">
                  Active Builder
                </Badge>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                B.Tech Computer Science • Class of 2027
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" size="md">
              Thapar Institute of Eng. & Tech
            </Badge>
          </div>
        </div>
      </Card>

      {/* Target Role & Readiness Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Primary Career Target
            </h4>
            <Badge variant="glow-green" size="sm">
              Primary Goal
            </Badge>
          </div>

          <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Junior Full-Stack / AI Engineer</span>
              <span className="text-xs font-mono text-emerald-400 font-bold">68% Match</span>
            </div>
            <ProgressBar value={68} gapValue={32} variant="dual" showLabel />
            <p className="text-xs text-slate-400">
              Estimated readiness date: <strong>October 2026</strong> (Campus Placement Cycle).
            </p>
          </div>

          <div className="pt-2">
            <Link href="/roadmap">
              <Button variant="primary" size="sm" className="w-full">
                View Active Milestone Roadmap
              </Button>
            </Link>
          </div>
        </Card>

        {/* Verified Badges & Assessments */}
        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Verified Competency Badges
            </h4>
            <Badge variant="outline" size="sm">
              3 Earned
            </Badge>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-lg bg-navy-950 border border-emerald-500/30 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-white">TypeScript & React Core</div>
                  <div className="text-slate-400 text-[11px]">Score: 92/100 • Advanced Tier</div>
                </div>
              </div>
              <Badge variant="success" size="sm">Verified</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-navy-950 border border-emerald-500/30 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold text-white">SQL & Relational Schemas</div>
                  <div className="text-slate-400 text-[11px]">Score: 88/100 • Intermediate Tier</div>
                </div>
              </div>
              <Badge variant="success" size="sm">Verified</Badge>
            </div>
          </div>

          <div className="pt-2">
            <Link href="/assessment">
              <Button variant="outline" size="sm" className="w-full">
                Run New Skill Diagnostic
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
