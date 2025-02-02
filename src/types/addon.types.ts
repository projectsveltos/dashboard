import { AddonTableTypes } from "@/types/addonTable.types";

export enum AddonTypes {
  HELM = "Helm Charts",
  RESOURCE = "Resources",
  PROFILE = "Cluster profiles",
}
export type AddonTableData = {
  helmReleases?: AddonData[];
  totalHelmReleases?: number;
  resources?: AddonData[];
  totalResources?: number;
  profiles?: AddonData[];
};
export const addonTypes: AddonTypes[] = Object.values(AddonTypes);
export type AddonData = {
  failureMessage?: string;
  icon?: string;
  lastAppliedTime?: string;
  status?: string;
  profileName?: string;
  profileType?: string;
  profileNames?: string[];
  repoURL?: string;
  helmReleases?: AddonTableTypes[];
  totalHelmReleases?: number;
  resources?: AddonTableTypes[];
  totalResources?: number;
  profiles?: AddonTableTypes[];
  totalProfiles?: number;
};
