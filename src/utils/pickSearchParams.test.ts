import { describe, expect, it } from "vitest";

import { omitSearchParams, pickSearchParams } from "@/utils/pickSearchParams";

describe("pickSearchParams", () => {
  const config = [{ key: "profile_name" }, { key: "resource_kind" }];

  it("keeps only the parameters of the config which are set", () => {
    const params = new URLSearchParams(
      "profile_name=p&resource_kind=&other=x&addons_tab=unhealthy",
    );
    expect(pickSearchParams(config, params)).toEqual({ profile_name: "p" });
  });

  it("returns nothing when no parameter is set", () => {
    expect(pickSearchParams(config, new URLSearchParams())).toEqual({});
  });
});

describe("omitSearchParams", () => {
  it("removes the parameters of the config and keeps the others", () => {
    const params = new URLSearchParams(
      "profile_name=p&resource_kind=Deployment&addons_tab=unhealthy",
    );
    const next = omitSearchParams(
      [{ key: "profile_name" }, { key: "resource_kind" }],
      params,
    );

    expect(next.toString()).toBe("addons_tab=unhealthy");
    // the original is left alone
    expect(params.get("profile_name")).toBe("p");
  });
});
