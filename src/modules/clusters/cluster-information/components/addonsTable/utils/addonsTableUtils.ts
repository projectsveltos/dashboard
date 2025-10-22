import { AddonTableData, AddonTypes } from "@/types/addon.types";
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
  type: AddonTypes,
  searchParams: URLSearchParams,
): Record<string, string> => {
  const typeConfigEntry = typeConfig[type];
  const config = hasSearchConfig(typeConfigEntry)
    ? typeConfigEntry.searchConfig
    : [];
  const params: Record<string, string> = {};
  config.forEach((item: { key: string }) => {
    const value = searchParams.get(item.key);
    if (value) {
      params[item.key] = value;
    }
  });
  return params;
};
