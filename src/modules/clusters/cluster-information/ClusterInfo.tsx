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

export const data = {
  name: "Cluster 1",
  version: "v1.22.3",
  namespace: "namespace1",
  type: "clusterAPI",
  status: true,
  addons: {
    helmCharts: [
      {
        namespace: "default/clusterapi-workload",
        type: "helm chart",
        name: "kyverno",
        version: "kyverno-latest",
        chart_version: "3.1.4",
        date: "2024-04-20 13:07:47 +0200 CEST",
        profile: "ClusterProfile/deploy-kyverno",
      },
      {
        namespace: "default/clusterapi-workload",
        type: "helm chart",
        name: "nginx",
        version: "nginx-latest",
        chart_version: "1.1.3",
        date: "2024-04-20 13:08:10 +0200 CEST",
        profile: "ClusterProfile/nginx",
      },
    ],
    resources: [
      {
        namespace: "default/clusterapi-workload",
        type: "kyverno.io:ClusterPolicy",
        name: "",
        version: "disallow-latest-tag",
        chart_version: "N/A",
        date: "2024-04-20 13:13:42 +0200 CEST",
        profile: "ClusterProfile/deploy-resources",
      },
    ],
  },
  labels: [
    {
      designation: "env:production",
      color: "red",
    },
    {
      designation: "eune:prod4",
      color: "red",
    },
    {
      designation: "alpha:1224",
      color: "red",
    },
    {
      designation: "euw:devp2",
      color: "red",
    },
    {
      designation: "na:devp1",
      color: "red",
    },
    {
      designation: "euw:devp1",
      color: "red",
    },
    {
      designation: "euw:devp1",
      color: "green",
    },
  ],
};

export function ClusterInfo() {
  const { tab: type, name, namespace } = useParams();
  const queries = useClusterInfo(namespace, name, type as ClusterType);
  const [resourcesQuery, helmChartQuery, InfoQuery] = queries;

  const addonTypes = [
    { value: "all", label: "All" },
    { value: "resource", label: "Resources" },
    { value: "helm", label: "Helm Charts" },
  ];

  if(queries.some((query) => query.isLoading)){
    return <LoadingAddons />
  }

  return (
    <main className="mx-auto grid mt-4 flex-1 auto-rows-max gap-4">

      {/* TODO handle if infoquery empty or fails */}
{/*      {InfoQuery.isSuccess && (*/}
{/*          <ClusterHeading*/}
{/*            name={InfoQuery.data.managedClusters[0].name}*/}
{/*            status={InfoQuery.data.managedClusters[0]?.clusterInfo.ready}*/}
{/*            namespace={InfoQuery.data.managedClusters[0].namespace}*/}
{/*            version={InfoQuery.data.managedClusters[0]?.clusterInfo.version}*/}
{/*          />*/}
{/*)}*/}
          <div className="grid gap-4 md:grid-cols-[1fr_150px] lg:grid-cols-3 ">
            {helmChartQuery.isSuccess && resourcesQuery.isSuccess && <Addons addonTypes={addonTypes} addonsData={{helm: helmChartQuery.data.helmReleases, resource: resourcesQuery.data.resources}} />}
            <div className="grid auto-rows-max items-start gap-4 ">
              {InfoQuery.isSuccess && InfoQuery.data && <LabelsCard labels={InfoQuery.data.managedClusters[0]?.clusterInfo?.labels} />}
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