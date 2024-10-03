export enum AddonTableTypes {
  TIME = "lastAppliedTime",
  PROFILE = "profileName/profileNames",
  NAME = "releaseName/name",
  NAMESPACE = "namespace",
  VERSION = "version",
  GROUP = "group/kind",
  STATUS = "status",
  ACTION = "action",
  ICON = "icon",
  FAILURE_MESSAGE = "failureMessage",
}
export interface AddonColumn {
  label: string;
  className: string;
  isCheckbox?: boolean;
  isSrOnly?: boolean;
  keys: string;
}
