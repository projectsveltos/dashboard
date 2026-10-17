import { useQuery, UseQueryResult } from "@tanstack/react-query";

import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { ClusterType } from "@/types/cluster.types";
import { EventResourcesResponse } from "@/types/event.types";
import {
  buildEventResourcesParams,
  EventResourcesFilters,
} from "@/utils/eventResources";

type EventResourcesTarget = {
  eventName: string;
  clusterNamespace: string;
  clusterName: string;
  clusterType: ClusterType;
};

const fetchEventResources = async (
  target: EventResourcesTarget,
  page: number,
  filters: EventResourcesFilters,
): Promise<EventResourcesResponse> => {
  const { data } = await client.get(API_ENDPOINTS.EVENT_RESOURCES, {
    params: buildEventResourcesParams(target, page, filters),
  });
  return data as EventResourcesResponse;
};

// useEventResources loads one page of the resources matching an EventTrigger in a cluster. Nothing is requested
// until enabled is true: the dialog showing them asks for them only once opened.
const useEventResources = (
  target: EventResourcesTarget,
  page: number,
  filters: EventResourcesFilters,
  enabled: boolean,
): UseQueryResult<EventResourcesResponse, Error> => {
  return useQuery({
    queryKey: ["eventResources", target, page, filters],
    queryFn: () => fetchEventResources(target, page, filters),
    enabled,
  });
};

export default useEventResources;
