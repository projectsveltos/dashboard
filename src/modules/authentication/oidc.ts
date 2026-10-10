import { User, UserManager, WebStorageStateStore } from "oidc-client-ts";

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

// Which token of the OIDC login is sent to the backend as the bearer token.
// The access token is the default. Set "id_token" when the provider issues access tokens that the
// Kubernetes API server, or the OIDC proxy in front of it, cannot verify, for instance encrypted (JWE)
// or opaque ones: both only accept signed JWTs, which the ID token is.
type OidcTokenType = "access_token" | "id_token";
const tokenTypeSetting =
  window.__CONFIG__?.oidcTokenType ||
  (import.meta.env.VITE_OIDC_TOKEN_TYPE as string | undefined);
export const oidcTokenType: OidcTokenType =
  tokenTypeSetting === "id_token" ? "id_token" : "access_token";

// Derive the route path from the redirect URI
export const oidcCallbackPath = new URL(redirectUri, window.location.origin)
  .pathname;

export const isOidcConfigured = Boolean(authority && clientId);

/**
 * Explains why the sign-in could not start. Starting it means fetching the provider's discovery
 * document, so the usual causes are a provider the browser cannot reach and a TLS certificate it does
 * not trust. Browsers report both only as a failed fetch.
 */
export const describeSigninError = (error: unknown): string => {
  const detail = error instanceof Error ? error.message : String(error);
  return `Could not start the sign-in with ${authority || "the OIDC provider"}: ${detail}. Check that the provider is reachable from this browser and that its TLS certificate is trusted.`;
};

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

/**
 * Returns the token of the user to send to the backend: the access token, or the ID token when the
 * dashboard is configured for it. Undefined when the provider did not return the configured one.
 */
export const getAuthToken = (
  user: Pick<User, "access_token" | "id_token">,
): string | undefined =>
  oidcTokenType === "id_token" ? user.id_token : user.access_token;

/** Registers a callback invoked whenever oidc-client-ts loads a (renewed) user. Returns a cleanup function to deregister it. */
export const onTokenRenewed = (cb: (token: string) => void) => {
  if (!userManager) return () => {};
  const handler = (user: User) => {
    const token = getAuthToken(user);
    if (token) cb(token);
  };
  userManager.events.addUserLoaded(handler);
  return () => userManager.events.removeUserLoaded(handler);
};
