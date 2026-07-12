import { useQuery, UseQueryResult } from "@tanstack/react-query";

import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { ClassifierDetails } from "@/types/classifier.types";

const fetchClassifierDetails = async (
  name?: string,
  type?: string,
): Promise<ClassifierDetails> => {
  const { data } = await client.get(API_ENDPOINTS.CLASSIFIER, {
    params: {
      name,
      type,
    },
  });

  return data as ClassifierDetails;
};

const useClassifierDetails = (
  name?: string,
  type?: string,
): UseQueryResult<ClassifierDetails, Error> => {
  return useQuery({
    queryKey: ["classifier", name, type],
    queryFn: () => fetchClassifierDetails(name, type),
    enabled: !!name && !!type,
    staleTime: 1000 * 60,
  });
};

export default useClassifierDetails;
