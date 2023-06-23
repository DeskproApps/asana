import { getProjectsToUpdate } from "../utils";
import { mockTask } from "../../../../testing/mocks";

const task = mockTask.data;

describe("TaskForm", () => {
  describe("getProjectsToUpdate", () => {
    test("should return empty add and remove", () => {
      const projects = ["project001", "project002"];
      expect(getProjectsToUpdate(task as never, { projects } as never)).toEqual({
        addIds: [],
        removeIds: [],
      });
    });

    test("should return empty add", () => {
      const projects = ["project001"];
      expect(getProjectsToUpdate(task as never, { projects } as never)).toEqual({
        addIds: [],
        removeIds: ["project002"],
      });
    });

    test("should return empty remove", () => {
      const projects = ["project001", "project002", "project003"];
      expect(getProjectsToUpdate(task as never, { projects } as never)).toEqual({
        addIds: ["project003"],
        removeIds: [],
      });
    });

    test("should return projects to update", () => {
      const projects = ["project002", "project003"];
      expect(getProjectsToUpdate(task as never, { projects } as never)).toEqual({
        addIds: ["project003"],
        removeIds: ["project001"],
      });
    });

    test("should return full updated projects", () => {
      const projects = ["project001", "project002", "project003"];
      expect(getProjectsToUpdate({ projects: [] } as never, { projects } as never)).toEqual({
        addIds: projects,
        removeIds: [],
      });
    });
  });
});
