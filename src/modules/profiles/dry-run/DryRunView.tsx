import useDryRunInfo from "@/modules/profiles/profile-information/hooks/useDryRunInfo";
import useProfileInfo from "@/modules/profiles/profile-information/hooks/useProfileInfo";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { MatchingCluster } from "@/types/profile.types";
import {
  AlertTriangle,
  Package,
  ArrowLeft,
  FileCode,
  GitCompare,
  Activity,
  ChevronRight,
  ChevronLeft,
  Search,
} from "lucide-react";
import { Button } from "@/lib/components/ui/inputs/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/data-display/table";
import { useTranslation } from "react-i18next";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export function DryRunView() {
  const { namespace = "", name = "", kind = "" } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check if we have cluster context from query params
  const clusterType = searchParams.get("type") as "sveltos" | "capi" | null;
  const clusterNamespace = searchParams.get("namespace");
  const clusterName = searchParams.get("cluster");

  const hasClusterContext =
    (clusterType === "sveltos" || clusterType === "capi") &&
    clusterNamespace &&
    clusterName;

  if (hasClusterContext) {
    return (
      <DryRunDiffView
        profileName={name}
        profileKind={kind}
        type={clusterType}
        namespace={clusterNamespace}
        clusterName={clusterName}
        onBack={() => {
          // Navigate back to cluster selection (remove query params)
          if (namespace) {
            navigate(`/sveltos/dry-run/${namespace}/${name}/${kind}`);
          } else {
            navigate(`/sveltos/dry-run/${name}/${kind}`);
          }
        }}
      />
    );
  }

  // Step 1: Show profile info with matching clusters
  return (
    <DryRunClusterSelect
      profileNamespace={namespace}
      profileName={name}
      profileKind={kind}
    />
  );
}

