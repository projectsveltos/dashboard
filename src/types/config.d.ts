interface AppConfig {
  oidcIssuer: string;
  oidcClientId: string;
  oidcRedirectUri: string;
  oidcScope: string;
  oidcTokenType: string;
}

declare global {
  interface Window {
    __CONFIG__: AppConfig;
  }
}

export {};
