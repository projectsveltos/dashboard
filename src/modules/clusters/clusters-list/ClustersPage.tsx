import { PageHeading } from "@/components/ui/PageHeading";
import { appConfig } from "@/config/app";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClusterType } from "@/types/cluster";
import useClusters from "@/modules/clusters/clusters-list/hooks/useClusters";
import { clusterTypes } from "@/types/cluster.consts";
import { ClusterList } from "@/modules/clusters/clusters-list/components/ClusterList";
import { ErrorQuery } from "@/components/ui/errorQuery";
import { LoadingCards } from "@/modules/clusters/clusters-list/components/LoadingCards";

export default function ClustersPage() {
  const navigate = useNavigate();
  const defaultTab = appConfig.defaultType;
  const defaultPage = appConfig.defaultPage;
  const { tab: urlTab, page: urlPage } = useParams();
  const [currentTab, setCurrentTab] = useState<ClusterType>(() => {
    return urlTab ? (urlTab as ClusterType) : defaultTab;
  });

  const [currentPage, setCurrentPage] = useState<number>(() => {
    return urlPage ? parseInt(urlPage) : defaultPage;
  });
  const { data, isLoading, isError, isSuccess, error, refetch } =
    useClusters(currentTab);
  const handleTabChange = (value: ClusterType) => {
    setCurrentTab(value);
    navigate(`/clusters/${value}/${currentPage}`);
  };

  return (
    <>
      <PageHeading
        title={"Clusters"}
        description={
          "You can view all clusters, retry failed deployments, and find troubleshooting guides for any cluster."
        }
      />
      <Tabs defaultValue={currentTab} className="w-[400px]">
        <TabsList>
          {clusterTypes.map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              onClick={() => handleTabChange(type)}
            >
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {isLoading && <LoadingCards />}
      {isError && <ErrorQuery name={"clusters"} error={error} />}
      {isSuccess && data && <ClusterList data={data} />}
    </>
  );
}
