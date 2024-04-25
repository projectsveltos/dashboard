import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { appConfig, clusterType } from "@/config/app";
import { ClusterCard } from "@/modules/clusters/clusters-list/components/ClusterCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

type ClusterListProps = {
  data: any;
  currentTab: clusterType;
  handleTabChange: (value: clusterType) => void;
};
export const ClusterList = ({
  data,
  currentTab,
  handleTabChange,
}: ClusterListProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-5 ">
        <Tabs
          defaultValue={currentTab}
          className="w-[400px]"
          onValueChange={(value) =>
            handleTabChange(value as unknown as clusterType)
          }
        >
          <TabsList>
            <TabsTrigger value={appConfig.sveltosType}>
              {appConfig.sveltosType}
            </TabsTrigger>
            <TabsTrigger value={appConfig.clusterAPIType}>
              {appConfig.clusterAPIType}
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap mb-4 py-4">
          {data.map((cluster: any) => (
            <div key={cluster.name} className="w-full md:w-1/2 p-2">
              <ClusterCard
                onClick={() => navigate(`/clusters/${cluster.name}`)}
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
      ;
    </>
  );
};
