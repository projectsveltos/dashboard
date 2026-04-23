import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { TierData, ProfilesResponseObject } from "@/types/profile.types";
import { extractFiltersFromSearchParams } from "@/lib/utils";

const fetchProfiles = async (
  filters: Record<string, string>,
  dryRun?: boolean,
): Promise<Array<TierData>> => {
  const params = dryRun ? { ...filters, dryRun: true } : filters;
  const { data } = await client.get<ProfilesResponseObject>(
    API_ENDPOINTS.PROFILES,
    {
      params,
    },
  );
  return Object.entries(data).map(([key, value]) => ({
    id: key,
    totalProfiles: value.totalProfiles,
    profiles: value.profiles,
  }));
};

const useProfiles = (
  searchConfig: { key: string; placeholder: string }[],
  dryRun?: boolean,
): UseQueryResult<Array<TierData>, Error> => {
  const [searchParams] = useSearchParams();

  const filters = extractFiltersFromSearchParams(searchParams, searchConfig);

  return useQuery({
    queryKey: ["profiles", filters, dryRun],
    queryFn: () => fetchProfiles(filters, dryRun),
  });
};

export default useProfiles;
