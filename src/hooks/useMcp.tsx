import { useQuery } from "@tanstack/react-query";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { FailedProfile } from "@/types/profile.types";
interface InstallationMcpResponse {
  details: string[];
  is_correctly_installed: boolean;
}

const processMcpProfiles = (
  profiles: FailedProfile[] | FailedProfile,
): string | string[] => {
  if (Array.isArray(profiles)) {
    return profiles
      .flatMap((profile: FailedProfile) => {
        if (profile.isSuccessful) {
          return `${profile.profileName}: Correctly installed.`;
        }
        return profile.causes.map(
          (cause: string) => `${profile.profileName}: ${cause.trim()}`,
        );
      })
      .filter((line: string) => line.length > 0);
  } else {
    if (profiles.isSuccessful) {
      return `${profiles.profileName}: Correctly installed.`;
    }
    return profiles.causes
      .map((cause: string) => `${profiles.profileName}: ${cause.trim()}`)
      .join("\n");
  }
};
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

  return processMcpProfiles(data) as string;
};
export interface DebugClusterResponse {
  rawData: string;
  formattedData: string[];
}

const getDebugCluster = async (
  namespace: string,
  name: string,
  type: string,
): Promise<DebugClusterResponse> => {
  const { data } = await client.get(API_ENDPOINTS.MCP_CLUSTER_DEBUG, {
    params: {
      namespace,
      name,
      type,
    },
  });
  const formattedData = processMcpProfiles(data?.failedProfiles || []);
  return { rawData: data, formattedData: formattedData as string[] };
};

const getInstallation = async (): Promise<InstallationMcpResponse> => {
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
  const debugProfileClusterQuery = useQuery({
    queryKey: [
      "debugProfileCluster",
      namespace,
      clusterName,
      clusterType,
      profileName,
      profileKind,
    ],
    queryFn: () =>
      getDebugProfileCluster(
        namespace,
        clusterName,
        clusterType,
        profileName,
        profileKind,
      ),
    enabled: false,
    placeholderData: "",
  });

  const debugClusterQuery = useQuery({
    queryKey: ["debugCluster", namespace, clusterName, clusterType],
    queryFn: () => getDebugCluster(namespace, clusterName, clusterType),
    enabled: false,
    gcTime: 0,
    staleTime: 0,
  });

  const installationQuery = useQuery({
    queryKey: ["installation"],
    queryFn: () => getInstallation(),
    enabled: false,
    placeholderData: { details: [], is_correctly_installed: false },
    gcTime: 0,
  });

  return {
    debugProfileClusterQuery,
    debugClusterQuery,
    installationQuery,
  };
}

export { useMcp };
