export enum AddonTypes {
  HELM = "Helm Charts",
  RESOURCE = "Resources",
  PROFILE = "Cluster profiles",
}

export const addonTypes: AddonTypes[] = Object.values(AddonTypes);
