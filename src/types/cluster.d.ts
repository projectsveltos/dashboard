export type Label = {
  id?: number;
  designation: string;
};

export type SveltosClusterType = "SveltosCluster";
export type ClusterApiType = "ClusterAPI";
export type ClusterType = SveltosClusterType | ClusterApiType;

interface Label {
  [key: string]: string;
}

interface ClusterInfo {
  namespace: string;
  name: string;
  clusterInfo: {
    labels?: Label[];
    version?: string;
    ready?: boolean;
    failureMessage?: string | null;
  };
}

export type ClusterListResponse = {
  totalClusters: number;
  managedClusters: ClusterType[];
};
