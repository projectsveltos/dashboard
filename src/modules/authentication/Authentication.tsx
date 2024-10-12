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
        <Alert variant="destructive" className={"my-4"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unauthorized</AlertTitle>
          <AlertDescription>
            Failed to login. Please try again.
          </AlertDescription>
        </Alert>
      )}
      <Card className=" w-[500px]">
        <CardHeader>
          <Logo full className={"h-36 w-36 mx-auto"} />

          <CardTitle className="text-xl">Login</CardTitle>

          <CardDescription>
            Use your authentication token to log in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="token">Authorization Token</Label>
              <Input
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Need help obtaining your token?
            <a href="#" className="underline mx-1">
              Learn more
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
