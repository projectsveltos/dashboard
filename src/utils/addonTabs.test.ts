import { describe, expect, it } from "vitest";

import { AddonTypes } from "@/types/addon.types";
import { addonTabFromParam, addonTabSlug } from "@/utils/addonTabs";

describe("addon tabs in the URL", () => {
  it("round-trips every tab", () => {
    Object.values(AddonTypes).forEach((tab) => {
      expect(addonTabFromParam(addonTabSlug(tab))).toBe(tab);
    });
  });

  it("opens Helm charts when the parameter is missing or unknown", () => {
    expect(addonTabFromParam(null)).toBe(AddonTypes.HELM);
    expect(addonTabFromParam("")).toBe(AddonTypes.HELM);
    expect(addonTabFromParam("nope")).toBe(AddonTypes.HELM);
  });
});
