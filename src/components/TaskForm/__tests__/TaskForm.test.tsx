import { cleanup, waitFor } from "@testing-library/react";
import { render } from "../../../../testing";
import { TaskForm } from "../TaskForm";

describe("LinkTasks", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((
      <TaskForm onSubmit={jest.fn()} />
    ), { wrappers: { theme: true, query: true } });

    waitFor(async () => {
      expect(await findByText("Workspace")).toBeInTheDocument();
      expect(await findByText("Project")).toBeInTheDocument();
      expect(await findByText("Task name")).toBeInTheDocument();
      expect(await findByText("Description")).toBeInTheDocument();
      expect(await findByText("Status")).toBeInTheDocument();
      expect(await findByText("Assignee")).toBeInTheDocument();
      expect(await findByText("Due date")).toBeInTheDocument();
      expect(await findByText("Tags")).toBeInTheDocument();

      expect(await findByText("Create")).toBeVisible();
      expect(await findByText("Cancel")).not.toBeVisible();
    });
  });

  test("render error", async () => {
    const { findByText } = render((
      <TaskForm onSubmit={jest.fn()} error="some error" />
    ), { wrappers: { theme: true, query: true } });

    waitFor(async () => {
      expect(await findByText("some error")).toBeInTheDocument();
    });
  });

  test("render errors", async () => {
    const { findByText } = render((
      <TaskForm onSubmit={jest.fn()} error={["one error", "two error"]} />
    ), { wrappers: { theme: true, query: true } });

    waitFor(async () => {
      expect(await findByText("one error")).toBeInTheDocument();
      expect(await findByText("two error")).toBeInTheDocument();
    });
  });
});
