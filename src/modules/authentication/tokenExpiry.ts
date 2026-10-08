/**
 * Returns the exp claim (seconds since the epoch) of a JWT, or undefined when the token is not a JWT
 * or has no exp claim. The token is only decoded, never verified: the API server does that.
 */
export const getTokenExpiry = (token: string): number | undefined => {
  const segments = token.split(".");
  if (segments.length !== 3) return undefined;

  try {
    const base64 = segments[1].replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const claims = JSON.parse(new TextDecoder().decode(bytes));
    return typeof claims.exp === "number" ? claims.exp : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Whether the token has expired. A token without a readable exp claim is not reported as expired,
 * as there is no way to tell.
 */
export const isTokenExpired = (token: string, nowMs = Date.now()): boolean => {
  const expiry = getTokenExpiry(token);
  return expiry !== undefined && expiry * 1000 <= nowMs;
};
