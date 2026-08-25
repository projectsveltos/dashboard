import { UserManager, WebStorageStateStore } from "oidc-client-ts";

// Prefer runtime config (injected by Docker entrypoint); fall back to build-time env vars for local dev.
const authority =
  window.__CONFIG__?.oidcIssuer ||
  (import.meta.env.VITE_OIDC_ISSUER as string | undefined);
const clientId =
  window.__CONFIG__?.oidcClientId ||
  (import.meta.env.VITE_OIDC_CLIENT_ID as string | undefined);
const redirectUri =
  window.__CONFIG__?.oidcRedirectUri ||
  (import.meta.env.VITE_OIDC_REDIRECT_URI as string | undefined) ||
  `${window.location.origin}/oidc-callback`;
const defaultScope = "openid profile email offline_access";
// Override when the provider must issue an access token audienced to a specific resource,
// e.g. AKS with Microsoft Entra ID authorization requires the AKS server app's scope here.
const scope =
  window.__CONFIG__?.oidcScope ||
  (import.meta.env.VITE_OIDC_SCOPE as string | undefined) ||
  defaultScope;

// Derive the route path from the redirect URI
export const oidcCallbackPath = new URL(redirectUri, window.location.origin)
  .pathname;

export const isOidcConfigured = Boolean(authority && clientId);

export const userManager = isOidcConfigured
  ? new UserManager({
      authority: authority!,
      client_id: clientId!,
      redirect_uri: redirectUri,
      response_type: "code",
      scope,
      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
      automaticSilentRenew: true,
    })
  : null;

/** Registers a callback invoked whenever oidc-client-ts loads a (renewed) user. Returns a cleanup function to deregister it. */
export const onTokenRenewed = (cb: (accessToken: string) => void) => {
  if (!userManager) return () => {};
  const handler = (user: { access_token: string }) => cb(user.access_token);
  userManager.events.addUserLoaded(handler);
  return () => userManager.events.removeUserLoaded(handler);
};
