import { useQuery, UseQueryResult } from "react-query";

import client from "@/api-client/apiClient";
import { ClusterListResponse, ClusterType } from "@/types/cluster.types";
import { clusterAPIValue, sveltosClusterValue } from "@/types/cluster.consts";
import { appConfig } from "@/config/app";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { pathFromType } from "@/api-client/util/GetPathFromType";
const fetchClusters = async (
  type: ClusterType,
  page: number,
  searchParams: any,
) => {
  let endpoint;
  const itemsToSkip = (page - 1) * appConfig.defaultSize;

  const { data } = await client.get(pathFromType(type), {
    params: {
      skip: itemsToSkip,
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
