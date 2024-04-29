import { useQuery, UseQueryResult } from "react-query";

import client from "@/api-client/apiClient";
import { ClusterType } from "@/types/cluster";
import { clusterAPIValue, sveltosClusterValue } from "@/types/cluster.consts";
import { appConfig } from "@/config/app";
const params = {
  limit: appConfig.defaultSize,
};

const fetchClusters = async (type: ClusterType) => {
  let endpoint;
  if (type === clusterAPIValue) {
    endpoint = "/capiclusters";
  } else if (type === sveltosClusterValue) {
    endpoint = "/sveltosclusters";
  } else {
    throw new Error("Invalid cluster type");
  }
  const { data } = await client.get(endpoint, { params });
  return data;
};

const useClusters = (type: ClusterType):  UseQueryResult<ClusterListResponse, Error>  => {
  return useQuery(["clusters", type], () => fetchClusters(type))
};

export default useClusters;
