import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ClusterCard } from "@/pages/clusters-list/components/ClusterCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeading } from "@/components/ui/PageHeading";
import { appConfig } from "@/config/app";

export default function ClustersPage() {
  const dummyClusterData = [
    {
      name: "Cluster 1",
      version: "v1.22.3",
      namespace: "namespace1",
      type: "clusterAPI",
      status: true,
      labels: [
        {
          designation: "env:production",
          color: "red",
        },
        {
          designation: "euw:devp1",
          color: "green",
        },
      ],
    },
    {
      name: "Cluster 2",
      version: "v1.20.7",
      type: "sveltosCluster",
      namespace: "namespace2",
      status: true,
      labels: [
        {
          designation: "ru:devp2",
          color: "amber",
        },
        {
          designation: "env:engi",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 2",
      version: "v1.20.7",
      type: "clusterAPI",
      namespace: "namespace2",
      status: false,
      labels: [
        {
          designation: "weu:development",
          color: "yellow",
        },
        {
          designation: "env:eng",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 2",
      version: "v1.20.7",
      type: "clusterAPI",
      namespace: "namespace2",
      status: true,
      labels: [
        {
          designation: "env:development",
          color: "yellow",
        },
        {
          designation: "euw:engineering",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 2",
      version: "v1.20.7",
      type: "sveltosCluster",
      namespace: "namespace2",
      status: true,
      labels: [
        {
          designation: "env:development",
          color: "yellow",
        },
        {
          designation: "env:eng",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 2",
      type: "sveltosCluster",
      version: "v1.20.7",
      namespace: "namespace2",
      status: false,
      labels: [
        {
          designation: "euw:development",
          color: "yellow",
        },
        {
          designation: "euw:engineering",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 2",
      version: "v1.20.7",
      type: "clusterAPI",
      namespace: "namespace2",
      status: false,
      labels: [
        {
          designation: "euw:par1",
          color: "amber",
        },
        {
          designation: "euw:par2",
          color: "purple",
        },
      ],
    },
    {
      name: "Cluster 78",
      version: "v1.21.5",
      type: "sveltosCluster",
      namespace: "namespace3",
      status: true,
      labels: [
        {
          designation: "env:staging",
          color: "orange",
        },
        {
          designation: "na:qa",
          color: "red",
        },
      ],
    },
  ];

  return (
    <>
      <PageHeading
        title={"Clusters"}
        description={
          "You can view all clusters,retry failed deployments, and find\n" +
          "              troubleshooting guides for any cluster."
        }
      />
      <div className="mt-5 ">
        <Tabs defaultValue={appConfig.sveltosType} className="w-[400px]">
          <TabsList>
            <TabsTrigger value={appConfig.sveltosType}>SveltosAPI</TabsTrigger>
            <TabsTrigger value={appConfig.clusterAPIType}>
              ClusterAPI
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap mb-4 py-4">
          {dummyClusterData.map((cluster) => (
            <div key={cluster.name} className="w-full md:w-1/2 p-2">
              <ClusterCard
                key={cluster.name}
                name={cluster.name}
                version={cluster.version}
                namespace={cluster.namespace}
                status={cluster.status}
                labels={cluster.labels}
              />
            </div>
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
