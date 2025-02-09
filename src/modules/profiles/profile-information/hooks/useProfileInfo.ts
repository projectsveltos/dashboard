import { useQuery, UseQueryResult } from "react-query";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { ProfileInfo } from "@/types/profile.types";
import { useMemo } from "react";

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
  const queryKey = useMemo(() => ["profile-info", name, kind], [name, kind]);
  return useQuery(queryKey, () => fetchProfileInfo(name, kind), {
    keepPreviousData: false,
  });
};

export default useProfileInfo;
