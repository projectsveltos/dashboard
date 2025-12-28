export type Resource = {
  name: string;
  namespace: string;
  group: string;
  kind: string;
  version: string;
  profileNames?: string[] | null;
};

export type ClusterHealth = "healthy" | "unhealthy" | "unknown";

export type ClusterEventMatch = {
  clusterNamespace: string;
  clusterName: string;
  clusterKind: string;
  failureMessage?: string;
  resources?: Resource[];
  paused?: boolean;
};

export type LabelFilter = {
  key: string;
  operation: string;
  value: string;
};

export type ResourceSelector = {
  group?: string;
  version?: string;
  kind?: string;
  labelFilters?: LabelFilter[];
};

export type EventSourceSpec = {
  resourceSelectors: ResourceSelector[];
  collectResources: boolean;
};

export type EventSourceMetadata = {
  name: string;
};

export type EventSource = {
  kind: string;
  apiVersion: string;
  metadata: EventSourceMetadata;
  spec: EventSourceSpec;
};

export type EventTriggerDetails = {
  eventTriggerName: string;
  clusterSelector?: { matchLabels?: Record<string, string> };
  eventSource?: EventSource;
  clusterEventMatches?: ClusterEventMatch[];
};

export type EventTriggerSummary = {
  name: string;
  matchingClusters: number;
};

export type EventsListResponse = {
  totalEvents: number;
  eventTriggers: EventTriggerSummary[];
};
