import { useQuery, UseQueryResult } from "react-query";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { ProfileInfo } from "@/types/profile.types";
import { useMemo } from "react";

const fetchProfileInfo = async (
  profile_namespace: string,
  profile_name: string,
  profile_kind: string,
) => {
  const { data } = await client.get(API_ENDPOINTS.PROFILE, {
    params: {
      profile_namespace,
      profile_name,
      profile_kind,
    },
  });
  return data;
};

const useProfileInfo = (
  profile_namespace: string,
  profile_name: string,
  profile_kind: string,
): UseQueryResult<ProfileInfo, Error> => {
  const queryKey = useMemo(
    () => ["profile-info", profile_namespace, profile_name, profile_kind],
    [profile_namespace, profile_name, profile_kind],
  );
  return useQuery(queryKey, () => fetchProfileInfo(profile_namespace, profile_name, profile_kind), {
    keepPreviousData: false,
  });
};

export default useProfileInfo;
