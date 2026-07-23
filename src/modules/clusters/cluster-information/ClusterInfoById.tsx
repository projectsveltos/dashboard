import { ClusterHeading } from "@/modules/clusters/cluster-information/components/clusterHeading";
import { LabelsCard } from "@/modules/clusters/cluster-information/components/LabelsCard";
import { Addons } from "@/modules/clusters/cluster-information/components/addonsTable/Addons";

import { useNavigate, useParams } from "react-router-dom";
import { ClusterType } from "@/types/cluster.types";
import { LoadingAddons } from "@/modules/clusters/cluster-information/components/addonsTable/LoadingAddons";
import { AddonTypes } from "@/types/addon.types";
import { ErrorQuery } from "@/modules/common/components/feedback/ErrorQuery";
import { useClusterTableInfo } from "@/modules/clusters/cluster-information/hooks/useClusterTableInfo";
import { useMcp } from "@/hooks/useMcp";
import { useOutdatedHelmCharts } from "@/hooks/useOutdatedHelmCharts";
import { getClusterInfoType } from "@/utils/GetClusterInfoType";
import { Button } from "@/lib/components/ui/inputs/button";
import { Tags } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ClusterInfoById() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tab: type, name, namespace } = useParams();
  const { debugClusterQuery } = useMcp(
    namespace ?? "",
    name ?? "",
    getClusterInfoType(type as ClusterType),
    "",
    "",
  );
  const outdatedHelmChartsQuery = useOutdatedHelmCharts({
    namespace: namespace ?? "",
    name: name ?? "",
    type: getClusterInfoType(type as ClusterType),
  });
  const { queries, setPage } = useClusterTableInfo(
    namespace as string,
    name as string,
    type as ClusterType,
  );

  const [resourcesQuery, profileQuery, helmChartQuery, InfoQuery] = queries.map(
    (query) => query,
  );

  if (InfoQuery.isLoading) {
    return <LoadingAddons />;
  }

  if (queries.some((query) => query.isError)) {
    const firstErrorQuery = queries.find((query) => query.isError);
    return (
      <>
        <ClusterHeading
          hideDetails
          name={name ? name : "Unknown"}
          namespace={namespace}
        />
        <ErrorQuery name={"cluster"} error={firstErrorQuery?.error} />
      </>
    );
  } else
    return (
      <main>
        {InfoQuery.isSuccess && InfoQuery.data?.managedClusters && (
          <ClusterHeading
            name={InfoQuery.data.managedClusters[0].name}
            ready={InfoQuery.data.managedClusters[0]?.clusterInfo.ready}
            failureMsg={
              InfoQuery.data.managedClusters[0]?.clusterInfo.failureMessage
            }
            mcpDebugQuery={debugClusterQuery}
            outdatedHelmChartsQuery={outdatedHelmChartsQuery}
            namespace={InfoQuery.data.managedClusters[0].namespace}
            version={InfoQuery.data.managedClusters[0]?.clusterInfo.version}
          />
        )}
        <div className={"space-y-4 min-w-3/4 mt-4"}>
          <div className="bg-card-muted rounded-xl border border-border p-1">
            {InfoQuery.isSuccess && InfoQuery.data?.managedClusters && (
              <LabelsCard
                labels={
                  InfoQuery.data?.managedClusters[0]?.clusterInfo?.labels || []
                }
              />
            )}
            <div className="px-3 pb-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() =>
                  navigate(
                    `/sveltos/classifiers?cluster_namespace=${namespace}&cluster_name=${name}`,
                  )
                }
              >
                <Tags className="h-4 w-4" />
                {t("common.view_classifiers_for_cluster")}
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Addons
              setPage={setPage}
              loading={
                helmChartQuery.data.isLoading ||
                resourcesQuery.data.isLoading ||
                profileQuery.data.isLoading
              }
              addonsData={{
                [AddonTypes.HELM]: helmChartQuery.data || [],
                [AddonTypes.RESOURCE]: resourcesQuery.data || [],
                [AddonTypes.PROFILE]: profileQuery.data || [],
              }}
            />
          </div>
        </div>
      </main>
    );
}
