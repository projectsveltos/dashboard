import { ClusterCard } from "@/modules/clusters/clusters-list/components/ClusterCard";

import { useNavigate, useParams } from "react-router-dom";
import { ClusterInfoType, ClusterListResponse } from "@/types/cluster.types";
import { EmptyData } from "@/lib/components/ui/feedback/emptyData";
import { usePagination } from "@/hooks/usePagination";
import { FC } from "react";

type ClusterListProps = {
  data: ClusterListResponse;
  page: number;
  onChangePage: (page: number) => void;
};
export const ClusterList: FC<ClusterListProps> = ({
  data,
  page,
  onChangePage,
}) => {
  const navigate = useNavigate();
  const totalElements = data.totalClusters;
  const { tab } = useParams();
  const [PaginationUI] = usePagination(totalElements, page, onChangePage);
  if (data?.managedClusters.length <= 0 || !data.managedClusters) {
    return <EmptyData name={"clusters"} />;
  }

  function handleNavigation(cluster: ClusterInfoType) {
    navigate(`/sveltos/cluster/${tab}/${cluster.namespace}/${cluster.name}`);
  }

  return (
    <>
      <div className="mt-5">
        <div className="min-h-[400px] flex flex-col ">
          <div className="flex flex-wrap mb-4 py-4">
            {data.managedClusters.map((cluster: ClusterInfoType, index) => (
              <div key={index} className="w-full md:w-1/2 p-2">
                <ClusterCard
                  onClick={() => handleNavigation(cluster)}
                  key={index}
                  name={cluster.name}
                  version={cluster.clusterInfo.version}
                  namespace={cluster.namespace}
                  paused={cluster.clusterInfo.paused}
                  status={cluster.clusterInfo.ready}
                  failureMsg={cluster.clusterInfo.failureMessage}
                  labels={cluster.clusterInfo.labels}
                />
              </div>
            ))}
          </div>
        </div>
        <PaginationUI />
      </div>
    </>
  );
};
