import { ADDONS_TAB_PARAM, addonTabSlug } from "@/utils/addonTabs";
import { AddonTypes } from "@/types/addon.types";

type ProfileFilter = {
  kind: string;
  name: string;
};

// buildClusterHealthPath returns the path of the cluster page opened on the unhealthy resources, optionally
// filtered by profile. clusterTab is the cluster type segment of the cluster page route.
export const buildClusterHealthPath = (
  clusterTab: string | undefined,
  namespace: string,
  name: string,
  profile?: ProfileFilter,
): string => {
  const params = new URLSearchParams();
  params.set(ADDONS_TAB_PARAM, addonTabSlug(AddonTypes.UNHEALTHY));
  if (profile) {
    params.set("profile_kind", profile.kind);
    params.set("profile_name", profile.name);
  }
  return `/sveltos/cluster/${clusterTab}/${namespace}/${name}?${params.toString()}`;
};
