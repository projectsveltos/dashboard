import { useQuery, UseQueryResult } from "react-query";

import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { TierData, ProfilesResponseObject } from "@/types/profile.types";

const fetchProfiles = async (): Promise<Array<TierData>> => {
  const { data } = await client.get<ProfilesResponseObject>(
    API_ENDPOINTS.PROFILES,
    {},
  );
  return Object.entries(data).map(([key, value]) => ({
    id: key,
    totalProfiles: value.totalProfiles,
    profiles: value.profiles,
  }));
};
const useProfiles = (): UseQueryResult<Array<TierData>, Error> => {
  return useQuery(["profiles"], () => fetchProfiles(), {
    keepPreviousData: false,
  });
};

export default useProfiles;
