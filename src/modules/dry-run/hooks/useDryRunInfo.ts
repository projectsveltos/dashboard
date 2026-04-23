import { useQuery, UseQueryResult } from "@tanstack/react-query";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";
import { DryRunResponse } from "@/types/profile.types";
import { useMemo } from "react";

const fetchDryRunInfo = async (
  profile_name: string,
  profile_kind: string,
  type: "sveltos" | "capi",
  namespace: string,
  name: string,
) => {
  const params: Record<string, string> = {
    profile_name,
    profile_kind,
    type,
    namespace,
    name,
  };

  const { data } = await client.get(API_ENDPOINTS.DRY_RUN_CHANGES, {
    params,
  });
  return data;
};

const useDryRunInfo = (
  profile_name: string,
  profile_kind: string,
  type: "sveltos" | "capi",
  namespace: string,
  name: string,
): UseQueryResult<DryRunResponse, Error> => {
  const queryKey = useMemo(
    () => ["dry-run-info", profile_name, profile_kind, type, namespace, name],
    [profile_name, profile_kind, type, namespace, name],
  );
  return useQuery({
    queryKey,
    queryFn: () =>
      fetchDryRunInfo(profile_name, profile_kind, type, namespace, name),
    enabled:
      !!type && !!namespace && !!name && !!profile_name && !!profile_kind,
  });
};

export default useDryRunInfo;
