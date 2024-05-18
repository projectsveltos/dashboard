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
import { ClusterInfoType, ClusterType, Label } from "@/types/cluster.types";
import { useEffect, useMemo, useState } from "react";
import { HelmReleaseType } from "@/types/helm.types";
import { LoadingAddons } from "@/modules/clusters/cluster-information/components/AddonsTable/LoadingAddons";


export function ClusterInfo() {
  const { tab: type, name, namespace } = useParams();
  const queries = useClusterInfo(namespace, name, type as ClusterType);
  const [resourcesQuery, helmChartQuery, InfoQuery] = queries;

  const addonTypes = [
    { value: "all", label: "All" },
    { value: "resource", label: "Resources" },
    { value: "helm", label: "Helm Charts" },
  ];

  if (queries.some((query) => query.isLoading)) {
    return <LoadingAddons />;
  }

  return (
    <main className="mx-auto grid mt-4 flex-1 auto-rows-max gap-4">
      {/* TODO handle if infoquery empty or fails (NOT FOUND) */}
      {InfoQuery.isSuccess && (
        <ClusterHeading
          name={InfoQuery.data.managedClusters[0].name}
          status={InfoQuery.data.managedClusters[0]?.clusterInfo.ready}
          namespace={InfoQuery.data.managedClusters[0].namespace}
          version={InfoQuery.data.managedClusters[0]?.clusterInfo.version}
        />
      )}
      <div className="grid gap-4 md:grid-cols-[1fr_150px] lg:grid-cols-3 ">
        {helmChartQuery.isSuccess && resourcesQuery.isSuccess && (
          <Addons
            addonTypes={addonTypes}
            addonsData={{
              helm: helmChartQuery.data.helmReleases,
              resource: resourcesQuery.data.resources,
            }}
          />
        )}
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
