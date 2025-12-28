import { useQuery, UseQueryResult } from "react-query";

import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { EventTriggerDetails } from "@/types/event.types";

const fetchEventDetails = async (
  name?: string,
): Promise<EventTriggerDetails> => {
  const { data } = await client.get(API_ENDPOINTS.EVENT, {
    params: {
      name,
    },
  });

  return data as EventTriggerDetails;
};

const useEventDetails = (
  name?: string,
): UseQueryResult<EventTriggerDetails, Error> => {
  return useQuery(["event", name], () => fetchEventDetails(name), {
    enabled: !!name,

    staleTime: 1000 * 60,
  });
};

export default useEventDetails;
