// Health of the resources Sveltos deployed, as reported by ui-backend (health monitoring).

export type HealthStatus =
  "NoData" | "Healthy" | "Suspended" | "Progressing" | "Degraded";

// State of a whole cluster in /clusterHealth: NotEnabled means no profile monitors the cluster.
export type ClusterHealthState = HealthStatus | "NotEnabled";

export type HealthProfileRef = {
  kind: string;
  namespace?: string;
  name: string;
};

export type HealthResource = {
  group: string;
  version: string;
  kind: string;
  namespace?: string;
  name: string;
  status: HealthStatus;
  message?: string;
  // Profiles owning the HealthCheck that reported the resource. Empty when none does.
  profiles: HealthProfileRef[];
  // Set only when no profile owns the HealthCheck.
  healthCheckName?: string;
  // Set by views listing resources of several clusters.
  clusterNamespace?: string;
  clusterName?: string;
};

export type ClusterHealthResponse = {
  state: ClusterHealthState;
  totalResources: number;
  resources: HealthResource[];
};
