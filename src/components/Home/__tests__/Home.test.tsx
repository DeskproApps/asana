import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { Home } from "../Home";

describe("Home", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should show message if no tasks found", async () => {
    const { findByText } = render((
      <Home tasks={[]} onNavigateToTask={jest.fn()} />
    ), { wrappers: { theme: true } });

    expect(await findByText(/No Asana tasks found/i)).toBeInTheDocument();
  });
});
