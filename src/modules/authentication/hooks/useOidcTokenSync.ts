import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  isOidcConfigured,
  oidcTokenType,
  onTokenRenewed,
  userManager,
} from "@/modules/authentication/oidc";
import { isTokenExpired } from "@/modules/authentication/tokenExpiry";

export const useOidcTokenSync = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOidcConfigured) return;

    return onTokenRenewed((token) => {
      // When the provider returns no ID token on a refresh, oidc-client-ts keeps the previous one.
      // If that one has expired, storing it would make every request fail: sign in again instead.
      if (oidcTokenType === "id_token" && isTokenExpired(token)) {
        localStorage.removeItem("authToken");
        void userManager?.removeUser();
        navigate("/login?error=session_expired");
        return;
      }

      localStorage.setItem("authToken", token);
    });
  }, [navigate]);
};
