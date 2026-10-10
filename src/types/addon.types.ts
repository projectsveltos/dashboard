import { AddonTableTypes } from "@/types/addonTable.types";

export enum AddonTypes {
  HELM = "Helm Charts",
  RESOURCE = "Resources",
  PROFILE = "Profiles",
}
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
