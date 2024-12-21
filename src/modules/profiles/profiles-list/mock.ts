export const mockProfileListRespArray = [
  {
    id: "100",
    totalProfiles: 3,
    profiles: [
      {
        namespace: "",
        name: "",
        dependencies: [],
        dependents: [
          {
            kind: "ClusterProfile",
            name: "prometheus-grafana",
            apiVersion: "config.projectsveltos.io/v1beta1",
          },
        ],
      },
      { namespace: "", name: "nginx", dependencies: [], dependents: [] },
      {
        namespace: "",
        name: "prometheus-grafana",
        dependencies: [
          {
            kind: "ClusterProfile",
            name: "deploy-kyverno",
            apiVersion: "config.projectsveltos.io/v1beta1",
          },
        ],
        dependents: [],
      },
    ],
  },
  {
    id: "200",
    totalProfiles: 1,
    profiles: [
      { namespace: "", name: "external-dns", dependencies: [], dependents: [] },
    ],
  },
];
