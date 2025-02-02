import { useQuery, UseQueryResult } from "react-query";

import client from "@/api-client/apiClient";

import { API_ENDPOINTS } from "@/api-client/endpoints";
import { ProfileInfo } from "@/types/profile.types";
const fetchProfileInfo = async (name: string, kind: string) => {
  const { data } = await client.get(API_ENDPOINTS.PROFILE, {
    params: {
      name,
      kind,
    },
  });
  return data;
};
const useProfileInfo = (
  name: string,
  kind: string,
): UseQueryResult<ProfileInfo, Error> => {
  return useQuery(
    ["profile-info", name, kind],
    () => fetchProfileInfo(name, kind),
    {
      keepPreviousData: false,
      cacheTime: 0,
    },
  );
};

export default useProfileInfo;
