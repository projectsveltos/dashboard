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
import { ClusterInfo, ClusterListResponse } from "@/types/cluster";
import { EmptyData } from "@/components/ui/emptyData";
import { usePagination } from "@/hooks/usePagination";
import { FC } from "react";

type ClusterListProps = {
  data: ClusterListResponse;
};
export const ClusterList: FC<ClusterListProps> = ({ data }) => {
  const navigate = useNavigate();
  const totalItems = 55; // Total number of items
  const visiblePages = 3; // Number of visible pages

  const [PaginationUI, { currentPage, setPage }] = usePagination(
    totalItems,
    visiblePages,
  );
  if (data?.managedClusters.length <= 0 && !data.managedClusters) {
    return <EmptyData name={"clusters"} />;
  }
  return (
    <>
      <div className="mt-5">
        <div className="min-h-[400px] flex flex-col ">
          <div className="flex flex-wrap mb-4 py-4">
            {data.managedClusters.map((cluster: any) => (
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
        <PaginationUI currentPage={currentPage} setPage={setPage} />
      </div>
    </>
  );
};
