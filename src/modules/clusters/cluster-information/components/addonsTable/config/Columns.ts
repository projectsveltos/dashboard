import { AddonTableTypes } from "@/types/addonTable.types";
interface Column {
  label: string;
  className: string;
  keys: string;
  colSpan?: number;
  isCheckbox?: boolean;
  isSrOnly?: boolean;
}
export const profileColumns: Column[] = [
  {
    label: "common.failed_only",
    className: "",
    isCheckbox: true,
    keys: AddonTableTypes.ICON,
  },
  { label: "common.feature", className: "", keys: "featureID" },
  {
    label: "common.profile",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.PROFILE,
  },
  {
    label: "common.status",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.STATUS,
  },
  {
    label: "common.error",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.FAILURE_MESSAGE,
  },
  {
    label: "",
    className: "",
    keys: AddonTableTypes.ACTION,
  },
];

export const helmColumns: Column[] = [
  { label: "", className: "", keys: AddonTableTypes.ICON },
  {
    label: "common.namespace",
    className: "py-4 break-words whitespace-normal",
    keys: AddonTableTypes.NAMESPACE,
  },
  { label: "common.name", className: "", keys: AddonTableTypes.NAME },
  {
    label: "common.version",
    className: "hidden sm:table-cell",
    keys: "chartVersion/version",
  },
  {
    label: "common.last_applied",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.TIME,
  },
  {
    label: "common.profile",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.PROFILE,
  },
  {
    label: "",
    className: "",
    keys: AddonTableTypes.ACTION,
  },
];

export const resourceColumns: Column[] = [
  { label: "", className: "", keys: AddonTableTypes.ICON },
  { label: "common.group", className: "", keys: AddonTableTypes.GROUP },
  {
    label: "common.kind",
    className: "hidden sm:table-cell",
    keys: AddonTableTypes.KIND,
  },
  {
    label: "common.namespace",
    className: "py-4 break-words whitespace-normal",
    keys: AddonTableTypes.NAMESPACE,
  },
  { label: "common.name", className: "", keys: "name" },
  {
    label: "common.last_applied",
    className: "",
    keys: AddonTableTypes.TIME,
  },
  {
    label: "common.profile",
    className: "",
    keys: AddonTableTypes.PROFILE,
  },
  {
    label: "",
    className: "",
    keys: AddonTableTypes.ACTION,
  },
];
