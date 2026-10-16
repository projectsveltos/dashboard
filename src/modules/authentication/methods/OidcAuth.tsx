import { useState } from "react";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/lib/components/ui/inputs/button";
import {
  describeSigninError,
  userManager,
} from "@/modules/authentication/oidc";

export const OidcAuth = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const startSignin = async () => {
    setErrorMessage("");
    try {
      await userManager?.signinRedirect();
    } catch (error) {
      console.error("Could not start the OIDC sign-in", error);
      setErrorMessage(describeSigninError(error));
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={startSignin}
      >
        <ShieldCheck className="w-4 h-4 mr-2 opacity-50" />
        Start OIDC Flow
      </Button>
      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl bg-red-50 p-3 text-left border border-red-100 dark:bg-red-500/5 dark:border-red-500/10"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="text-xs font-medium text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};
