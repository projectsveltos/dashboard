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
export const getSearchParams = (
  type: AddonTypes,
  searchParams: URLSearchParams,
) => {
  const config = typeConfig[type]?.searchConfig || [];
  const params: Record<string, string> = {};
  config.forEach(({ key }) => {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
  });
  return params;
};
