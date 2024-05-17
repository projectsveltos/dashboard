import { useQueries } from "react-query";
import client from "@/api-client/apiClient";

import { API_ENDPOINTS } from "@/api-client/endpoints";
import { ClusterType } from "@/types/cluster.types";
import { pathFromType } from "@/api-client/util/GetPathFromType";
import { getClusterInfoType } from "@/api-client/util/GetClusterInfoType";
const { Endresources, EndhelmChart } = API_ENDPOINTS;

const getResources = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
) => {
  const { data } = await client.get(Endresources, {
    params: {
      namespace: namespace,
      name: clusterName,
      type: getClusterInfoType(clusterType),
    },
  });
  return data;
};
const getHelmCharts = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
) => {
  const { data } = await client.get(EndhelmChart, {
    params: {
      namespace: namespace,
      name: clusterName,
      type: getClusterInfoType(clusterType),
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
) {
  if (
    namespace === undefined ||
    clusterName === undefined ||
    clusterType === undefined
  ) {
  return [];
  }
  const queries = useQueries([
    {
      queryKey: ["resources", namespace, clusterName, clusterType],
      queryFn: () => getResources(namespace, clusterName, clusterType),
    },
    {
      queryKey: ["helmChart", namespace, clusterName, clusterType],
      queryFn: () => getHelmCharts(namespace, clusterName, clusterType),
    },
    {
      queryKey: ["clusterInfo", namespace, clusterName, clusterType],
      queryFn: () => getClusterInfo(namespace, clusterName, clusterType),
    },
  ]);

  return queries;
}

export default useClusterInfo;
