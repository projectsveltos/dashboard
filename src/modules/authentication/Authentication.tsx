import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/assets/logo/logo";
import useAuth from "@/modules/authentication/hooks/useAuth";
import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className={"mx-auto my-auto"}>
      {errorMessage && (
        <Alert
          variant="destructive"
          className={
            "bg-destructive-foreground dark:bg-destructive/20 dark:text-zinc-300  my-4"
          }
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unauthorized</AlertTitle>
          <AlertDescription>
            Failed to login. Please try again.
          </AlertDescription>
        </Alert>
      )}
      <Card className="bg-primary/5 w-[500px]">
        <CardHeader>
          <Logo full className={"h-36 w-36 mx-auto"} />

          <CardTitle className="text-xl">Login</CardTitle>

          <CardDescription>
            Consult the documentation for token generation instructions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="token" className={"flex gap-2 items-center"}>
                Authorization Token
              </Label>
              <Input
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center gap-4">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <ModeToggle />
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Need help obtaining your token?
            <a
              href="https://projectsveltos.github.io/sveltos/getting_started/install/dashboard/#authentication"
              className="underline mx-1"
            >
              Learn more
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
