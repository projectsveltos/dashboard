import { useQuery, UseQueryResult } from "react-query";

import client from "@/api-client/apiClient";
import { ClusterListResponse, ClusterType } from "@/types/cluster.types";
import { appConfig } from "@/config/app";

import { pathFromType } from "@/api-client/util/GetPathFromType";
import { getItemsToSkip } from "@/api-client/util/getItemsToSkip";
const fetchClusters = async (
  type: ClusterType,
  page: number,
  searchParams: any,
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
  searchParams: any,
): UseQueryResult<ClusterListResponse, Error> => {
  return useQuery(["clusters", type, page, searchParams], () =>
    fetchClusters(type, page, searchParams),
  );
};

export default useClusters;
