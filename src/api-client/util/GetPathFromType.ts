import { ClusterType } from "@/types/cluster.types";
import { clusterAPIValue, sveltosClusterValue } from "@/types/cluster.consts";
import { API_ENDPOINTS } from "@/api-client/endpoints";

export const pathFromType = (type: ClusterType): string => {
  if (type == sveltosClusterValue) {
    return API_ENDPOINTS.Endsveltosclusters;
  } else if (type == clusterAPIValue) {
    return API_ENDPOINTS.Endcapiclusters;
  }
  throw new Error("Invalid cluster type");
};
