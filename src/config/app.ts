interface AppConfig {
  name: string;
  github: {
    title: string;
    url: string;
  };
}

export const appConfig: AppConfig = {
  name: "Sveltos",
  github: {
    title: "dashboard",
    url: "https://github.com/projectsveltos/dashboard",
  },
};
