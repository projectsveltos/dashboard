import { useQuery } from "react-query";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";

const getDebugProfileCluster = async (
  namespace: string,
  clusterName: string,
  clusterType: string,
  profileName: string,
  profileKind: string,
): Promise<string> => {
  const { data } = await client.get(API_ENDPOINTS.MCP_PROFILE_CLUSTER_DEBUG, {
    params: {
      namespace,
      clusterName,
      clusterType,
      profileName,
      profileKind,
    },
  });
  return data;
};

const getDebugCluster = async (
  namespace: string,
  name: string,
  type: string,
): Promise<string> => {
  const { data } = await client.get(API_ENDPOINTS.MCP_CLUSTER_DEBUG, {
    params: {
      namespace,
      name,
      type,
    },
  });
  return data;
};

const getInstallation = async (): Promise<string> => {
  const { data } = await client.get(API_ENDPOINTS.MCP_INSTALLATION);
  return data;
};

function useMcp(
  namespace: string,
  clusterName: string,
  clusterType: string,
  profileName: string,
  profileKind: string,
) {
  const debugProfileClusterQuery = useQuery(
    [
      "debugProfileCluster",
      namespace,
      clusterName,
      clusterType,
      profileName,
      profileKind,
    ],
    () =>
      getDebugProfileCluster(
        namespace,
        clusterName,
        clusterType,
        profileName,
        profileKind,
      ),
    {
      enabled:
        !!namespace &&
        !!clusterName &&
        !!clusterType &&
        !!profileName &&
        !!profileKind,
      placeholderData: "",
    },
  );

  const debugClusterQuery = useQuery(
    ["debugCluster", namespace, clusterName, clusterType],
    () => getDebugCluster(namespace, clusterName, clusterType),
    {
      enabled: false,
      placeholderData: "",
      cacheTime: 0,
    },
  );

  const installationQuery = useQuery(
    ["installation"],
    () => getInstallation(),
    {
      placeholderData: "",
      enabled: false,
      cacheTime: 0,
    },
  );

  return {
    debugProfileClusterQuery,
    debugClusterQuery,
    installationQuery,
  };
}

export { useMcp };
