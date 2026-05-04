import { Button } from "@/lib/components/ui/inputs/button";
import { Input } from "@/lib/components/ui/inputs/input";
import { Label } from "@/lib/components/ui/inputs/label";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { AuthMethodProps } from "./index";

export const ManualTokenAuth = ({ onAuthenticate }: AuthMethodProps) => {
  const [token, setToken] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onAuthenticate(token);
  };

  return (
    <>
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
    </>
  );
};
