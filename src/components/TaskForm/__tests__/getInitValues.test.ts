import { getInitValues } from "../utils";

describe("getInitValues", () => {
  test("should return initial values", () => {
    expect(getInitValues()).toEqual({
      workspace: "",
      project: "",
      name: "",
      description: "",
      status: "not_completed",
      assignee: "",
      dueDate: null,
      tags: [],
    });
  });

  test.todo("should return initial values if passing task");
});
