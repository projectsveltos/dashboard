import { ClusterType } from "@/types/cluster.types";
import { getClusterInfoType } from "@/utils/GetClusterInfoType";
import { getItemsToSkip } from "@/utils/getItemsToSkip";

export const EVENT_RESOURCES_PAGE_SIZE = 10;

export type EventResourcesFilters = {
  kind: string;
  namespace: string;
  name: string;
};

export const noEventResourcesFilters: EventResourcesFilters = {
  kind: "",
  namespace: "",
  name: "",
};

type EventResourcesTarget = {
  eventName: string;
  clusterNamespace: string;
  clusterName: string;
  clusterType: ClusterType;
};

// buildEventResourcesParams returns the query parameters of ui-backend /eventResources: the page asked for
// and the filters which are set.
export const buildEventResourcesParams = (
  target: EventResourcesTarget,
  page: number,
  filters: EventResourcesFilters,
): Record<string, string | number> => {
  const params: Record<string, string | number> = {
    event_name: target.eventName,
    namespace: target.clusterNamespace,
    name: target.clusterName,
    type: getClusterInfoType(target.clusterType),
    skip: getItemsToSkip(page, EVENT_RESOURCES_PAGE_SIZE),
    limit: EVENT_RESOURCES_PAGE_SIZE,
  };

  const kind = filters.kind.trim();
  const namespace = filters.namespace.trim();
  const name = filters.name.trim();
  if (kind) {
    params.resource_kind = kind;
  }
  if (namespace) {
    params.resource_namespace = namespace;
  }
  if (name) {
    params.resource_name = name;
  }

  return params;
};

// hasEventResourcesFilters is true when at least one filter is set
export const hasEventResourcesFilters = (
  filters: EventResourcesFilters,
): boolean =>
  Boolean(
    filters.kind.trim() || filters.namespace.trim() || filters.name.trim(),
  );
