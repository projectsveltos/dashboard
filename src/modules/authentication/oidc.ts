import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const authority = import.meta.env.VITE_OIDC_ISSUER as string | undefined;
const clientId = import.meta.env.VITE_OIDC_CLIENT_ID as string | undefined;
const redirectUri =
  (import.meta.env.VITE_OIDC_REDIRECT_URI as string | undefined) ??
  `${window.location.origin}/oidc-callback`;

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
      scope: "openid profile email offline_access",
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
