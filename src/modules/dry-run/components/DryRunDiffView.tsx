import { useState, useMemo } from "react";
import useDryRunInfo from "../hooks/useDryRunInfo";
import { Badge } from "@/lib/components/ui/data-display/badge";
import {
  AlertTriangle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Search,
  FileCode,
  Package,
  Activity,
  GitCompare,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/lib/components/ui/inputs/button";
import { cn } from "@/lib/utils";
import { DiffViewer } from "./DiffViewer";
import { DryRunSkeleton } from "./DryRunSkeleton";

type FlattenedChange = {
  id: string;
  type: "resource" | "helm";
  name: string;
  kind?: string;
  group?: string;
  version?: string;
  namespace?: string;
  chartVersion?: string;
  action: string;
  message?: string;
};

export function DryRunDiffView({
  profileName,
  profileKind,
  type,
  namespace,
  clusterName,
  onBack,
}: {
  profileName: string;
  profileKind: string;
  type: "sveltos" | "capi";
  namespace: string;
  clusterName: string;
  onBack: () => void;
}) {
  const { data, isLoading, isSuccess, isError } = useDryRunInfo(
    profileName,
    profileKind,
    type,
    namespace,
    clusterName,
  );

  const [activeChangeId, setActiveChangeId] = useState<string | null>(null);

  // Flatten all changes into a single list for easy navigation
  const flattenedChanges = useMemo(() => {
    if (!data) return [];
    const changes: FlattenedChange[] = [];

    data.resourceChanges?.forEach((c, idx) => {
      changes.push({
        id: `res-${idx}`,
        type: "resource",
        name: c.name,
        kind: c.kind,
        group: c.group,
        version: c.version,
        action: c.action,
        message: c.message,
      });
    });

    data.helmReleaseChanges?.forEach((c, idx) => {
      changes.push({
        id: `helm-${idx}`,
        type: "helm",
        name: c.releaseName,
        namespace: c.releaseNamespace,
        chartVersion: c.chartVersion,
        action: c.action,
        message: c.message,
      });
    });

    return changes;
  }, [data]);

  // Set initial active change
  useMemo(() => {
    if (flattenedChanges.length > 0 && !activeChangeId) {
      setActiveChangeId(flattenedChanges[0].id);
    }
  }, [flattenedChanges, activeChangeId]);

  const activeIndex = flattenedChanges.findIndex(
    (c) => c.id === activeChangeId,
  );
  const activeChange = flattenedChanges[activeIndex];

  const handleNext = () => {
    if (activeIndex < flattenedChanges.length - 1) {
      setActiveChangeId(flattenedChanges[activeIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveChangeId(flattenedChanges[activeIndex - 1].id);
    }
  };

  if (isLoading) {
    return <DryRunSkeleton />;
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-6 overflow-hidden">
      {isError && (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-red-500">Fetch Error</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We couldn&apos;t retrieve dry run results.
          </p>
          <Button variant="outline" onClick={onBack}>
            Return
          </Button>
        </div>
      )}

      {isSuccess &&
        data &&
        (flattenedChanges.length > 0 ? (
          <>
            {/* Top Review Bar */}
            <div className="flex items-center justify-between bg-card border border-border p-4 rounded-2xl">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="h-9 w-9 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-base font-bold tracking-tight flex items-center gap-2">
                    Reviewing {flattenedChanges.length} Changes
                  </h1>
                  <p className="text-[11px] font-medium text-muted-foreground">
                    {data.profileName} → {clusterName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-xl p-1 border border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrev}
                    disabled={activeIndex <= 0}
                    className="h-8 w-8 p-0 rounded-lg disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="px-3 text-[11px] font-bold text-zinc-500 min-w-[80px] text-center">
                    {activeIndex + 1} / {flattenedChanges.length}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    disabled={activeIndex >= flattenedChanges.length - 1}
                    className="h-8 w-8 p-0 rounded-lg disabled:opacity-30"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={onBack}
                  className="h-10 rounded-xl font-bold text-xs px-6"
                >
                  Done Reviewing
                </Button>
              </div>
            </div>

            <div className="flex flex-1 gap-6 overflow-hidden">
              {/* Left Sidebar - Files/Changes List */}
              <div className="w-[320px] flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-border bg-zinc-50/50 dark:bg-zinc-900/30">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Filter changes..."
                      className="w-full bg-white dark:bg-zinc-950 border border-border rounded-lg py-1.5 pl-9 pr-3 text-xs focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {flattenedChanges.map((change, _idx) => (
                    <button
                      key={change.id}
                      onClick={() => setActiveChangeId(change.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-xl transition-all group relative flex items-start gap-3",
                        activeChangeId === change.id
                          ? "bg-primary/5 border border-primary/20"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50 border border-transparent",
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 p-1.5 rounded-lg border",
                          change.type === "resource"
                            ? "bg-indigo-50 border-indigo-100 text-indigo-500"
                            : "bg-cyan-50 border-cyan-100 text-cyan-500",
                          "dark:bg-zinc-900 dark:border-zinc-800",
                        )}
                      >
                        {change.type === "resource" ? (
                          <FileCode className="w-3 h-3" />
                        ) : (
                          <Package className="w-3 h-3" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={cn(
                            "text-[13px] font-bold truncate leading-tight mb-0.5",
                            activeChangeId === change.id
                              ? "text-primary"
                              : "text-zinc-700 dark:text-zinc-300",
                          )}
                        >
                          {change.name}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium text-zinc-400 truncate">
                            {change.kind || change.namespace || "Helm Release"}
                          </span>
                          {change.action !== "Install" && (
                            <Badge
                              className={cn(
                                "text-[9px] font-bold px-1.5 py-0 rounded border-none shadow-none",
                                change.action === "Delete"
                                  ? "bg-red-500/10 text-red-500"
                                  : change.action === "Create"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-primary/10 text-primary",
                              )}
                            >
                              {change.action}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {activeChangeId === change.id && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <ChevronRight className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content - Active Diff View */}
              <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
                {activeChange ? (
                  <>
                    <div className="p-6 border-b border-border bg-zinc-50/50 dark:bg-zinc-900/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h2 className="text-xl font-bold tracking-tight">
                            {activeChange.name}
                          </h2>
                          {activeChange.action !== "Install" && (
                            <Badge
                              className={cn(
                                "text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full border-none",
                                activeChange.action === "Delete"
                                  ? "bg-red-500/10 text-red-500"
                                  : activeChange.action === "Create"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-primary/10 text-primary",
                              )}
                            >
                              {activeChange.action}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                            Kind
                          </span>
                          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                            {activeChange.kind || "Helm Release"}
                          </span>
                        </div>
                        {activeChange.group && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                              Group
                            </span>
                            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                              {activeChange.group}/{activeChange.version}
                            </span>
                          </div>
                        )}
                        {activeChange.namespace && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                              Namespace
                            </span>
                            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                              {activeChange.namespace}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 bg-zinc-50/30 dark:bg-zinc-950/30">
                      {activeChange.message ? (
                        <DiffViewer message={activeChange.message} />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                          <Activity className="w-12 h-12 mb-4 opacity-20" />
                          <p className="text-sm font-medium">
                            No diff content available for this change.
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-400">
                    <GitCompare className="w-16 h-16 mb-6 opacity-20" />
                    <p className="text-lg font-bold tracking-tight">
                      Select a change to start review
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full space-y-4 bg-card border border-border rounded-2xl">
            <div className="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-green-500">
              No Changes Detected
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Everything is already up to date on {clusterName}.
            </p>
            <Button variant="outline" onClick={onBack} className="rounded-xl">
              Back to Cluster Selection
            </Button>
          </div>
        ))}
    </div>
  );
}
