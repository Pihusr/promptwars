import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { Users, MessageSquare, Trophy, Sparkles, UserPlus, Flame } from "lucide-react";

export default function CommunityPage() {
  const studySquads = [
    {
      name: "Full-Stack Hackathon Squad #4",
      topic: "Building production Next.js + AI projects for upcoming hackathon",
      members: "6 / 8 members",
      activeSince: "Active 2h ago",
      tags: ["Next.js", "Tailwind", "Hackathon"],
    },
    {
      name: "System Design & LeetCode Sprint",
      topic: "Weekly mock interviews and distributed systems review",
      members: "12 members",
      activeSince: "Active 15m ago",
      tags: ["System Design", "Algorithms", "DSA"],
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      <SectionHeader
        badgeText="Student Peer Hub"
        badgeVariant="glow-green"
        title="Student Community & Study Squads"
        description="Collaborate with fellow college builders, form hackathon teams, and review code together."
        action={
          <Button variant="primary" size="sm" leftIcon={<UserPlus className="h-4 w-4" />}>
            Create Study Squad
          </Button>
        }
      />

      {/* Squads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {studySquads.map((squad) => (
          <Card key={squad.name} variant="interactive" className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                  <Users className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-white text-base">{squad.name}</h4>
              </div>
              <Badge variant="success" size="sm" dot dotColor="green">
                {squad.activeSince}
              </Badge>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">{squad.topic}</p>

            <div className="flex flex-wrap gap-1.5">
              {squad.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-navy-950 border border-slate-800 text-slate-300"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
              <span>{squad.members}</span>
              <Button variant="outline" size="sm">
                Join Squad
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Component Showcase: EmptyState integration */}
      <div className="pt-4">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-400" />
          Campus Study Group Matcher
        </h3>
        <EmptyState
          icon={<Users className="h-8 w-8 text-emerald-400" />}
          title="No Campus Study Squad Joined Yet"
          description="Joining a study squad triples your milestone completion speed and provides peer accountability for hackathons."
          primaryActionLabel="Find a Squad for My College"
          secondaryActionLabel="Host a Local Sprint"
        />
      </div>
    </div>
  );
}
