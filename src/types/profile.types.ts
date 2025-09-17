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
export interface ProfileInfo {
  name: string;
  namespace: string;
  kind: string;
  dependencies: Dependency[];
  dependents: Dependency[];
  matchingClusters: MatchingCluster[];
  spec: {
    clusterSelector: {
      matchLabels: {
        env: string;
      };
    };
    tier: string;
    syncMode: string;
    stopMatchingBehavior: string;
    policyRefs: {
      namespace: string;
      name: string;
      kind: string;
      deploymentType: string;
    }[];
  };
}
export interface FailedProfile {
  profileName: string;
  isSuccessful: boolean;
  causes: string[];
}
