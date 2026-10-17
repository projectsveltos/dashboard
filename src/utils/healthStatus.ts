import { ClusterHealthState, HealthStatus } from "@/types/health.types";

type HealthStatusStyle = {
  // i18n key of the status name
  labelKey: string;
  // text colour, for icons
  textClass: string;
  // background colour, for badges
  badgeClass: string;
};

export const healthStatusStyle: Record<HealthStatus, HealthStatusStyle> = {
  Healthy: {
    labelKey: "common.health_healthy",
    textClass: "text-green-500/70",
    badgeClass: "bg-green-500",
  },
  Progressing: {
    labelKey: "common.health_progressing",
    textClass: "text-amber-500",
    badgeClass: "bg-amber-500",
  },
  Suspended: {
    labelKey: "common.health_suspended",
    textClass: "text-amber-400",
    badgeClass: "bg-amber-400",
  },
  Degraded: {
    labelKey: "common.health_degraded",
    textClass: "text-red-500",
    badgeClass: "bg-red-500",
  },
  NoData: {
    labelKey: "common.health_no_data",
    textClass: "text-slate-400",
    badgeClass: "bg-gray-500",
  },
};

// isUnhealthy is true for the statuses a resource can be listed with: anything but Healthy and NoData.
export const isUnhealthy = (status: HealthStatus | undefined): boolean =>
  status === "Progressing" || status === "Suspended" || status === "Degraded";

// healthEmptyStateKey returns the i18n key of what to tell when the list of unhealthy resources is empty.
// The text depends on the state of the cluster, so an empty table is never read as "all healthy" when
// nothing is monitored or no report arrived yet.
export const healthEmptyStateKey = (
  state: ClusterHealthState | undefined,
  hasFilters: boolean,
): string => {
  if (state === "NotEnabled") {
    return "common.health_not_enabled";
  }
  // No answer (yet, or it failed) is not "healthy" either
  if (state === undefined || state === "NoData") {
    return "common.health_no_data_yet";
  }
  if (hasFilters || isUnhealthy(state as HealthStatus)) {
    return "common.health_no_match";
  }
  return "common.health_all_healthy";
};
