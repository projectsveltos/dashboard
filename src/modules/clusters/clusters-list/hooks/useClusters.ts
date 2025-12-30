import { useQuery, UseQueryResult } from "react-query";

import client from "@/api-client/apiClient";
import { ClusterListResponse, ClusterType } from "@/types/cluster.types";
import { appConfig } from "@/config/app";

import { pathFromType } from "@/utils/GetPathFromType";
import { getItemsToSkip } from "@/utils/getItemsToSkip";
import { SearchParams } from "@/types/params.types";
const fetchClusters = async (
  type: ClusterType,
  page: number,
  searchParams: SearchParams,
) => {
  const { data } = await client.get(pathFromType(type), {
    params: {
      skip: getItemsToSkip(page, appConfig.defaultSize),
      limit: appConfig.defaultSize,
      ...searchParams,
    },
  });
  return data;
};

const useClusters = (
  type: ClusterType,
  page: number,
  searchParams: SearchParams,
): UseQueryResult<ClusterListResponse, Error> => {
  return useQuery(
    ["clusters", type, page, searchParams],
    () => fetchClusters(type, page, searchParams),
    {
      keepPreviousData: false,
    },
  );
};

export default useClusters;
