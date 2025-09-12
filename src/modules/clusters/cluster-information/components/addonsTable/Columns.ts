import { AddonTableTypes } from "@/types/addonTable.types";

export const profileColumns = [
  {
    label: "Failed only",
    className: "",
    isCheckbox: true,
    keys: AddonTableTypes.ICON,
  },
  { label: "Feature", className: "", keys: "featureID" },
  {
    label: "Profile",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.PROFILE,
  },
  {
    label: "Status",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.STATUS,
  },
  {
    label: "Error",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.FAILURE_MESSAGE,
  },
  {
    label: "",
    className: "",
    keys: AddonTableTypes.ACTION,
  },
];

export const helmColumns = [
  { label: "", className: "", keys: AddonTableTypes.ICON },
  {
    label: "Namespace",
    className: "py-4 break-words whitespace-normal",
    keys: AddonTableTypes.NAMESPACE,
  },
  { label: "Name", className: "", keys: AddonTableTypes.NAME },
  {
    label: "Version",
    className: "hidden sm:table-cell",
    keys: "chartVersion/version",
  },
  {
    label: "Last Applied",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.TIME,
  },
  {
    label: "Profile",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.PROFILE,
  },
  {
    label: "",
    className: "",
    keys: AddonTableTypes.ACTION,
  },
];

export const resourceColumns = [
  { label: "", className: "", keys: AddonTableTypes.ICON },
  { label: "Group", className: "", keys: AddonTableTypes.GROUP },
  {
    label: "Kind",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.KIND,
  },
  {
    label: "Namespace",
    className: "py-4 break-words whitespace-normal",
    keys: AddonTableTypes.NAMESPACE,
  },
  { label: "Name", className: "", keys: "name" },
  {
    label: "Last Applied",
    className: "",
    keys: AddonTableTypes.TIME,
  },
  {
    label: "Profile",
    className: "",
    keys: AddonTableTypes.PROFILE,
  },
  {
    label: "",
    className: "",
    keys: AddonTableTypes.ACTION,
  },
];
