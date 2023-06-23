import { getTaskValues } from "../utils";

const values = {
  workspace: "1201873797723140",
  projects: ["1204600346922820"],
  name: "Task from DP",
  description: "this is description!!!",
  status: "completed",
  assignee: "1201873803770270",
  dueDate: new Date("2023-06-30T21:00:00.000Z"),
  tags: ['1204600348650521', '1204784700956466'],
};

describe("TaskForm", () => {
  describe("getTaskValues", () => {
    test("should return required values", () => {
      expect(getTaskValues({
        workspace: "w001",
        projects: ["p001"],
        name: "Task from DP",
        status: "completed",
      } as never)).toEqual({
        workspace: "w001",
        projects: ['p001'],
        name: "Task from DP",
        completed: true,
      });
    });

    test("should return full task values", () => {
      expect(getTaskValues(values)).toEqual({
        workspace: "1201873797723140",
        projects: ['1204600346922820'],
        name: "Task from DP",
        completed: true,
        assignee: "1201873803770270",
        due_on: "2023-06-30",
        notes: "this is description!!!",
        tags: ['1204600348650521', '1204784700956466'],
      });
    });

    test("should return date for update task", () => {
      expect(getTaskValues(values, true)).toEqual({
        workspace: "1201873797723140",
        name: "Task from DP",
        completed: true,
        assignee: "1201873803770270",
        due_on: "2023-06-30",
        notes: "this is description!!!",
      });
    });
  });
});
