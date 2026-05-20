interface AppConfig {
  oidcIssuer: string;
  oidcClientId: string;
  oidcRedirectUri: string;
}

declare global {
  interface Window {
    __CONFIG__: AppConfig;
  }
}

export {};
