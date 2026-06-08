import { useNavigate } from "react-router-dom";
import useOverviewStats from "../hooks/useOverviewStats";
import {
  Boxes,
  Globe,
  Layers,
  FileText,
  ClipboardList,
  Zap,
  Radio,
  LucideIcon,
} from "lucide-react";

interface StatCard {
  title: string;
  value: number | string;
  sub?: string;
  icon: LucideIcon;
  color: string;
  to?: string;
}

function buildCards(
  stats: ReturnType<typeof useOverviewStats>["data"],
): StatCard[] {
  if (!stats) return [];

  return [
    {
      title: "Sveltos Clusters",
      value: stats.sveltosClusters,
      sub:
        stats.notReadySveltosClusters > 0
          ? `${stats.notReadySveltosClusters}/${stats.sveltosClusters} not ready`
          : undefined,
      icon: Boxes,
      color: "text-primary bg-primary/10 border-primary/20",
      to: "/sveltos/clusters/SveltosCluster/1",
    },
    {
      title: "CAPI Clusters",
      value: stats.capiClusters,
      sub:
        stats.notReadyCAPIClusters > 0
          ? `${stats.notReadyCAPIClusters}/${stats.capiClusters} not ready`
          : undefined,
      icon: Globe,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
      to: "/sveltos/clusters/ClusterAPI/1",
    },
    {
      title: "Cluster Profiles",
      value: stats.clusterProfiles,
      icon: Layers,
      color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
      to: "/sveltos/profiles",
    },
    {
      title: "Profiles",
      value: stats.profiles,
      icon: FileText,
      color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
      to: "/sveltos/profiles",
    },
    {
      title: "Cluster Summaries",
      value: stats.clusterSummaries,
      icon: ClipboardList,
      color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
      to: "/sveltos/clusters",
    },
    {
      title: "Event Triggers",
      value: stats.eventTriggers,
      icon: Zap,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      to: "/sveltos/events",
    },
    {
      title: "Pull Mode Clusters",
      value: stats.pullModeClusters,
      icon: Radio,
      color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
      to: "/sveltos/clusters",
    },
  ];
}

function StatCardSkeleton() {
  return (
    <div className="bg-card rounded-xl p-4 border border-border flex flex-col pt-4 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-2 bg-muted rounded w-1/2" />
        <div className="w-8 h-8 bg-muted rounded-lg" />
      </div>
      <div className="h-8 bg-muted rounded w-1/3 mt-auto" />
    </div>
  );
}

export function StatCards() {
  const { data, isLoading } = useOverviewStats();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const cards = buildCards(data);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            onClick={() => card.to && navigate(card.to)}
            className={`bg-card rounded-xl p-4 border border-border flex flex-col pt-4 transition-all hover:border-primary/20 group ${card.to ? "cursor-pointer" : ""}`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground group-hover:text-primary transition-colors">
                {card.title}
              </h3>
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${card.color}`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="flex items-baseline mt-auto flex-wrap gap-2">
              <span className="text-3xl font-extrabold text-foreground">
                {card.value}
              </span>
              {card.sub && (
                <span className="font-black text-[9px] px-1.5 py-0.5 bg-destructive/10 text-destructive rounded-md border border-destructive/20 uppercase tracking-tighter">
                  {card.sub}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
