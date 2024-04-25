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
import { ClusterInfo } from "@/types/cluster";
import { EmptyData } from "@/components/ui/emptyData";

type ClusterListProps = {
  data: ClusterInfo[];
};
export const ClusterList = ({ data }: ClusterListProps) => {

  const navigate = useNavigate();
  if (data.length <= 0) {
    return <EmptyData name={"clusters"}  />;
  }
  return (
    <>
      <div className="mt-5">
        <div className="min-h-[400px] flex flex-col ">
          <div className="flex flex-wrap mb-4 py-4">
            {data.map((cluster: any) => (
              <div key={cluster.name} className="w-full md:w-1/2 p-2">
                <ClusterCard
                  onClick={() => navigate(`/clusters/${cluster.name}`)}
                  key={cluster.name}
                  name={cluster.name}
                  version={cluster.clusterInfo.version}
                  namespace={cluster.namespace}
                  status={cluster.clusterInfo.ready}
                  failureMsg={cluster.clusterInfo.failureMessage}
                  labels={cluster.clusterInfo.labels}
                />
              </div>
            ))}
          </div>
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
};
