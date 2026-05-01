import { useQuery, UseQueryResult } from "@tanstack/react-query";
import client from "@/api-client/apiClient";
import { API_ENDPOINTS } from "@/api-client/endpoints";

export interface OverviewStats {
  capiClusters: number;
  notReadyCAPIClusters: number;
  sveltosClusters: number;
  notReadySveltosClusters: number;
  pullModeClusters: number;
  clusterProfiles: number;
  profiles: number;
  clusterSummaries: number;
  eventTriggers: number;
}

const fetchStats = async (): Promise<OverviewStats> => {
  const { data } = await client.get(API_ENDPOINTS.STATS);
  return data;
};

const useOverviewStats = (): UseQueryResult<OverviewStats, Error> => {
  return useQuery({
    queryKey: ["overview-stats"],
    queryFn: fetchStats,
    refetchInterval: 30_000,
    staleTime: 15_000,
  });
};

export default useOverviewStats;
