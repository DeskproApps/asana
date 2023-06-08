import { format } from "../format";

describe("date", () => {
  describe("format", () => {
    test("should return empty date", () => {
      expect(format(null)).toEqual("-");
    });

    test.todo("pass date as Date");

    test.todo("pass date as string");
  });
});
