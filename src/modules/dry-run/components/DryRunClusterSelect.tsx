import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useProfileInfo from "@/modules/profiles/profile-information/hooks/useProfileInfo";
import { MatchingCluster } from "@/types/profile.types";
import { DryRunClusterSelectSkeleton } from "./DryRunClusterSelectSkeleton";
import { Badge } from "@/lib/components/ui/data-display/badge";
import { Activity, Terminal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/data-display/table";
import { Button } from "@/lib/components/ui/inputs/button";
import { Card } from "@/lib/components/ui/data-display/card";

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
          {/* Standard Profile Header Card */}
          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 space-y-1">
                <h2 className="text-lg font-bold leading-none">
                  {profileData.name}
                </h2>
                <div className="flex items-center gap-2 py-1">
                  <Badge variant="secondary" className="text-[10px] font-bold">
                    {profileData.kind}
                  </Badge>
                  {profileData.namespace && (
                    <span className="text-xs text-muted-foreground">
                      {t("common.namespace")}: {profileData.namespace}
                    </span>
                  )}
                </div>
              </div>
              {profileData.spec.syncMode && (
                <div className="text-right">
                  <div className="text-[10px] font-bold text-muted-foreground mb-1 uppercase tracking-wider">
                    {t("common.sync_mode")}
                  </div>
                  <Badge variant="outline" className="font-bold">
                    {profileData.spec.syncMode}
                  </Badge>
                </div>
              )}
            </div>
          </Card>

          {/* Standard Helm Charts Grid */}
          {profileData.spec.helmCharts &&
            profileData.spec.helmCharts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {profileData.spec.helmCharts.map((chart, idx) => (
                  <Card key={idx} className="p-4 flex items-center space-x-3">
                    <div className="bg-muted p-2 rounded-lg">
                      <Terminal className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-sm truncate">
                        {chart.releaseName}
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        {chart.chartName} · v{chart.chartVersion}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

          {/* Standard Clusters Table */}
          <Card className="overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {t("common.matching_clusters")}
              </h3>
              <Badge variant="secondary" className="font-bold">
                {profileData.matchingClusters?.length || 0}
              </Badge>
            </div>

            {profileData.matchingClusters &&
            profileData.matchingClusters.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-6">
                      {t("common.cluster_name")}
                    </TableHead>
                    <TableHead className="px-6">
                      {t("common.namespace")}
                    </TableHead>
                    <TableHead className="px-6">{t("common.kind")}</TableHead>
                    <TableHead className="px-6 text-right">
                      {t("common.action")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profileData.matchingClusters.map((cluster, index) => (
                    <TableRow
                      key={index}
                      className="group cursor-pointer"
                      onClick={() => handleClusterClick(cluster)}
                    >
                      <TableCell className="px-6 font-bold">
                        {cluster.cluster.name}
                      </TableCell>
                      <TableCell className="px-6">
                        <span className="text-xs font-medium text-muted-foreground">
                          {cluster.cluster.namespace}
                        </span>
                      </TableCell>
                      <TableCell className="px-6">
                        <Badge
                          variant="outline"
                          className="text-[10px] font-bold"
                        >
                          {cluster.cluster.kind}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-[11px] font-bold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClusterClick(cluster);
                          }}
                        >
                          {t("common.analyze_changes")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-12 text-center">
                <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("common.no_matching_clusters")}
                </p>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
