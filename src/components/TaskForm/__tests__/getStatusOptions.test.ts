import { getStatusOptions } from "../utils";

describe("getStatusOptions", () => {
  test("should return status options", () => {
    expect(getStatusOptions()).toEqual([
      { type: "value", key: "completed", value: "completed", label: "Completed" },
      { type: "value", key: "not_completed", value: "not_completed", label: "Not completed" },
    ]);
  });
});
