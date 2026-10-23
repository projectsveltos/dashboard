import {
  MatchingCluster,
  RolloutState,
  RolloutSummary,
} from "@/types/profile.types";

type RolloutStateStyle = {
  // i18n key of the state name
  labelKey: string;
  // i18n key of the explanation shown in the tooltip
  tooltipKey: string;
  // Badge variant
  variant: "success" | "warning" | "secondary" | "outline";
};

export const rolloutStateStyle: Record<RolloutState, RolloutStateStyle> = {
  updated: {
    labelKey: "common.rollout_updated",
    tooltipKey: "common.rollout_updated_tooltip",
    variant: "success",
  },
  updating: {
    labelKey: "common.rollout_updating",
    tooltipKey: "common.rollout_updating_tooltip",
    variant: "warning",
  },
  waiting: {
    labelKey: "common.rollout_waiting",
    tooltipKey: "common.rollout_waiting_tooltip",
    variant: "secondary",
  },
  paused: {
    labelKey: "common.paused",
    tooltipKey: "common.rollout_paused_tooltip",
    variant: "outline",
  },
  notReady: {
    labelKey: "common.rollout_not_ready",
    tooltipKey: "common.rollout_not_ready_tooltip",
    variant: "outline",
  },
};

// The order the states are listed in
export const rolloutStates: RolloutState[] = [
  "updated",
  "updating",
  "waiting",
  "paused",
  "notReady",
];

export type RolloutFilter = RolloutState | "all";

// The Rollout column is only useful when at least one cluster has something to report
export function hasRolloutInfo(clusters: MatchingCluster[]): boolean {
  return clusters.some((cluster) => cluster.rolloutState !== undefined);
}

export function countByRolloutState(
  clusters: MatchingCluster[],
): Record<RolloutState, number> {
  const counts: Record<RolloutState, number> = {
    updated: 0,
    updating: 0,
    waiting: 0,
    paused: 0,
    notReady: 0,
  };

  clusters.forEach((cluster) => {
    if (cluster.rolloutState !== undefined) {
      counts[cluster.rolloutState] += 1;
    }
  });

  return counts;
}

export function filterByRolloutState(
  clusters: MatchingCluster[],
  filter: RolloutFilter,
): MatchingCluster[] {
  if (filter === "all") {
    return clusters;
  }

  return clusters.filter((cluster) => cluster.rolloutState === filter);
}

// Paused clusters are skipped by the rollout, they are not part of the progress
export function rolloutProgress(rollout: RolloutSummary): {
  updated: number;
  total: number;
  percent: number;
} {
  const total =
    rollout.updated + rollout.updating + rollout.waiting + rollout.notReady;
  const percent = total === 0 ? 0 : Math.round((rollout.updated / total) * 100);

  return { updated: rollout.updated, total, percent };
}
