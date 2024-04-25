import {
  ClusterApiType,
  ClusterType,
  SveltosClusterType,
} from "@/types/cluster";

export const clusterAPIValue: ClusterType | ClusterApiType = "ClusterAPI";
export const sveltosClusterValue: ClusterType | SveltosClusterType =
  "SveltosCluster";
export const clusterTypes = [sveltosClusterValue, clusterAPIValue];
