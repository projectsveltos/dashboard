import { PageHeading } from "@/lib/components/ui/layout/PageHeading";
import { appConfig } from "@/config/app";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/navigation/tabs";
import { ClusterType } from "@/types/cluster.types";
import useClusters from "@/modules/clusters/clusters-list/hooks/useClusters";
import { clusterTypes } from "@/types/cluster.consts";
import { ClusterList } from "@/modules/clusters/clusters-list/components/ClusterList";
import { ErrorQuery } from "@/modules/common/components/feedback/ErrorQuery";
import { LoadingCards } from "@/modules/clusters/clusters-list/components/LoadingCards";
import { SearchFields } from "@/modules/clusters/clusters-list/components/searchFields";

import { clusterSearchfields } from "@/modules/clusters/clusters-list/config/clusterSearchfields.consts";

export default function ClustersPage() {
  const navigate = useNavigate();
  const defaultTab = appConfig.defaultType;
  const defaultPage = appConfig.defaultPage;
  const { tab: urlTab, pageNumber: urlPage } = useParams();
  const [searchParams, setSearchParams] = useState<
    Record<string, string | string[]>
  >({});
  const [currentTab, setCurrentTab] = useState<ClusterType>(() => {
    return urlTab ? (urlTab as ClusterType) : defaultTab;
  });

  const [currentPage, setCurrentPage] = useState<number>(() => {
    return urlPage ? parseInt(urlPage) : defaultPage;
  });
  const { data, isLoading, isPreviousData, isError, isSuccess, error } =
    useClusters(currentTab, currentPage, searchParams);

  const handleTabChange = (value: ClusterType) => {
    setCurrentTab(value);
    navigate(`/sveltos/clusters/${value}/${currentPage}`);
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`/sveltos/clusters/${currentTab}/${page}`);
  };
  const updateQueryParams = (
    searchTerms: Record<string, string | string[]>,
  ) => {
    const newPathname = location.pathname.replace(
      `/${urlPage}`,
      `/${defaultPage}`,
    );
    navigate(newPathname);
    setSearchParams(searchTerms);
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
      <SearchFields
        searchFieldsData={clusterSearchfields}
        updateQueryParams={updateQueryParams}
      />
      {(isLoading || isPreviousData) && <LoadingCards />}
      {isError && <ErrorQuery name={"clusters"} error={error} />}
      {isSuccess && data && (
        <>
          <ClusterList
            onChangePage={handlePageChange}
            page={currentPage}
            data={data}
          />
        </>
      )}
    </>
  );
}
