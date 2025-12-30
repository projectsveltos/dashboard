import { ClusterHeading } from "@/modules/clusters/cluster-information/components/clusterHeading";
import { LabelsCard } from "@/modules/clusters/cluster-information/components/LabelsCard";
import { Addons } from "@/modules/clusters/cluster-information/components/addonsTable/Addons";

import { useParams } from "react-router-dom";
import { ClusterType } from "@/types/cluster.types";
import { LoadingAddons } from "@/modules/clusters/cluster-information/components/addonsTable/LoadingAddons";
import { AddonTypes } from "@/types/addon.types";
import { ErrorQuery } from "@/modules/common/components/feedback/ErrorQuery";
import { useClusterTableInfo } from "@/modules/clusters/cluster-information/hooks/useClusterTableInfo";
import { useMcp } from "@/hooks/useMcp";
import { getClusterInfoType } from "@/utils/GetClusterInfoType";

export function ClusterInfoById() {
  const { tab: type, name, namespace } = useParams();
  const { debugClusterQuery } = useMcp(
    namespace ?? "",
    name ?? "",
    getClusterInfoType(type as ClusterType),
    "",
    "",
  );
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
            namespace={InfoQuery.data.managedClusters[0].namespace}
            version={InfoQuery.data.managedClusters[0]?.clusterInfo.version}
          />
        )}
        <div className={"space-y-1 min-w-3/4"}>
          <div>
            {InfoQuery.isSuccess && InfoQuery.data?.managedClusters && (
              <LabelsCard
                labels={
                  InfoQuery.data?.managedClusters[0]?.clusterInfo?.labels || []
                }
              />
            )}
          </div>
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
      </main>
    );
}
