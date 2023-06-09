import { getInitValues } from "../utils";
import { mockTask } from "../../../../testing/mocks";

describe("getInitValues", () => {
  test("should return initial values", () => {
    expect(getInitValues()).toEqual({
      workspace: "",
      project: "",
      name: "",
      description: "",
      status: "not_completed",
      assignee: "",
      dueDate: undefined,
      tags: [],
    });
  });

  test("should return initial values if passing task", () => {
    expect(getInitValues(mockTask.data as never)).toEqual({
      workspace: "workspace001",
      project: "project001",
      name: "Mock Task",
      description: "this is description",
      status: "not_completed",
      assignee: "user001",
      dueDate: new Date("2023-07-01T00:00:00.000Z"),
      tags: ["tag002", "tag001"],
    });
  });
});
