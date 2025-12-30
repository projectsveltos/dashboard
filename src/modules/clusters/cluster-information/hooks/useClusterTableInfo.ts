import { useQueries } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { AddonTypes } from "@/types/addon.types";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { ClusterType } from "@/types/cluster.types";
import { pathFromType } from "@/utils/GetPathFromType";
import { getClusterInfoType } from "@/utils/GetClusterInfoType";
import { getItemsToSkip } from "@/utils/getItemsToSkip";
import { appConfig } from "@/config/app";
import { getSearchParams } from "@/modules/clusters/cluster-information/components/addonsTable/utils/addonsTableUtils";

const { RESOURCES, HELM_CHART, PROFILE_STATUSES } = API_ENDPOINTS;

const getResources = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
  page: number,
  params: Record<string, string>,
) => {
  const { data } = await client.get(RESOURCES, {
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

const getClusterProfileStatuses = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
  page: number,
  toggleFailFilter: boolean,
  params: Record<string, string>,
) => {
  const { data } = await client.get(PROFILE_STATUSES, {
    params: {
      namespace,
      name: clusterName,
      type: getClusterInfoType(clusterType),
      skip: getItemsToSkip(page, appConfig.defaultTableSize),
      limit: appConfig.defaultTableSize,
      failed: toggleFailFilter,
      ...params,
    },
  });
  return data;
};

const getHelmCharts = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
  page: number,
  params: Record<string, string>,
) => {
  const { data } = await client.get(HELM_CHART, {
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

const getClusterInfo = async (
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
) => {
  const { data } = await client.get(pathFromType(clusterType), {
    params: {
      namespace,
      name: clusterName,
    },
  });
  return data;
};

function useClusterTableInfo(
  namespace: string,
  clusterName: string,
  clusterType: ClusterType,
) {
  const [searchParams] = useSearchParams();
  const failedOnly = searchParams.get(appConfig.queryParams.failure) === "true";
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
        getSearchParams(AddonTypes.RESOURCE, searchParams),
      ],
      queryFn: () =>
        getResources(
          namespace,
          clusterName,
          clusterType,
          resourcePage,
          getSearchParams(AddonTypes.RESOURCE, searchParams),
        ),
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
        getSearchParams(AddonTypes.PROFILE, searchParams),
      ],
      queryFn: () =>
        getClusterProfileStatuses(
          namespace,
          clusterName,
          clusterType,
          profilePage,
          failedOnly,
          getSearchParams(AddonTypes.PROFILE, searchParams),
        ),
      enabled: !!namespace && !!clusterName && !!clusterType,
      placeholderData: { data: [], isLoading: true, error: null },
    },
    {
      queryKey: [
        "helmChart",
        namespace,
        clusterName,
        clusterType,
        helmPage,
        getSearchParams(AddonTypes.HELM, searchParams),
      ],
      queryFn: () =>
        getHelmCharts(
          namespace,
          clusterName,
          clusterType,
          helmPage,
          getSearchParams(AddonTypes.HELM, searchParams),
        ),
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

export { useClusterTableInfo };
