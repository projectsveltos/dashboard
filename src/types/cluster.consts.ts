import {
  ClusterApiType,
  ClusterType,
  SveltosClusterType,
} from "@/types/cluster";

export const clusterAPIValue: ClusterType | ClusterApiType = "ClusterAPI";
export const sveltosClusterValue: ClusterType | SveltosClusterType =
  "SveltosCluster";
export const clusterTypes = [sveltosClusterValue, clusterAPIValue];
export const clusterInfoSveltosType = "sveltos";
export const clusterInfoCapiType = "capi";
export type clusterInfoTypes = "sveltos" | "capi";
