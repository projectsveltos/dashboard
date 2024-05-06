import { useQuery, UseQueryResult } from "react-query";

import client from "@/api-client/apiClient";
import { ClusterListResponse, ClusterType } from "@/types/cluster";
import { clusterAPIValue, sveltosClusterValue } from "@/types/cluster.consts";
import { appConfig } from "@/config/app";

const fetchClusters = async (type: ClusterType, page: number) => {
  let endpoint;
  const itemsToSkip = (page - 1) * appConfig.defaultSize;
  if (type === clusterAPIValue) {
    endpoint = "/capiclusters";
  } else if (type === sveltosClusterValue) {
    endpoint = "/sveltosclusters";
  } else {
    throw new Error("Invalid cluster type");
  }
  const { data } = await client.get(endpoint, {
    params: { skip: itemsToSkip, limit: appConfig.defaultSize },
  });
  return data;
};

const useClusters = (
  type: ClusterType,
  page: number,
): UseQueryResult<ClusterListResponse, Error> => {
  return useQuery(["clusters", type, page], () => fetchClusters(type, page));
};

export default useClusters;
