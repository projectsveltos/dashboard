import { Logo } from "@/lib/components/assets/logo/logo";
import { ModeToggle } from "@/lib/components/ui/inputs/mode-toggle";
import { AlertCircle } from "lucide-react";
import useAuth from "@/modules/authentication/hooks/useAuth";
import { activeAuthMethod } from "@/modules/authentication/methods";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Authentication = () => {
  const { authenticate } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("error") === "unauthorized") {
      setErrorMessage("Unauthorized, please login again");
    }
  }, [location]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-zinc-950 font-sans antialiased">
      <div className="w-full max-w-[400px] px-6">
        <div className="flex flex-col items-center">
          {/* Brand Logo - Simplified */}
          <div className="mb-10 flex h-24 w-24 items-center justify-center">
            <Logo full className="h-full w-full" />
          </div>

          {/* Login Content */}
          <div className="w-full space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-[26px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Sign in to Sveltos
              </h1>
              <p className="text-sm text-zinc-500">
                Manage your Kubernetes clusters with ease.
              </p>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-3 rounded-xl bg-red-50 p-3 text-left border border-red-100 dark:bg-red-500/5 dark:border-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-xs font-medium text-red-600 dark:text-red-400">
                  {errorMessage}
                </p>
              </div>
            )}

            <activeAuthMethod.component onAuthenticate={authenticate} />
          </div>

          {/* Footer */}
          <div className="mt-16 flex justify-center">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};
