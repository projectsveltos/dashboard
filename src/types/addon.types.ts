export enum AddonTypes {
  HELM = "Helm Charts",
  RESOURCE = "Resources",
  PROFILE = "Cluster profiles",
}

export const addonTypes: AddonTypes[] = Object.values(AddonTypes);

export enum AddonStatus {
  PROVISIONED = "Provisioned",
  PROVISIONING = "Provisioning",
  FAILED = "Failed",
  FailedNonRETRIABLE = "FailedNonRetriable",
  REMOVING = "Removing",
  REMOVED = "Removed",
}
