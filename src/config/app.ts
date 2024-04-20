interface AppConfig {
  name: string;
  github: {
    title: string;
    url: string;
  };
  sveltosType: string;
  clusterAPIType: string;
}

export const appConfig: AppConfig = {
  name: "Sveltos",
  github: {
    title: "dashboard",
    url: "https://github.com/projectsveltos/dashboard",
  },
  sveltosType: "SveltosAPI",
  clusterAPIType: "ClusterAPI",
};
