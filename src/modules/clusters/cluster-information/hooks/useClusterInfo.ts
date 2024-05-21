import { useQueries } from "react-query";
import client from "@/api-client/apiClient";

import { API_ENDPOINTS } from "@/api-client/endpoints";
import { ClusterType } from "@/types/cluster.types";
import { pathFromType } from "@/api-client/util/GetPathFromType";
import { getClusterInfoType } from "@/api-client/util/GetClusterInfoType";
import { getItemsToSkip } from "@/api-client/util/getItemsToSkip";
import { appConfig } from "@/config/app";
import { useState } from "react";
import { AddonTypes } from "@/types/addon.types";

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
  namespace: string ,
  clusterName: string ,
  clusterType: ClusterType ,
) {
  const [helmPage, setHelmPage] = useState(appConfig.defaultPage);
  const [resourcePage, setResourcePage] = useState(appConfig.defaultPage);
  const setPage= (page:number,type:AddonTypes) => {
  if(type==AddonTypes.HELM){
    setHelmPage(page)
  }else if(type==AddonTypes.RESOURCE){
    setResourcePage(page)
  }
  }
  const queries = useQueries([
    {
      queryKey: ["resources", namespace, clusterName, clusterType, resourcePage],
      queryFn: () => getResources(namespace, clusterName, clusterType, resourcePage),
      enabled: !!namespace && !!clusterName && !!clusterType,
      placeholderData: { data: [], isLoading: true, error: null },
    },
    {
      queryKey: ["helmChart", namespace, clusterName, clusterType, helmPage],
      queryFn: () => getHelmCharts(namespace, clusterName, clusterType, helmPage),
      enabled: !!namespace && !!clusterName && !!clusterType,
      placeholderData: { data: [], isLoading: true, error: null },
    },
    {
      queryKey: ["clusterInfo", namespace, clusterName, clusterType],
      queryFn: () => getClusterInfo(namespace, clusterName, clusterType),
      enabled: !!namespace && !!clusterName && !!clusterType,
      placeholderData: { data: {}, isLoading: true, error: null },
    },
  ]);
  return {queries,setPage}
}

export default useClusterInfo
