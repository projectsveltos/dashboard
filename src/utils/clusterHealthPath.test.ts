import { describe, expect, it } from "vitest";

import { buildClusterHealthPath } from "@/utils/clusterHealthPath";

describe("buildClusterHealthPath", () => {
  it("opens the unhealthy resources of the cluster", () => {
    expect(buildClusterHealthPath("sveltos", "default", "mgmt")).toBe(
      "/sveltos/cluster/sveltos/default/mgmt?addons_tab=unhealthy",
    );
  });

  it("sets the profile filter the user can then edit", () => {
    const path = buildClusterHealthPath("sveltos", "default", "mgmt", {
      kind: "ClusterProfile",
      name: "deploy-kyverno",
    });

    const [route, query] = path.split("?");
    expect(route).toBe("/sveltos/cluster/sveltos/default/mgmt");

    const params = new URLSearchParams(query);
    expect(params.get("addons_tab")).toBe("unhealthy");
    expect(params.get("profile_kind")).toBe("ClusterProfile");
    expect(params.get("profile_name")).toBe("deploy-kyverno");
  });
});
