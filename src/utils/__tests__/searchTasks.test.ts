import { searchTasks } from "../searchTasks";

const tasks = [
  { gid: "001", name: "Research" },
  { gid: "002", name: "Login" },
  { gid: "003", name: "Link tasks" },
  { gid: "004", name: "Home page" },
  { gid: "005", name: "Task details" },
  { gid: "006", name: "Crete Task" },
  { gid: "007", name: "Edit Task" },
  { gid: "008", name: "Add comments" },
  { gid: "009", name: "Improvements" },
];

describe("searchTasks", () => {
  test("should return filtered tasks", () => {
    expect(searchTasks("task", tasks as never))
      .toEqual([
        { gid: "003", name: "Link tasks" },
        { gid: "005", name: "Task details" },
        { gid: "006", name: "Crete Task" },
        { gid: "007", name: "Edit Task" },
      ]);
  });

  test("should return full list", () => {
    expect(searchTasks("", tasks as never)).toEqual(tasks);
  });

  test.each(
    [undefined, null, "", 0, true, false, {}]
  )("wrong tasks: %p", (value) => {
    expect(searchTasks("task", value as never)).toEqual([]);
  });
});
