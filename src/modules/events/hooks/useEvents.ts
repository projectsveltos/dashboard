import { useQuery, UseQueryResult } from "react-query";
import { useSearchParams } from "react-router-dom";

import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { extractFiltersFromSearchParams } from "@/lib/utils";
import { appConfig } from "@/config/app";
import { getItemsToSkip } from "@/api-client/util/getItemsToSkip";
import { EventsListResponse } from "@/types/event.types";

const fetchEvents = async (
  page: number,
  params: Record<string, string>,
): Promise<EventsListResponse> => {
  const { data } = await client.get(API_ENDPOINTS.EVENTS, {
    params: {
      skip: getItemsToSkip(page, appConfig.defaultSize),
      limit: appConfig.defaultSize,
      ...params,
    },
  });
  return data as EventsListResponse;
};

export const DEFAULT_EVENTS_SEARCH_CONFIG = [
  { key: "name", placeholder: "Search by Event Name" },
  { key: "cluster_namespace", placeholder: "Cluster Namespace" },
  { key: "cluster_name", placeholder: "Cluster Name" },
];

const useEvents = (
  page: number = appConfig.defaultPage,
  params?: Record<string, string>,
  searchConfig: {
    key: string;
    placeholder: string;
  }[] = DEFAULT_EVENTS_SEARCH_CONFIG,
): UseQueryResult<EventsListResponse, Error> => {
  const [searchParams] = useSearchParams();
  const filters = params
    ? params
    : extractFiltersFromSearchParams(searchParams, searchConfig);

  return useQuery(["events", page, filters], () => fetchEvents(page, filters), {
    keepPreviousData: false,
  });
};

export default useEvents;
