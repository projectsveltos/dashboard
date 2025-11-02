import { useQuery, UseQueryResult } from "react-query";
import { useSearchParams } from "react-router-dom";

import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { TierData, ProfilesResponseObject } from "@/types/profile.types";
import { extractFiltersFromSearchParams } from "@/lib/utils";

const fetchProfiles = async (
  filters: Record<string, string>,
): Promise<Array<TierData>> => {
  const { data } = await client.get<ProfilesResponseObject>(
    API_ENDPOINTS.PROFILES,
    {
      params: filters,
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
): UseQueryResult<Array<TierData>, Error> => {
  const [searchParams] = useSearchParams();

  const filters = extractFiltersFromSearchParams(searchParams, searchConfig);

  return useQuery(["profiles", filters], () => fetchProfiles(filters), {
    keepPreviousData: false,
  });
};

export default useProfiles;
