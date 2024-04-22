export type clusterType = "SveltosCluster" | "ClusterAPI";
interface AppConfig {
  name: string;
  github: {
    title: string;
    url: string;
  };
  sveltosType: clusterType;
  clusterAPIType: clusterType;
  defaultType: clusterType;
  defaultPage: number;
}

export const appConfig: AppConfig = {
  name: "Sveltos",
  github: {
    title: "dashboard",
    url: "https://github.com/projectsveltos/dashboard",
  },
  sveltosType: "SveltosCluster",
  clusterAPIType: "ClusterAPI",
  defaultType: "SveltosCluster",
  defaultPage: 0,
};
