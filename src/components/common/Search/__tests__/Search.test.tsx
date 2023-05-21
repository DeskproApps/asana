import * as React from "react";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "../Search";
import { render } from "../../../../../testing";

describe("Search", () => {
  test("render", async () => {
    const { container } = render(
      <Search value="" onChange={() => {}} onClear={jest.fn}/>,
      { wrappers: { theme: true } }
    );

    const input = container.querySelector("input#search");
    expect(input).toBeInTheDocument();
  });

  test("set init value", async () => {
    const { container } = render(
      <Search value="find issue" onChange={() => {}} onClear={jest.fn()}/>,
      { wrappers: { theme: true } }
    );

    const input = container.querySelector("input#search");
    expect(input).toHaveValue("find issue");
  });

  test("should called onChange", async () => {
    const onChange = jest.fn();
    const { container } = render(
      <Search value="" onChange={onChange} onClear={jest.fn()}/>,
      { wrappers: { theme: true } }
    );

    const input = container.querySelector("input#search");
    expect(input).toBeInTheDocument();
    await userEvent.type(input as Element, "search issue");
    expect(onChange).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
});
