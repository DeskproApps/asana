import { getInitValues } from "../utils";

describe("TaskCommentForm", () => {
  describe("getInitValues", () => {
    test("should return initial values", () => {
      expect(getInitValues()).toEqual({ comment: "", attachments: [] });
    });
  });
});
