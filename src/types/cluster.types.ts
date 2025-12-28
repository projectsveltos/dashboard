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
  clusterInfo: {
    labels: Label[];
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
