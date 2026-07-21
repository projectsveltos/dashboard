import { useQuery, UseQueryResult } from "@tanstack/react-query";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { HelmReleaseReponse } from "@/types/helm.types";

interface OutdatedHelmChartsParams {
  namespace: string;
  name: string;
  type: string;
}

// Formats each outdated release as "release (namespace): current -> latest" for the McpButton popover.
const formatOutdatedHelmCharts = (data: HelmReleaseReponse): string[] => {
  return (data?.helmReleases || [])
    .filter((release) => release.latestVersion || release.latestPatchVersion)
    .map((release) => {
      const newerVersion = release.latestPatchVersion || release.latestVersion;
      return `${release.releaseName} (${release.namespace}): ${release.chartVersion} -> ${newerVersion} available`;
    });
};

const fetchOutdatedHelmCharts = async (
  params: OutdatedHelmChartsParams,
): Promise<string[]> => {
  const { data } = await client.get(API_ENDPOINTS.HELM_CHART, {
    params: {
      namespace: params.namespace,
      name: params.name,
      type: params.type,
    },
  });
  return formatOutdatedHelmCharts(data);
};

export const useOutdatedHelmCharts = (
  params: OutdatedHelmChartsParams,
  enabled: boolean = false,
): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: ["outdatedHelmCharts", params],
    queryFn: () => fetchOutdatedHelmCharts(params),
    enabled,
  });
};
