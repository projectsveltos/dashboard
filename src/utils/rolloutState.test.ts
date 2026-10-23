import { describe, expect, it } from "vitest";

import { MatchingCluster, RolloutState } from "@/types/profile.types";
import {
  countByRolloutState,
  filterByRolloutState,
  hasRolloutInfo,
  rolloutProgress,
} from "@/utils/rolloutState";

function cluster(name: string, rolloutState?: RolloutState): MatchingCluster {
  return {
    cluster: {
      kind: "SveltosCluster",
      namespace: "ns",
      name,
      apiVersion: "v1",
    },
    clusterFeatureSummaries: [],
    rolloutState,
  };
}

const clusters = [
  cluster("a", "updated"),
  cluster("b", "updated"),
  cluster("c", "updating"),
  cluster("d", "waiting"),
  cluster("e", "paused"),
];

describe("hasRolloutInfo", () => {
  it("is true when at least one cluster has a rollout state", () => {
    expect(hasRolloutInfo(clusters)).toBe(true);
    expect(hasRolloutInfo([cluster("a"), cluster("b", "paused")])).toBe(true);
  });

  it("is false when no cluster has a rollout state, or there are no clusters", () => {
    expect(hasRolloutInfo([cluster("a"), cluster("b")])).toBe(false);
    expect(hasRolloutInfo([])).toBe(false);
  });
});

describe("countByRolloutState", () => {
  it("counts the clusters of each state", () => {
    expect(countByRolloutState(clusters)).toEqual({
      updated: 2,
      updating: 1,
      waiting: 1,
      paused: 1,
      notReady: 0,
    });
  });

  it("ignores clusters without a rollout state", () => {
    expect(countByRolloutState([cluster("a")])).toEqual({
      updated: 0,
      updating: 0,
      waiting: 0,
      paused: 0,
      notReady: 0,
    });
  });
});

describe("filterByRolloutState", () => {
  it("returns every cluster for all", () => {
    expect(filterByRolloutState(clusters, "all")).toHaveLength(5);
  });

  it("returns only the clusters in the given state", () => {
    const result = filterByRolloutState(clusters, "updated");

    expect(result.map((c) => c.cluster.name)).toEqual(["a", "b"]);
  });

  it("returns nothing when no cluster is in the given state", () => {
    expect(filterByRolloutState(clusters, "notReady")).toEqual([]);
  });
});

describe("rolloutProgress", () => {
  it("does not count paused clusters", () => {
    expect(
      rolloutProgress({
        maxUpdate: 1,
        updated: 3,
        updating: 1,
        waiting: 4,
        paused: 2,
        notReady: 2,
      }),
    ).toEqual({ updated: 3, total: 10, percent: 30 });
  });

  it("is 0% when every cluster is paused", () => {
    expect(
      rolloutProgress({
        maxUpdate: 0,
        updated: 0,
        updating: 0,
        waiting: 0,
        paused: 2,
        notReady: 0,
      }),
    ).toEqual({ updated: 0, total: 0, percent: 0 });
  });
});
