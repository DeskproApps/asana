import { getTagsToUpdate } from "../utils";
import { mockTask } from "../../../../testing/mocks";

const task = mockTask.data;

describe("TaskForm", () => {
  describe("getTagsToUpdate", () => {
    test("should return empty add/remove tags", () => {
      const tags = ["tag001", "tag002"];
      expect(getTagsToUpdate(task as never, { tags } as never)).toEqual({
        addIds: [],
        removeIds: [],
      });
    });

    test("should return empty add", () => {
      const tags = ["tag001"];
      expect(getTagsToUpdate(task as never, { tags } as never)).toEqual({
        addIds: [],
        removeIds: ["tag002"],
      });
    });

    test("should return empty remove", () => {
      const tags = ["tag001", "tag002", "tag003"];
      expect(getTagsToUpdate(task as never, { tags } as never)).toEqual({
        addIds: ["tag003"],
        removeIds: [],
      });
    });

    test("should return tags to update", () => {
      const tags = ["tag002", "tag003"];
      expect(getTagsToUpdate(task as never, { tags } as never)).toEqual({
        addIds: ["tag003"],
        removeIds: ["tag001"],
      });
    });

    test("should return full updated tags", () => {
      const tags = ["tag001", "tag002", "tag003"];
      expect(getTagsToUpdate({ projects: [] } as never, { tags } as never)).toEqual({
        addIds: tags,
        removeIds: [],
      });
    });
  });
});
