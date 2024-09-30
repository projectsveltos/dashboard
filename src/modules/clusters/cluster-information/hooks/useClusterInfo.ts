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
import { useParams, useSearchParams } from "react-router-dom";

const { Endresources, EndhelmChart, EndprofileStatuses } = API_ENDPOINTS;

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
const getClusterProfileStatuses = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
  page: number,
  toggleFailFilter: boolean,
) => {
  const { data } = await client.get(EndprofileStatuses, {
    params: {
      namespace: namespace,
      name: clusterName,
      type: getClusterInfoType(clusterType),
      skip: getItemsToSkip(page, appConfig.defaultTableSize),
      limit: appConfig.defaultTableSize,
      failed: toggleFailFilter,
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
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
) {
  const [searchParams] = useSearchParams();
  const failedOnly = searchParams.get("failure") === "true";
  const [helmPage, setHelmPage] = useState(appConfig.defaultPage);
  const [resourcePage, setResourcePage] = useState(appConfig.defaultPage);
  const [profilePage, setProfilePage] = useState(appConfig.defaultPage);

  const setPage = (page: number, type: AddonTypes) => {
    switch (type) {
      case AddonTypes.HELM:
        setHelmPage(page);
        break;
      case AddonTypes.RESOURCE:
        setResourcePage(page);
        break;
      case AddonTypes.PROFILE:
        setProfilePage(page);
        break;
      default:
        throw new Error("Invalid AddonType provided.");
    }
  };
  const queries = useQueries([
    {
      queryKey: [
        "resources",
        namespace,
        clusterName,
        clusterType,
        resourcePage,
      ],
      queryFn: () =>
        getResources(namespace, clusterName, clusterType, resourcePage),
      enabled: !!namespace && !!clusterName && !!clusterType,
      placeholderData: { data: [], isLoading: true, error: null },
    },
    {
      queryKey: [
        "profile",
        namespace,
        failedOnly,
        clusterName,
        clusterType,
        profilePage,
      ],
      queryFn: () =>
        getClusterProfileStatuses(
          namespace,
          clusterName,
          clusterType,
          profilePage,
          failedOnly,
        ),
      enabled: !!namespace && !!clusterName && !!clusterType,
      placeholderData: { data: [], isLoading: true, error: null },
    },
    {
      queryKey: ["helmChart", namespace, clusterName, clusterType, helmPage],
      queryFn: () =>
        getHelmCharts(namespace, clusterName, clusterType, helmPage),
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
  return { queries, setPage };
}

export { useClusterInfo };
