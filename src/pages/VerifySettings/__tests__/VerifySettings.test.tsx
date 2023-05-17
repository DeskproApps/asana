import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { VerifySettings } from "../VerifySettings";

describe("VerifySettings", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByRole } = render(<VerifySettings/>, { wrappers: { theme: true }});

    expect(await findByRole("button", { name: /Verify Settings/i })).toBeInTheDocument();
  });

  test("should be a disabled button if there is no token", async () => {
    const { getByRole } = render(<VerifySettings/>, { wrappers: { theme: true }});

    expect(await getByRole("button", { name: /Verify Settings/i })).toBeDisabled();
  });
});
