import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useProfileInfo from "@/modules/profiles/profile-information/hooks/useProfileInfo";
import { MatchingCluster } from "@/types/profile.types";
import { DryRunClusterSelectSkeleton } from "./DryRunClusterSelectSkeleton";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { Activity } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/data-display/table";
import { Button } from "@/lib/components/ui/inputs/button";

export function DryRunClusterSelect({
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

  if (isLoading) {
    return <DryRunClusterSelectSkeleton />;
  }

  return (
    <div className="space-y-6">
      {isSuccess && profileData && (
        <>
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
        </>
      )}
    </div>
  );
}
