import { ComponentType } from "react";
import { ManualTokenAuth } from "./ManualTokenAuth";
import { OidcAuth } from "./OidcAuth";
import { isOidcConfigured } from "@/modules/authentication/oidc";

export interface AuthMethodProps {
  onAuthenticate: (token: string) => void;
}

interface AuthMethod {
  id: string;
  component: ComponentType<AuthMethodProps>;
  enabled: boolean;
}

const methodsByPriority: AuthMethod[] = [
  { id: "oidc", component: OidcAuth, enabled: isOidcConfigured },
  { id: "manual", component: ManualTokenAuth, enabled: true },
];

export const activeAuthMethod =
  methodsByPriority.find((m) => m.enabled) ?? methodsByPriority[1];
