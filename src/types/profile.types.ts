export interface Tier {
  id: string;
  totalProfiles: number;
  profiles: Profile[];
}

export interface Profile {
  kind: string;
  namespace: string;
  name: string;
  dependencies: Dependency[];
  dependents: Dependency[];
  matchingClusters: any;
  spec: Spec;
}

export interface Dependency {
  kind: string;
  name: string;
  apiVersion: string;
}

export interface Spec {
  clusterSelector: any;
}
