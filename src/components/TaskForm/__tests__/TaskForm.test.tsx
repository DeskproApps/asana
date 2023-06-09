import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { TaskForm } from "../TaskForm";

describe("LinkTasks", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", () => {
    const { queryByText } = render((
      <TaskForm onSubmit={jest.fn()} />
    ), { wrappers: { theme: true, query: true } });

    expect(queryByText("Workspace")).toBeInTheDocument();
    expect(queryByText("Project")).toBeInTheDocument();
    expect(queryByText("Task name")).toBeInTheDocument();
    expect(queryByText("Description")).toBeInTheDocument();
    expect(queryByText("Status")).toBeInTheDocument();
    expect(queryByText("Assignee")).toBeInTheDocument();
    expect(queryByText("Due date")).toBeInTheDocument();
    expect(queryByText("Tags")).toBeInTheDocument();

    expect(queryByText("Create")).toBeInTheDocument();
    expect(queryByText("Cancel")).not.toBeInTheDocument();
  });

  test("render error", () => {
    const { queryByText } = render((
      <TaskForm onSubmit={jest.fn()} error="some error" />
    ), { wrappers: { theme: true, query: true } });

    expect(queryByText("some error")).toBeInTheDocument();
  });

  test("render errors", () => {
    const { queryByText } = render((
      <TaskForm onSubmit={jest.fn()} error={["one error", "two error"]} />
    ), { wrappers: { theme: true, query: true } });

    expect(queryByText("one error")).toBeInTheDocument();
    expect(queryByText("two error")).toBeInTheDocument();
  });
});
