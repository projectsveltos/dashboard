import { ClusterHeading } from "@/modules/clusters/cluster-information/components/clusterHeading";
import { LabelsCard } from "@/modules/clusters/cluster-information/components/LabelsCard";
import { Addons } from "@/modules/clusters/cluster-information/components/AddonsTable/Addons";

import { useParams } from "react-router-dom";
import { ClusterType } from "@/types/cluster.types";
import { LoadingAddons } from "@/modules/clusters/cluster-information/components/AddonsTable/LoadingAddons";
import { AddonTypes } from "@/types/addon.types";
import { ErrorQuery } from "@/components/ui/errorQuery";
import { useClusterInfo } from "@/modules/clusters/cluster-information/hooks/useClusterInfo";

export function ClusterInfoById() {
  const { tab: type, name, namespace } = useParams();
  const { queries, setPage } = useClusterInfo(
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
            status={InfoQuery.data.managedClusters[0]?.clusterInfo.ready}
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
