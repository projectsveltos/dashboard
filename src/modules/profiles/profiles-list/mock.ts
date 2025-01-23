export const mockProfileListRespArray = [
  {
    id: "100",
    totalProfiles: 2,
    profiles: [
      {
        kind: "ClusterProfile",
        namespace: "",
        name: "deploy-kyverno",
        dependencies: [],
        dependents: [
          {
            kind: "ClusterProfile",
            name: "deploy-kyverno-resources",
            apiVersion: "config.projectsveltos.io/v1beta1",
          },
        ],
        matchingClusters: null,
        spec: {
          clusterSelector: {},
        },
      },
      {
        kind: "ClusterProfile",
        namespace: "",
        name: "deploy-kyverno-resources",
        dependencies: [
          {
            kind: "ClusterProfile",
            name: "deploy-kyverno",
            apiVersion: "config.projectsveltos.io/v1beta1",
          },
        ],
        dependents: [],
        matchingClusters: null,
        spec: {
          clusterSelector: {},
        },
      },
    ],
  },
];
