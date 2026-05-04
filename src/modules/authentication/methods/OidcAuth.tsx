import { Button } from "@/lib/components/ui/inputs/button";
import { userManager } from "@/modules/authentication/oidc";
import { ShieldCheck } from "lucide-react";

export const OidcAuth = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => userManager?.signinRedirect()}
    >
      <ShieldCheck className="w-4 h-4 mr-2 opacity-50" />
      Start OIDC Flow
    </Button>
  );
};
