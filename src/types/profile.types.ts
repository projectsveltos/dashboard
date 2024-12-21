interface Dependency {
  namespace: string;
  name: string;
  version?: string;
}
interface Dependent {
  kind: string;
  name: string;
  apiVersion: string;
}

export interface Profile {
  namespace: string;
  name: string;
  dependencies: Dependency[];
  dependents: Dependent[];
}
export interface Tier {
  id: string;
  totalProfiles: number;
  profiles: Profile[];
}
