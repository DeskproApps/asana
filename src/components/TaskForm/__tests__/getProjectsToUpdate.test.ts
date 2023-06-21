import { getProjectsToUpdate } from "../utils";
import { mockTask } from "../../../../testing/mocks";

const task = mockTask.data;

describe("TaskForm", () => {
  describe("getProjectsToUpdate", () => {
    test("should return empty add and remove", () => {
      const projects = ["project001", "project002"];
      expect(getProjectsToUpdate(task as never, { projects } as never)).toEqual({
        addProjects: [],
        removeProjects: [],
      });
    });

    test("should return empty add", () => {
      const projects = ["project001"];
      expect(getProjectsToUpdate(task as never, { projects } as never)).toEqual({
        addProjects: [],
        removeProjects: ["project002"],
      });
    });

    test("should return empty remove", () => {
      const projects = ["project001", "project002", "project003"];
      expect(getProjectsToUpdate(task as never, { projects } as never)).toEqual({
        addProjects: ["project003"],
        removeProjects: [],
      });
    });

    test("should return projects to update", () => {
      const projects = ["project002", "project003"];
      expect(getProjectsToUpdate(task as never, { projects } as never)).toEqual({
        addProjects: ["project003"],
        removeProjects: ["project001"],
      });
    });

    test("should return full updated projects", () => {
      const projects = ["project001", "project002", "project003"];
      expect(getProjectsToUpdate({ projects: [] } as never, { projects } as never)).toEqual({
        addProjects: projects,
        removeProjects: [],
      });
    });
  });
});
