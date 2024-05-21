import { Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClusterHeading } from "@/modules/clusters/cluster-information/components/clusterHeading";
import { LabelsCard } from "@/modules/clusters/cluster-information/components/LabelsCard";
import { Addons } from "@/modules/clusters/cluster-information/components/AddonsTable/Addons";
import { ClusterConfig } from "@/modules/clusters/cluster-information/components/ClusterConfig";
import useClusterInfo from "@/modules/clusters/cluster-information/hooks/useClusterInfo";
import { useParams } from "react-router-dom";
import { ClusterType } from "@/types/cluster.types";
import { LoadingAddons } from "@/modules/clusters/cluster-information/components/AddonsTable/LoadingAddons";
import { AddonTypes } from "@/types/addon.types";
import { ErrorQuery } from "@/components/ui/errorQuery";

export function ClusterInfoById() {
  const { tab: type, name, namespace } = useParams();
   const {queries,setPage} = useClusterInfo(namespace as string, name as string, type as ClusterType);
  const [resourcesQuery, helmChartQuery, InfoQuery] = queries.map(query => query);

  if (InfoQuery.data.isLoading) {
    return <LoadingAddons />;
  }
  if (queries.some((query) => query.data.isError)) {
    const firstErrorQuery = queries.find((query) => query.data.isError);
    return (
      <>
        <ClusterHeading name={name ? name : "Unknown"} namespace={namespace} />
        <ErrorQuery name={"cluster"} error={firstErrorQuery?.error} />
      </>
    );
  }
  return (
    <main className="mx-auto grid mt-4 flex-1 auto-rows-max gap-4">
      {InfoQuery.data.isSuccess && (
        <ClusterHeading
          name={InfoQuery.data.managedClusters[0].name}
          status={InfoQuery.data.managedClusters[0]?.clusterInfo.ready}
          namespace={InfoQuery.data.managedClusters[0].namespace}
          version={InfoQuery.data.managedClusters[0]?.clusterInfo.version}
        />
      )}
      <div className="grid gap-4   lg:grid-cols-3  ">
        {/* TOODO HANDLE LOADING*/}
          <Addons
            setPage={setPage}
            loading={helmChartQuery.data.isLoading||resourcesQuery.data.isLoading}
            addonsData={{
              totalHelmReleases: helmChartQuery.data?.totalHelmReleases || 0,
              totalClusters: resourcesQuery.data?.totalResources || 0,
              [AddonTypes.HELM]: helmChartQuery.data?.helmReleases || [],
              [AddonTypes.RESOURCE]: resourcesQuery.data?.resources || [],
            }}

          />

        <div className="grid auto-rows-max items-start gap-4 ">
          {InfoQuery.isSuccess && InfoQuery.data && (
            <LabelsCard
              labels={InfoQuery.data.managedClusters[0]?.clusterInfo?.labels}
            />
          )}
          <ClusterConfig />
          <Card x-chunk="dashboard-07-chunk-5">
            <CardHeader>
              <CardTitle className={"flex items-center"}>
                <Blocks className={"w-4 h-4"} /> Cluster Configuration
              </CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="secondary">
                Archive Product
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm">
          Discard
        </Button>
        <Button size="sm">Save Product</Button>
      </div>
    </main>
  );
}