// ── Step 1: Cluster Selection ──────────────────────────────────────────
function DryRunClusterSelectSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-800 shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border/50">
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 bg-slate-200 dark:bg-slate-800 rounded-[20px]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="h-14 bg-slate-200 dark:bg-slate-800 border-b border-border" />
        <div className="p-4 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DryRunClusterSelect({
  profileNamespace,
  profileName,
  profileKind,
}: {
  profileNamespace: string;
  profileName: string;
  profileKind: string;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    data: profileData,
    isLoading,
    isSuccess,
  } = useProfileInfo(profileNamespace, profileName, profileKind);

  const handleClusterClick = (cluster: MatchingCluster) => {
    const type = cluster.cluster.kind === "SveltosCluster" ? "sveltos" : "capi";
    const ns = cluster.cluster.namespace;
    const name = cluster.cluster.name;

    // Navigate to same page but with cluster context as query params
    const currentPath = window.location.pathname;
    navigate(`${currentPath}?type=${type}&namespace=${ns}&cluster=${name}`);
  };

  return (
    <>
      {isLoading && <DryRunClusterSelectSkeleton />}
      {isSuccess && profileData && (
        <div className="space-y-6">
          {/* Profile Summary */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">
                    Dry Run: {profileData.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="secondary"
                      className="rounded-md px-2 py-0 text-[10px] font-bold"
                    >
                      {profileData.kind}
                    </Badge>
                    {profileData.namespace && (
                      <span className="text-xs text-muted-foreground font-medium">
                        in {profileData.namespace}
                      </span>
                    )}
                  </div>
                </div>
                {profileData.spec.syncMode && (
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-zinc-400 mb-1">
                      Sync Mode
                    </div>
                    <Badge
                      variant="outline"
                      className="rounded-full border-primary/20 text-primary font-bold px-4"
                    >
                      {profileData.spec.syncMode}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Helm Charts Section */}
            {profileData.spec.helmCharts &&
              profileData.spec.helmCharts.length > 0 && (
                <div className="mt-10 pt-8 border-t border-border/50">
                  <h3 className="text-xs font-bold text-zinc-400 mb-6 flex items-center gap-3">
                    Resources & Helm Charts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profileData.spec.helmCharts.map((chart, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-[20px] border border-border bg-zinc-50/50 dark:bg-zinc-900/30 transition-all hover:border-primary/20 group"
                      >
                        <div className="font-bold text-sm group-hover:text-primary transition-colors">
                          {chart.releaseName}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1.5 line-clamp-1">
                          {chart.chartName} · v{chart.chartVersion}
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <Badge
                            variant="outline"
                            className="text-[9px] font-bold px-2 py-0 rounded-md bg-white dark:bg-zinc-800"
                          >
                            {chart.releaseNamespace}
                          </Badge>
                          <div className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-primary">
                            {chart.helmChartAction}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Matching Clusters */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-zinc-50/50 dark:bg-zinc-900/30">
              <h3 className="text-[11px] font-bold text-zinc-400">
                {t("common.matching_clusters")} (
                {profileData.matchingClusters?.length || 0})
              </h3>
            </div>

            {profileData.matchingClusters &&
            profileData.matchingClusters.length > 0 ? (
              <div className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-none">
                      <TableHead className="px-6 text-[10px] font-bold text-zinc-400">
                        {t("common.cluster_name")}
                      </TableHead>
                      <TableHead className="px-6 text-[10px] font-bold text-zinc-400">
                        {t("common.namespace")}
                      </TableHead>
                      <TableHead className="px-6 text-[10px] font-bold text-zinc-400">
                        {t("common.kind")}
                      </TableHead>
                      <TableHead className="px-6 text-[10px] font-bold text-zinc-400">
                        {t("common.status")}
                      </TableHead>
                      <TableHead className="px-6 text-[10px] font-bold text-zinc-400 text-right">
                        Dry Run
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profileData.matchingClusters.map((cluster, index) => (
                      <TableRow
                        key={index}
                        className="group cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/50 border-none transition-all"
                        onClick={() => handleClusterClick(cluster)}
                      >
                        <TableCell className="px-6 py-4 font-bold text-sm">
                          {cluster.cluster.name}
                        </TableCell>
                        <TableCell className="px-6">
                          <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800">
                            {cluster.cluster.namespace}
                          </span>
                        </TableCell>
                        <TableCell className="px-6">
                          <Badge
                            variant="outline"
                            className="text-[9px] font-bold border-zinc-200 dark:border-zinc-800 px-2 py-0"
                          >
                            {cluster.cluster.kind}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6">
                          {cluster.clusterFeatureSummaries.some(
                            (f) => f.failureMessage,
                          ) ? (
                            <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-wide">
                              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                              {t("common.failed")}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-green-500 font-bold text-xs uppercase tracking-wide">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                              {t("common.healthy")}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="px-6 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-[11px] font-bold transition-all px-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClusterClick(cluster);
                            }}
                          >
                            View Changes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="bg-zinc-50 dark:bg-zinc-900/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                  <Activity className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("common.no_matching_clusters")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ── Diff Viewer Component ──────────────────────────────────────────
function DiffViewer({ message }: { message: string }) {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-[#f6f8fa] dark:bg-[#0d1117]">
      <SyntaxHighlighter
        language="diff"
        style={isDark ? vscDarkPlus : prism}
        customStyle={{
          margin: 0,
          padding: "2rem",
          fontSize: "13px",
          backgroundColor: "transparent",
          lineHeight: "1.7",
        }}
        codeTagProps={{
          style: {
            fontFamily:
              "var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace)",
          },
        }}
      >
        {message}
      </SyntaxHighlighter>
    </div>
  );
}

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

// ── Skeleton Loader ────────────────────────────────────────────────
function DryRunSkeleton() {
  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-6 overflow-hidden animate-pulse">
      {/* Top Review Bar Skeleton */}
      <div className="flex items-center justify-between bg-card border border-border p-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-2">
            <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Left Sidebar Skeleton */}
        <div className="w-[320px] flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="h-8 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
          </div>
          <div className="flex-1 p-2 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-full p-3 rounded-xl flex items-start gap-3"
              >
                <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="flex gap-2">
                    <div className="h-3 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="h-3 w-1/4 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>
            <div className="flex gap-6">
              <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          </div>
          <div className="flex-1 p-6 space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div
                key={i}
                className={`h-4 bg-slate-200 dark:bg-slate-800 rounded ${i % 2 === 0 ? "w-3/4" : "w-full"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Step 2: Dry Run Diff View ──────────────────────────────────────────
function DryRunDiffView({
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

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col gap-6 overflow-hidden">
      {isLoading && <DryRunSkeleton />}
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

      {isSuccess && data && (
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
                {flattenedChanges.map((change, idx) => (
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
      )}
    </div>
  );
}
