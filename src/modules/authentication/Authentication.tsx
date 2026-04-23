import { Button } from "@/lib/components/ui/inputs/button";

import { Input } from "@/lib/components/ui/inputs/input";
import { Label } from "@/lib/components/ui/inputs/label";
import { Logo } from "@/lib/components/assets/logo/logo";
import useAuth from "@/modules/authentication/hooks/useAuth";
import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { AlertCircle, ArrowRight } from "lucide-react";
import { ModeToggle } from "@/lib/components/ui/inputs/mode-toggle";

export const Authentication = () => {
  const { authenticate } = useAuth();
  const [token, setToken] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    authenticate(token);
  };
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

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="space-y-1.5">
                <Label
                  htmlFor="token"
                  className="ml-0.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500"
                >
                  Authorization Token
                </Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Paste your token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                  className="h-11 rounded-xl border-zinc-200 bg-zinc-50/50 px-4 text-sm transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold transition-all hover:opacity-90 active:scale-[0.98] shadow-none border-none"
              >
                Sign In
                <ArrowRight className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </form>

            <div className="pt-4">
              <a
                href="https://projectsveltos.github.io/sveltos/main/getting_started/optional/dashboard/#authentication"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-primary hover:underline transition-all"
              >
                Need help obtaining your token?
              </a>
            </div>
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
