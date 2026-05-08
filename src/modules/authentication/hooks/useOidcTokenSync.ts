import { useEffect } from "react";
import {
  isOidcConfigured,
  onTokenRenewed,
} from "@/modules/authentication/oidc";

export const useOidcTokenSync = () => {
  useEffect(() => {
    if (!isOidcConfigured) return;

    return onTokenRenewed((accessToken) => {
      localStorage.setItem("authToken", accessToken);
    });
  }, []);
};
