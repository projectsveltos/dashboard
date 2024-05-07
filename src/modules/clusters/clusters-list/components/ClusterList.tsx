import { ClusterCard } from "@/modules/clusters/clusters-list/components/ClusterCard";

import { useNavigate } from "react-router-dom";
import { ClusterListResponse } from "@/types/cluster";
import { EmptyData } from "@/components/ui/emptyData";
import { usePagination } from "@/hooks/usePagination";
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label"
import { ALargeSmall, Blocks, Tags } from "lucide-react";
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
  return (
    <>


          <div className="flex h-5 items-center justify-end  space-x-4 text-sm">
            <div className="search">
              <Label className={"flex items-center text-sm"} htmlFor="terms"><ALargeSmall className={"mx-1 w-4 h-4"}/> Name</Label>
              <Input placeholder="Search by name... " className="h-8 w-[150px] lg:w-[250px]" />
            </div>
            <Separator orientation="vertical" />
            <div className="search">
              <Label className={"flex items-center text-sm"}  htmlFor="terms"><Blocks className={"mx-1 w-4 "}/> Namespace</Label>
              <Input placeholder="Search by namespace... " className="h-8 w-[150px] lg:w-[250px]" />
            </div>

            <Separator orientation="vertical" />
            <div className="search">
              <Label className={"flex items-center text-sm"}  htmlFor="terms"><Tags className={"mx-1 w-4 h-4"}/>Labels</Label>
              <Input placeholder="Search by labels... " className="h-8 w-[150px] lg:w-[250px]" />
            </div>

      </div>
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
        <PaginationUI />
      </div>
    </>
  );
};
