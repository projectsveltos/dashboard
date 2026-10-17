import { describe, expect, it } from "vitest";

import {
  buildEventResourcesParams,
  EVENT_RESOURCES_PAGE_SIZE,
  hasEventResourcesFilters,
  noEventResourcesFilters,
} from "@/utils/eventResources";

describe("buildEventResourcesParams", () => {
  const target = {
    eventName: "service-network-policy",
    clusterNamespace: "default",
    clusterName: "prod",
    clusterType: "SveltosCluster" as const,
  };

  it("asks for the first page of a cluster without filters", () => {
    expect(
      buildEventResourcesParams(target, 1, noEventResourcesFilters),
    ).toEqual({
      event_name: "service-network-policy",
      namespace: "default",
      name: "prod",
      type: "sveltos",
      skip: 0,
      limit: EVENT_RESOURCES_PAGE_SIZE,
    });
  });

  it("skips the pages before the one asked for", () => {
    const params = buildEventResourcesParams(
      { ...target, clusterType: "ClusterAPI" },
      3,
      noEventResourcesFilters,
    );

    expect(params.type).toBe("capi");
    expect(params.skip).toBe(2 * EVENT_RESOURCES_PAGE_SIZE);
  });

  it("sends only the filters which are set, without surrounding spaces", () => {
    const params = buildEventResourcesParams(target, 1, {
      kind: " Service ",
      namespace: "  ",
      name: "front",
    });

    expect(params.resource_kind).toBe("Service");
    expect(params.resource_name).toBe("front");
    expect(params).not.toHaveProperty("resource_namespace");
  });
});

describe("hasEventResourcesFilters", () => {
  it("is false when no filter is set, or only spaces are", () => {
    expect(hasEventResourcesFilters(noEventResourcesFilters)).toBe(false);
    expect(
      hasEventResourcesFilters({ kind: " ", namespace: "", name: "" }),
    ).toBe(false);
  });

  it("is true when a filter is set", () => {
    expect(
      hasEventResourcesFilters({ kind: "", namespace: "", name: "web" }),
    ).toBe(true);
  });
});
