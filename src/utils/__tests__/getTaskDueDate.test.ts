import { getTaskDueDate } from "../getTaskDueDate";

describe("getTaskDueDate", () => {
  test("should date", () => {
    const data = { due_at: null, due_on: "2023-05-23" };
    expect(getTaskDueDate(data as never)).toEqual("23 May, 2023");
  });

  test("should date and time", () => {
    expect(getTaskDueDate({ due_at: "2023-05-19T14:00:00.000Z", due_on: "2023-05-19" } as never)).toEqual("19 May, 2023 14:00");
    expect(getTaskDueDate({ due_at: "2023-05-19T14:00:00.000Z", due_on: null } as never)).toEqual("19 May, 2023 14:00");
  });

  test("shouldn't return date", () => {
    expect(getTaskDueDate()).toEqual("-");
    expect(getTaskDueDate({} as never)).toEqual("-");
    expect(getTaskDueDate({ due_at: null, due_on: null } as never)).toEqual("-");
  });
});
