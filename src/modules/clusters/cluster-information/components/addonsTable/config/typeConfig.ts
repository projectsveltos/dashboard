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
        placeholder: "common.search_release_namespace",
      },
      { key: "release_name", placeholder: "common.search_release_name" },
    ],
  },
  [AddonTypes.RESOURCE]: {
    columns: resourceColumns,
    RowComponent: ResourceRow,
    searchConfig: [
      {
        key: "resource_namespace",
        placeholder: "common.search_resource_namespace",
      },
      { key: "resource_name", placeholder: "common.search_resource_name" },
      { key: "resource_kind", placeholder: "common.search_resource_kind" },
    ],
  },
  [AddonTypes.PROFILE]: {
    columns: profileColumns,
    RowComponent: ProfileRow,
    searchConfig: [
      {
        key: "profile_name",
        placeholder: "common.search_profile_name",
      },
      {
        key: "profile_kind",
        placeholder: "common.search_profile_kind",
      },
    ],
  },
};
