import { getDeskproTag } from "../getDeskproTag";

const dpTag = { gid: "000", name: "Deskpro" };

const tags = [
  { gid: "001", name: "MVP" },
  { gid: "002", name: "test" },
  { gid: "003",  name: "" },
];

describe("getDeskproTag", () => {
  test("should return Deskpro Tag", () => {
    expect(getDeskproTag([dpTag] as never)).toEqual(dpTag);
    expect(getDeskproTag([...tags, dpTag] as never)).toEqual(dpTag);
  });

  describe("should return undefined if Deskpro Tag not exist", () => {
    test("", () => {
      expect(getDeskproTag([
        { gid: "001", name: "MVP" },
        { gid: "002", name: "test" },
        { gid: "003",  name: "" },
      ] as never)).toBeUndefined();
    });

    test.each(
      [undefined, null, "", 0, true, false, {}, []]
    )("wrong value %p", (value) => {
      expect(getDeskproTag(value as never)).toBeUndefined();
    });
  });
});
