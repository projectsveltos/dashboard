import { ClusterType } from "@/types/cluster.types";
import { clusterAPIValue, sveltosClusterValue } from "@/types/cluster.consts";
import { API_ENDPOINTS } from "@/api-client/endpoints";

export const pathFromType = (type: ClusterType): string => {
  if (type == sveltosClusterValue) {
    return API_ENDPOINTS.SVELTOS_CLUSTERS;
  } else if (type == clusterAPIValue) {
    return API_ENDPOINTS.CAPI_CLUSTERS;
  }
  throw new Error("Invalid cluster type");
};

export const typeFromPath = (path: string): ClusterType => {
  const lowerPath = path.toLowerCase();

  if (
    lowerPath === API_ENDPOINTS.SVELTOS_CLUSTERS.toLowerCase() ||
    lowerPath === sveltosClusterValue.toLowerCase() ||
    lowerPath === "sveltoscluster"
  ) {
    return sveltosClusterValue;
  } else if (
    lowerPath === API_ENDPOINTS.CAPI_CLUSTERS.toLowerCase() ||
    lowerPath === "cluster" ||
    lowerPath === clusterAPIValue.toLowerCase()
  ) {
    return clusterAPIValue;
  }
  throw new Error(`Invalid cluster type: ${path}`);
};
