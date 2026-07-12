export type ClassifierKind = "Classifier" | "ManagementClusterClassifier";

export type ClassifierSummary = {
  name: string;
  type: ClassifierKind;
  labelCount: number;
  matchingClusterCount: number;
};

export type ClassifiersListResponse = {
  totalClassifiers: number;
  classifiers: ClassifierSummary[];
};

export type ClassifierLabelEntry = {
  key: string;
  value: string;
};

export type UnManagedLabelEntry = {
  key: string;
  failureMessage?: string;
};

export type MatchingClusterEntry = {
  clusterNamespace: string;
  clusterName: string;
  clusterType: string;
  managedLabels?: ClassifierLabelEntry[];
  conflictedLabels?: UnManagedLabelEntry[];
};

export type KubernetesVersionConstraint = {
  version: string;
  comparison: string;
};

export type ClassifierResourceSelector = {
  group?: string;
  version?: string;
  kind?: string;
  namespace?: string;
  selector?: { matchLabels?: Record<string, string> };
};

export type ClassifierDetails = {
  name: string;
  type: ClassifierKind;

  // Classifier-only
  resourceSelectors?: ClassifierResourceSelector[];
  aggregatedClassification?: string;
  kubernetesVersionConstraints?: KubernetesVersionConstraint[];

  // ManagementClusterClassifier-only
  matchResources?: ClassifierResourceSelector[];
  classificationLua?: string;

  // shared
  classifierLabels: ClassifierLabelEntry[];
  matchingClusters: MatchingClusterEntry[];
};
