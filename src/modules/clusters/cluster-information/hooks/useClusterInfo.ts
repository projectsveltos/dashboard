import { useQueries } from "react-query";
import client from "@/api-client/apiClient";

import { API_ENDPOINTS } from "@/api-client/endpoints";
import { ClusterType } from "@/types/cluster.types";
import { pathFromType } from "@/api-client/util/GetPathFromType";
import { getClusterInfoType } from "@/api-client/util/GetClusterInfoType";
import { getItemsToSkip } from "@/api-client/util/getItemsToSkip";
import { appConfig } from "@/config/app";

const { Endresources, EndhelmChart } = API_ENDPOINTS;

const getResources = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
  page: number,
) => {
  const { data } = await client.get(Endresources, {
    params: {
      namespace: namespace,
      name: clusterName,
      type: getClusterInfoType(clusterType),
      skip: getItemsToSkip(page, appConfig.defaultTableSize),
      limit: appConfig.defaultTableSize,
    },
  });
  return data;
};
const getHelmCharts = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
  page: number,
) => {
  const { data } = await client.get(EndhelmChart, {
    params: {
      namespace: namespace,
      name: clusterName,
      type: getClusterInfoType(clusterType),
      skip: getItemsToSkip(page, appConfig.defaultTableSize),
      limit: appConfig.defaultTableSize,
    },
  });
  return data;
};

const getClusterInfo = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
) => {
  const { data } = await client.get(pathFromType(clusterType), {
    params: {
      namespace: namespace,
      name: clusterName,
    },
  });
  return data;
};
function useClusterInfo(
  namespace: string | undefined,
  clusterName: string | undefined,
  clusterType: ClusterType | undefined,
  page: number,
) {
  if (
    namespace === undefined ||
    clusterName === undefined ||
    clusterType === undefined
  ) {
    return [];
  }
  return useQueries([
    {
      queryKey: ["resources", namespace, clusterName, clusterType, page],
      queryFn: () => getResources(namespace, clusterName, clusterType, page),
    },
    {
      queryKey: ["helmChart", namespace, clusterName, clusterType, page],
      queryFn: () => getHelmCharts(namespace, clusterName, clusterType, page),
    },
    {
      queryKey: ["clusterInfo", namespace, clusterName, clusterType],
      queryFn: () => getClusterInfo(namespace, clusterName, clusterType),
    },
  ]);
}

export default useClusterInfo;
