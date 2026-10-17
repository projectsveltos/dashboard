import { HealthStatus } from "@/types/health.types";

export type SveltosClusterType = "SveltosCluster";
export type ClusterApiType = "ClusterAPI";
export type ClusterType = SveltosClusterType | ClusterApiType;

export interface Label {
  [key: string]: string;
}

export interface ClusterInfoType {
  namespace: string;
  name: string;
  kind?: string;
  hasIssues?: boolean;
  isProvisioning?: boolean;
  hasOutdatedHelmCharts?: boolean;
  // Health reported for the cluster. Absent when nothing monitors it: no profile with health monitoring
  // enabled and no health report.
  healthStatus?: HealthStatus;
  clusterInfo: {
    labels: Label;
    version: string;
    ready: boolean;
    paused: boolean;
    failureMessage?: string | null;
  };
}

export type ClusterListResponse = {
  totalClusters: number;
  managedClusters: ClusterInfoType[];
};
