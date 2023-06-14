import { getEntityMetadata } from "../getEntityMetadata";
import { mockTask } from "../../../testing/mocks";

describe("getEntityMetadata", () => {
  test("should return metadata", () => {
    expect(getEntityMetadata(mockTask.data as never)).toStrictEqual({
      id: "task001",
      name: "Mock Task",
      workspace: "Customer success",
      projects: "Project: Deskpro Asana App, Second Project",
    });
  });

  test("shouldn't return metadata", () => {
    expect(getEntityMetadata()).toBeUndefined();
  });
});
