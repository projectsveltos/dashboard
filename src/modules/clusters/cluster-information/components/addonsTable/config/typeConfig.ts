// typeConfig.ts
import { helmColumns, profileColumns, resourceColumns } from "./Columns";
import { ProfileRow } from "../rows/ProfileRow";
import { HelmRow } from "../rows/HelmRow";
import { ResourceRow } from "../rows/ResourceRow";
import { AddonTypes } from "@/types/addon.types";

export const typeConfig = {
  [AddonTypes.HELM]: {
    columns: helmColumns,
    RowComponent: HelmRow,
    searchConfig: [
      {
        key: "release_namespace",
        placeholder: "Search by Resource Namespace",
      },
      { key: "release_name", placeholder: "Search by Release name" },
    ],
  },
  [AddonTypes.RESOURCE]: {
    columns: resourceColumns,
    RowComponent: ResourceRow,
    searchConfig: [
      {
        key: "resource_namespace",
        placeholder: "Search by Resource Namespace",
      },
      { key: "resource_name", placeholder: "Search by Resource Name" },
      { key: "resource_kind", placeholder: "Search by Resource Kind" },
    ],
  },
  [AddonTypes.PROFILE]: {
    columns: profileColumns,
    RowComponent: ProfileRow,
    searchConfig: [
      {
        key: "profile_name",
        placeholder: "Search by Profile Name",
      },
      {
        key: "profile_kind",
        placeholder: "Search by Profile Kind",
      },
    ],
  },
};
