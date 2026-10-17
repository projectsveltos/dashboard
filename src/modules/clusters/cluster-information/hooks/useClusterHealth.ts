import { useQuery } from "@tanstack/react-query";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { ClusterType } from "@/types/cluster.types";
import { ClusterHealthResponse } from "@/types/health.types";
import { getClusterInfoType } from "@/utils/GetClusterInfoType";
import { getItemsToSkip } from "@/utils/getItemsToSkip";
import { appConfig } from "@/config/app";

const getClusterHealth = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
  page: number,
  params: Record<string, string>,
): Promise<ClusterHealthResponse> => {
  const { data } = await client.get(API_ENDPOINTS.CLUSTER_HEALTH, {
    params: {
      namespace,
      name: clusterName,
      type: getClusterInfoType(clusterType),
      skip: getItemsToSkip(page, appConfig.defaultTableSize),
      limit: appConfig.defaultTableSize,
      ...params,
    },
  });
  return data;
};

// useClusterHealth loads the resources of a cluster which are not healthy. It is used by the view showing
// them, so nothing is requested until that view is opened.
export function useClusterHealth(
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
  page: number,
  params: Record<string, string>,
) {
  return useQuery({
    queryKey: [
      "clusterHealth",
      namespace,
      clusterName,
      clusterType,
      page,
      params,
    ],
    queryFn: () =>
      getClusterHealth(namespace, clusterName, clusterType, page, params),
    enabled: !!namespace && !!clusterName && !!clusterType,
  });
}
