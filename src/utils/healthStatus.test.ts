import { describe, expect, it } from "vitest";

import { healthEmptyStateKey, isUnhealthy } from "@/utils/healthStatus";

describe("isUnhealthy", () => {
  it("is true for the statuses a resource is listed with", () => {
    expect(isUnhealthy("Progressing")).toBe(true);
    expect(isUnhealthy("Suspended")).toBe(true);
    expect(isUnhealthy("Degraded")).toBe(true);
  });

  it("is false for Healthy, NoData and an unknown status", () => {
    expect(isUnhealthy("Healthy")).toBe(false);
    expect(isUnhealthy("NoData")).toBe(false);
    expect(isUnhealthy(undefined)).toBe(false);
  });
});

describe("healthEmptyStateKey", () => {
  it("never reads an unmonitored cluster or a missing report as healthy", () => {
    expect(healthEmptyStateKey("NotEnabled", false)).toBe(
      "common.health_not_enabled",
    );
    expect(healthEmptyStateKey("NoData", false)).toBe(
      "common.health_no_data_yet",
    );
    // the filters do not change what the cluster state says
    expect(healthEmptyStateKey("NotEnabled", true)).toBe(
      "common.health_not_enabled",
    );
  });

  it("says everything is healthy only for a healthy cluster with no filters", () => {
    expect(healthEmptyStateKey("Healthy", false)).toBe(
      "common.health_all_healthy",
    );
  });

  it("says nothing matches when filters are set, or when the cluster is not healthy", () => {
    expect(healthEmptyStateKey("Healthy", true)).toBe("common.health_no_match");
    expect(healthEmptyStateKey("Degraded", false)).toBe(
      "common.health_no_match",
    );
    expect(healthEmptyStateKey("Degraded", true)).toBe(
      "common.health_no_match",
    );
  });

  it("does not claim the cluster is healthy when there is no answer", () => {
    expect(healthEmptyStateKey(undefined, false)).toBe(
      "common.health_no_data_yet",
    );
  });
});
