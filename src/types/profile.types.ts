export interface Tier {
  id: string;
  totalProfiles: number;
  profiles: Profile[];
}

export interface Profile {
  kind: string;
  namespace: string;
  name: string;
  dependencies: Array<{ kind: string; name: string; apiVersion: string }>;
  dependents: Array<{ kind: string; name: string; apiVersion: string }>;
  matchingClusters: never[];
  spec: { clusterSelector: object };
}

export interface ProfilesResponseObject {
  [key: string]: {
    totalProfiles: number;
    profiles: Profile[];
  };
}

export type TierData = {
  id: string;
  totalProfiles: number;
  profiles: Profile[];
};

export interface Dependency {
  kind: string;
  namespace: string;
  name: string;
  apiVersion: string;
}

export interface MatchingCluster {
  cluster: {
    kind: string;
    namespace: string;
    name: string;
    apiVersion: string;
  };
  clusterFeatureSummaries: {
    failureMessage: string;
    featureID: string;
    status: string;
  }[];
}

export interface HelmChart {
  repositoryURL: string;
  repositoryName: string;
  chartName: string;
  chartVersion: string;
  releaseName: string;
  releaseNamespace: string;
  values?: string;
  helmChartAction: string;
}

export interface ProfileInfo {
  name: string;
  namespace: string;
  kind: string;
  dependencies: Dependency[];
  dependents: Dependency[];
  matchingClusters: MatchingCluster[];
  spec: {
    clusterSelector: {
      matchLabels?: {
        [key: string]: string;
      };
      matchExpressions?: {
        key: string;
        operator: string;
        values: string[];
      }[];
    };
    tier?: number;
    syncMode: string;
    stopMatchingBehavior: string;
    reloader?: boolean;
    policyRefs?: {
      namespace: string;
      name: string;
      kind: string;
      deploymentType: string;
    }[];
    helmCharts?: HelmChart[];
  };
}

export interface FailedProfile {
  profileName: string;
  isSuccessful: boolean;
  causes: string[];
}

export interface ResourceChange {
  name: string;
  group: string;
  kind: string;
  version: string;
  action: string;
  message?: string;
}

export interface HelmReleaseChange {
  releaseName: string;
  releaseNamespace: string;
  chartVersion: string;
  action: string;
  message: string;
}

export interface DryRunResponse {
  profileName: string;
  profileKind: string;
  hasChanges: boolean;
  resourceChanges?: ResourceChange[];
  helmReleaseChanges?: HelmReleaseChange[];
}
