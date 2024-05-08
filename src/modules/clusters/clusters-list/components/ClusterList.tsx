import { ClusterCard } from "@/modules/clusters/clusters-list/components/ClusterCard";

import { useNavigate, useParams } from "react-router-dom";
import { ClusterListResponse } from "@/types/cluster";
import { EmptyData } from "@/components/ui/emptyData";
import { usePagination } from "@/hooks/usePagination";
import { FC } from "react";
type ClusterListProps = {
  data: ClusterListResponse;
  page: number;
  onChangePage: any;
};
export const ClusterList: FC<ClusterListProps> = ({
  data,
  page,
  onChangePage,
}) => {
  const navigate = useNavigate();
  const totalElements = data.totalClusters;
  const [PaginationUI] = usePagination(totalElements, page, onChangePage);
  if (data?.managedClusters.length <= 0 || !data.managedClusters) {
    return <EmptyData name={"clusters"} />;
  }
  const { tab } = useParams();
  return (
    <>
      <div className="mt-5">
        <div className="min-h-[400px] flex flex-col ">
          <div className="flex flex-wrap mb-4 py-4">
            {data.managedClusters.map((cluster: any) => (
              <div key={cluster.name} className="w-full md:w-1/2 p-2">
                <ClusterCard
                  onClick={() =>
                    navigate(
                      `/cluster/${tab}/${cluster.namespace}/${cluster.name}`,
                    )
                  }
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
        <PaginationUI />
      </div>
    </>
  );
};
