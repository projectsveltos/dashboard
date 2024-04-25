import {
  Blocks,
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigate } from "react-router-dom";
import { ClusterHeading } from "@/modules/clusters/cluster-information/components/clusterHeading";
import { LabelsCard } from "@/modules/clusters/cluster-information/components/LabelsCard";
import { ResourceTable } from "@/modules/clusters/cluster-information/components/ResourceTable";
import { ClusterConfig } from "@/modules/clusters/cluster-information/components/ClusterConfig";

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
  return (
    <div>
      <div>
        <main>
          <div className="mx-auto grid mt-4 flex-1 auto-rows-max gap-4">
            <ClusterHeading
              name={data.name}
              status={data.status}
              version={data.version}
            />
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <ResourceTable />

              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <LabelsCard labels={data.labels} />
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
                    <div></div>
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
          </div>
        </main>
      </div>
    </div>
  );
}
