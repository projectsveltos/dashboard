import {
  AddonTableData,
  AddonTypes,
  TableAddonTypes,
} from "@/types/addon.types";
import { healthSearchConfig } from "@/modules/health/healthSearchConfig";
import { pickSearchParams } from "@/utils/pickSearchParams";
import { typeConfig } from "@/modules/clusters/cluster-information/components/addonsTable/config/typeConfig";

export const getRowsAndTotal = (data: AddonTableData, type: AddonTypes) => {
  switch (type) {
    case AddonTypes.HELM:
      return {
        rows: data.helmReleases || [],
        total: data.totalHelmReleases || 0,
      };
    case AddonTypes.RESOURCE:
      return { rows: data.resources || [], total: data.totalResources || 0 };
    case AddonTypes.PROFILE:
      return { rows: data.profiles || [], total: data.totalResources || 0 };
    default:
      return { rows: [], total: 0 };
  }
};

export function hasSearchConfig(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is { searchConfig: { key: string; placeholder: string }[] } {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "searchConfig" in obj &&
    Array.isArray((obj as { searchConfig: unknown }).searchConfig)
  );
}
export const getSearchParams = (
  type: TableAddonTypes,
  searchParams: URLSearchParams,
): Record<string, string> => {
  const typeConfigEntry = typeConfig[type];
  const config = hasSearchConfig(typeConfigEntry)
    ? typeConfigEntry.searchConfig
    : [];
  return pickSearchParams(config, searchParams);
};

// getSearchConfig returns the filters of any addons tab
export const getSearchConfig = (
  tab: AddonTypes,
): { key: string; placeholder: string }[] => {
  if (tab === AddonTypes.UNHEALTHY) {
    return healthSearchConfig;
  }
  const typeConfigEntry = typeConfig[tab];
  return hasSearchConfig(typeConfigEntry) ? typeConfigEntry.searchConfig : [];
};
