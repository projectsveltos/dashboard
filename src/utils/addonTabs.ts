import { AddonTypes } from "@/types/addon.types";

// The addons tab of the cluster page is kept in the URL, so other pages (the cluster card, a profile
// health badge) can link to it.
export const ADDONS_TAB_PARAM = "addons_tab";

const slugs: Record<AddonTypes, string> = {
  [AddonTypes.HELM]: "helm",
  [AddonTypes.RESOURCE]: "resources",
  [AddonTypes.PROFILE]: "profiles",
  [AddonTypes.UNHEALTHY]: "unhealthy",
};

export const addonTabSlug = (tab: AddonTypes): string => slugs[tab];

// addonTabFromParam returns the tab named by the URL parameter. Helm charts is the default.
export const addonTabFromParam = (value: string | null): AddonTypes => {
  const found = (Object.keys(slugs) as AddonTypes[]).find(
    (tab) => slugs[tab] === value,
  );
  return found ?? AddonTypes.HELM;
};
