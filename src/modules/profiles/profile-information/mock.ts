export const profileInfo = {
  kind: "ClusterProfile",
  namespace: "",
  name: "deploy-kyverno-resources",
  dependencies: [
    {
      kind: "ClusterProfile",
      name: "deploy-kyverno",
      apiVersion: "config.projectsveltos.io/v1beta1",
    },
    {
      kind: "ClusterProfile",
      name: "deploy-kyverno",
      apiVersion: "config.projectsveltos.io/v1beta1",
    },
    {
      kind: "ClusterProfile",
      name: "deploy-kyverno",
      apiVersion: "config.projectsveltos.io/v1beta1",
    },
    {
      kind: "ClusterProfile",
      name: "deploy-kyverno",
      apiVersion: "config.projectsveltos.io/v1beta1",
    },
    {
      kind: "ClusterProfile",
      name: "deploy-kyverno",
      apiVersion: "config.projectsveltos.io/v1beta1",
    },
  ],
  dependents: [
    {
      kind: "ClusterProfile",
      name: "deploy-DEP",
      apiVersion: "config.projectsveltos.io/v1beta1",
    },
    {
      kind: "ClusterProfile",
      name: "deploy-DEP",
      apiVersion: "config.projectsveltos.io/v1beta1",
    },
    {
      kind: "ClusterProfile",
      name: "deploy-DEP",
      apiVersion: "config.projectsveltos.io/v1beta1",
    },
  ],
  matchingClusters: [
    {
      cluster: {
        kind: "Cluster",
        namespace: "default",
        name: "clusterapi-workload",
        apiVersion: "cluster.x-k8s.io/v1beta1",
      },
      clusterFeatureSummaries: [
        {
          featureID: "Resources",
          status: "Provisioned",
        },
        {
          featureID: "Helm",
          status: "FailedNonRetriable",
          failureMessage:
            "cannot manage chart kyverno/kyverno-latest. ClusterSummary deploy-kyverno-capi-clusterapi-workload managing it.\n",
        },
      ],
    },
  ],
  spec: {
    clusterSelector: {
      matchLabels: {
        env: "fv",
      },
    },
    syncMode: "Continuous",
    tier: 100,
    stopMatchingBehavior: "WithdrawPolicies",
    dependsOn: ["deploy-kyverno"],
    policyRefs: [
      {
        namespace: "default",
        name: "disallow-latest-tag",
        kind: "ConfigMap",
        deploymentType: "Remote",
      },
      {
        namespace: "default",
        name: "disallow-empty-ingress",
        kind: "ConfigMap",
        deploymentType: "Remote",
      },
    ],
    helmCharts: [
      {
        repositoryURL: "https://kyverno.github.io/kyverno/",
        repositoryName: "kyverno",
        chartName: "kyverno/kyverno",
        chartVersion: "v3.2.6",
        releaseName: "kyverno-latest",
        releaseNamespace: "kyverno",
        helmChartAction: "Install",
      },
    ],
  },
};
