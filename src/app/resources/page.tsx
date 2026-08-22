import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BookOpen, ExternalLink, Code2, Video, FileText, Bookmark, Star } from "lucide-react";

export default function ResourcesPage() {
  const categories = ["All Resources", "Full-Stack Core", "System Design", "Cloud & DevOps", "Interview Primers"];

  const resources = [
    {
      title: "Next.js 15 App Router Deep-Dive & RSC Patterns",
      category: "Full-Stack Core",
      type: "Interactive Guide",
      difficulty: "Intermediate",
      rating: "4.9/5",
      icon: Code2,
      desc: "Comprehensive architecture breakdown covering Server Components, Server Actions, streaming SSR, and suspense boundaries.",
      tag: "Recommended",
    },
    {
      title: "Distributed Systems & Async Task Processing with Redis",
      category: "System Design",
      type: "Video Series",
      difficulty: "Advanced",
      rating: "4.8/5",
      icon: Video,
      desc: "Learn message queues, dead-letter queues, event-driven pipelines, and rate limiting with real Node.js production examples.",
      tag: "Popular",
    },
    {
      title: "Modern PostgreSQL: Indexing, Transactions & Query Tuning",
      category: "Full-Stack Core",
      type: "Documentation",
      difficulty: "Intermediate",
      rating: "4.9/5",
      icon: FileText,
      desc: "Master B-tree indexes, execution plans (EXPLAIN ANALYZE), connection pooling with PgBouncer, and vector embeddings.",
      tag: "Essential",
    },
    {
      title: "Docker to Kubernetes: Student Production Deployment Guide",
      category: "Cloud & DevOps",
      type: "Hands-on Lab",
      difficulty: "Intermediate",
      rating: "4.7/5",
      icon: Code2,
      desc: "Containerize full-stack apps with multi-stage Dockerfiles and deploy onto cloud container platforms with automated CI/CD.",
      tag: "High Yield",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-2">
      <SectionHeader
        badgeText="Vetted Learning Library"
        badgeVariant="glow-green"
        title="Curated Engineering Resources"
        description="Hand-picked tutorials, interactive sandboxes, and architectural deep-dives tailored to your target milestone."
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pb-2">
        {categories.map((cat, idx) => (
          <button
            key={cat}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              idx === 0
                ? "bg-emerald-500 text-navy-950 font-bold shadow-glow-green"
                : "bg-navy-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {resources.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} variant="interactive" className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-800 border border-slate-700 text-emerald-400 shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="glow-green" size="sm">
                    {item.tag}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono text-emerald-400">{item.type}</span>
                  <span>•</span>
                  <span>{item.difficulty}</span>
                </div>
                <h4 className="text-base font-bold text-white leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <span className="flex items-center gap-1 text-amber-400 font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {item.rating}
                </span>
                <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                  Start Learning
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
