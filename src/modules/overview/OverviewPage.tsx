import { StatCards } from "./components/StatCards";
import { VerifyInstallation } from "@/modules/common/components/actions/VerifyInstallation";
import { LatestReleases } from "./components/LatestReleases";
import useOverviewStats from "./hooks/useOverviewStats";
import { useNavigate } from "react-router-dom";
import { Boxes, Play, Ship, ArrowRight, AlertCircle } from "lucide-react";
import { RouteIcon } from "lucide-react";
import { CardStackIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/lib/components/ui/feedback/alert";

const QUICK_ACTIONS = [
  {
    label: "Clusters",
    description: "View & manage all clusters",
    icon: Boxes,
    to: "/sveltos/clusters",
    color: "text-primary bg-primary/10 border-primary/20",
  },
  {
    label: "Profiles",
    description: "Manage addon profiles",
    icon: CardStackIcon,
    to: "/sveltos/profiles",
    color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    label: "Dry Run",
    description: "Simulate profile changes",
    icon: Play,
    to: "/sveltos/dry-run",
    color: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  },
  {
    label: "Events",
    description: "Event triggers & pipelines",
    icon: RouteIcon,
    to: "/sveltos/events",
    color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  },
  {
    label: "Enterprise",
    description: "Unlock premium features",
    icon: Ship,
    to: "/sveltos/enterprise",
    color: "text-violet-500 bg-violet-500/10 border-violet-500/20",
  },
];

export function OverviewPage() {
  const { data: stats } = useOverviewStats();
  const navigate = useNavigate();

  const _totalClusters =
    (stats?.sveltosClusters ?? 0) + (stats?.capiClusters ?? 0);
  const totalNotReady =
    (stats?.notReadySveltosClusters ?? 0) + (stats?.notReadyCAPIClusters ?? 0);

  return (
    <div className="w-full flex flex-col space-y-6 animate-in slide-in-from-bottom overflow-x-hidden pb-10">
      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between pb-1 space-y-3 xl:space-y-0">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
            Overview
          </h1>
        </div>
      </div>

      {/* Not Ready Clusters Alert */}
      {totalNotReady > 0 && (
        <Alert
          variant="destructive"
          className="bg-destructive/5 border-destructive/20 animate-in fade-in slide-in-from-top-4 duration-500"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-bold">Clusters Not Ready</AlertTitle>
          <AlertDescription className="font-medium">
            There are {totalNotReady} clusters requiring attention. Please
            review the status in the{" "}
            <span
              className="underline cursor-pointer font-bold"
              onClick={() => navigate("/sveltos/clusters")}
            >
              Clusters management
            </span>{" "}
            section.
          </AlertDescription>
        </Alert>
      )}

      {/* KPI Cards */}
      <StatCards />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Quick Actions (Left) */}
        <div className="lg:col-span-8 bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <h2 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              Quick Actions
            </h2>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.to}
                  onClick={() => navigate(action.to)}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-accent/40 hover:border-primary/20 transition-all text-left group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${action.color}`}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {action.label}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Installation Health (Right) */}
        <div className="lg:col-span-4 bg-card rounded-xl border border-border overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <h2 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
              Installation Health
            </h2>
          </div>
          <div className="flex flex-col flex-1 items-center justify-center p-8 gap-4 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Verify that all Sveltos components are correctly installed and
              running in the management cluster.
            </p>
            <VerifyInstallation />
          </div>
        </div>
      </div>

      {/* Bottom Row: Releases */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-12">
          <LatestReleases />
        </div>
      </div>
    </div>
  );
}
