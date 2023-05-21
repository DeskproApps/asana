import { getProjectName } from "../getProjectName";

describe("getProjectName", () => {
  test("should return project name", () => {
    const task = {
      projects: [
        { gid: "001", name: "project 001", permalink_url: "https://project001.com" },
      ],
    };
    expect(getProjectName(task as never)).toEqual("project 001");
  });

  test("should return more then one project name", () => {
    const task = {
      projects: [
        { gid: "001", name: "project 001", permalink_url: "https://project001.com" },
        { gid: "002", permalink_url: "https://project002.com" },
        { gid: "003", name: "project 003", permalink_url: "https://project003.com" },
      ],
    };
    expect(getProjectName(task as never)).toEqual("project 001, project 003");
  });

  test("should return dash if haven't project: %p", () => {
    expect(getProjectName({} as never)).toEqual("-");
  });

  test.each(
    [undefined, null, "", 0, true, false, {}, []]
  )("should return dash if project is wrong value: %p", (value) => {
    expect(getProjectName({ projects: value } as never)).toEqual("-");
  });
});
