export type clusterType = "SveltosAPI" | "ClusterAPI";
interface AppConfig {
  name: string;
  github: {
    title: string;
    url: string;
  };
  sveltosType: clusterType;
  clusterAPIType: clusterType;
  defaultType: clusterType;
}

export const appConfig: AppConfig = {
  name: "Sveltos",
  github: {
    title: "dashboard",
    url: "https://github.com/projectsveltos/dashboard",
  },
  sveltosType: "SveltosAPI",
  clusterAPIType: "ClusterAPI",
  defaultType: "SveltosAPI",
};
