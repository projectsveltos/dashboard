import { useQuery, UseQueryResult } from "@tanstack/react-query";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";

interface DebugMcpParams {
  namespace: string;
  name: string;
  type: string;
  classifier_name: string;
}

const fetchDebugMcp = async (params: DebugMcpParams): Promise<string[]> => {
  const { data } = await client.get(API_ENDPOINTS.MCP_CLASSIFIER_PIPELINE_DEBUG, {
    params: {
      namespace: params.namespace,
      name: params.name,
      type: params.type,
      classifier_name: params.classifier_name,
    },
  });
  return data as string[];
};

export const useClassifierClusterDebugMcp = (
  params: DebugMcpParams,
  enabled: boolean = false,
): UseQueryResult<string[], Error> => {
  return useQuery({
    queryKey: ["debugMcp", params],
    queryFn: () => fetchDebugMcp(params),
    enabled,
    retry: false,
  });
};
