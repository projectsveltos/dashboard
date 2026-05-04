import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from "@/modules/authentication/oidc";
import useAuth from "@/modules/authentication/hooks/useAuth";

export const OidcCallback = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current || !userManager) return;
    handled.current = true;

    userManager
      .signinRedirectCallback()
      .then((user) => {
        authenticate(user.access_token);
      })
      .catch(() => {
        navigate("/login?error=unauthorized");
      });
  }, [authenticate, navigate]);

  return null;
};
