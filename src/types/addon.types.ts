import { AddonTableTypes } from "@/types/addonTable.types";
import { HealthStatus } from "@/types/health.types";

export enum AddonTypes {
  HELM = "Helm Charts",
  RESOURCE = "Resources",
  PROFILE = "Profiles",
  UNHEALTHY = "Unhealthy resources",
}
// The tabs listing addons deployed on the cluster. The unhealthy resources tab loads its own data.
export type TableAddonTypes = Exclude<AddonTypes, AddonTypes.UNHEALTHY>;
export type AddonTableData = {
  helmReleases?: AddonData[];
  totalHelmReleases?: number;
  resources?: AddonData[];
  totalResources?: number;
  profiles?: AddonData[];
};
export const addonTypes: AddonTypes[] = Object.values(AddonTypes);
export type DriftedResource = {
  group?: string;
  kind: string;
  namespace?: string;
  name: string;
  helmReleaseNamespace?: string;
  helmReleaseName?: string;
  detectedTime: string;
};
export type DriftHistory = {
  lastDetectedTime: string;
  resources?: DriftedResource[];
  truncated?: boolean;
};
export type AddonData = {
  failureMessage?: string;
  // Health of the profile on the cluster. Only set on rows of profiles with health monitoring enabled.
  healthStatus?: HealthStatus;
  featureID?: string;
  driftHistory?: DriftHistory;
  icon?: string;
  lastAppliedTime?: string;
  status?: string;
  profileName?: string;
  profileType?: string;
  profileNames?: string[];
  repoURL?: string;
  latestVersion?: string;
  latestPatchVersion?: string;
  lastCheckedTime?: string;
  helmReleases?: AddonTableTypes[];
  totalHelmReleases?: number;
  resources?: AddonTableTypes[];
  totalResources?: number;
  profiles?: AddonTableTypes[];
  totalProfiles?: number;
};
