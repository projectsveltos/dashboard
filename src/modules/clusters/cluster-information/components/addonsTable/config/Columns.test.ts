import { describe, expect, it } from "vitest";

import { profileColumns } from "@/modules/clusters/cluster-information/components/addonsTable/config/Columns";
import { AddonTableTypes } from "@/types/addonTable.types";

describe("profileColumns", () => {
  it("shows the health of the profile between its status and its error", () => {
    const keys = profileColumns.map((column) => column.keys);
    const health = keys.indexOf(AddonTableTypes.HEALTH);

    expect(health).toBeGreaterThan(-1);
    expect(keys[health - 1]).toBe(AddonTableTypes.STATUS);
    expect(keys[health + 1]).toBe(AddonTableTypes.FAILURE_MESSAGE);
  });
});
