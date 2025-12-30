import { useQuery, UseQueryResult } from "react-query";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";

interface DebugMcpParams {
  namespace: string;
  name: string;
  type: string;
  event_name: string;
}

const fetchDebugMcp = async (params: DebugMcpParams): Promise<string[]> => {
  const { data } = await client.get(API_ENDPOINTS.MCP_EVENT_PIPELINE_DEBUG, {
    params: {
      namespace: params.namespace,
      name: params.name,
      type: params.type,
      event_name: params.event_name,
    },
  });
  return data as string[];
};

export const useEventClusterDebugMcp = (
  params: DebugMcpParams,
  enabled: boolean = false,
): UseQueryResult<string[], Error> => {
  return useQuery(["debugMcp", params], () => fetchDebugMcp(params), {
    enabled,
    retry: false,
  });
};
