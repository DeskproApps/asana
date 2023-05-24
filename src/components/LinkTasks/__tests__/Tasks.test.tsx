import { cleanup } from "@testing-library/react";
import { render } from "../../../../testing";
import { Tasks } from "../Tasks";
import mockTasks from "../../../../testing/mocks/mockTasks.json";

jest.mock("../../../services/deskpro/getEntityAssociationCountService", () => ({
  getEntityAssociationCountService: () => Promise.resolve(0),
}));

describe("Tasks", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((
      <Tasks
        tasks={mockTasks.data as never}
        isLoading={false}
        selectedTasks={[]}
        onChangeSelectedTask={jest.fn()}
      />
    ), { wrappers: { appSdk: true } });

    expect(await findByText(/Research/i)).toBeInTheDocument();
    expect(await findByText(/Link Asana tasks to ticket DP/i)).toBeInTheDocument();
    expect(await findByText(/List of linked tasks to a ticket/i)).toBeInTheDocument();
    expect(await findByText(/Details of Asana task/i)).toBeInTheDocument();
    expect(await findByText(/Unlink Asana tasks from ticket/i)).toBeInTheDocument();
    expect(await findByText(/Create Asana tasks from DP/i)).toBeInTheDocument();
    expect(await findByText(/Edit Asana task from DP/i)).toBeInTheDocument();
    expect(await findByText(/View comments on Asana tasks/i)).toBeInTheDocument();
    expect(await findByText(/Add comments to task from DP/i)).toBeInTheDocument();
    expect(await findByText(/Option for automatic comment with URL to DP ticket should be added when the task is linked/i)).toBeInTheDocument();
    expect(await findByText(/Option to add ticket replies\/notes to linked issue as a comment/i)).toBeInTheDocument();
  });

  test("should show LoadingSpinner", async () => {
    const { findByText } = render((
      <Tasks
        tasks={[] as never}
        isLoading={true}
        selectedTasks={[]}
        onChangeSelectedTask={jest.fn()}
      />
    ), { wrappers: { appSdk: true } });

    expect(await findByText(/LoadingSpinner.../i)).toBeInTheDocument();
  });

  test("should render if empty task list", async () => {
    const { findByText } = render((
      <Tasks
        tasks={[] as never}
        isLoading={false}
        selectedTasks={[]}
        onChangeSelectedTask={jest.fn()}
      />
    ), { wrappers: { appSdk: true } });

    expect(await findByText(/No Asana tasks found/i)).toBeInTheDocument();
  });

  test("should show NotFound if wrong tasks value", async () => {
    const { findByText } = render((
      <Tasks
        tasks={null as never}
        isLoading={false}
        selectedTasks={[]}
        onChangeSelectedTask={jest.fn()}
      />
    ), { wrappers: { appSdk: true } });

    expect(await findByText(/No found/i)).toBeInTheDocument();
  });
});
