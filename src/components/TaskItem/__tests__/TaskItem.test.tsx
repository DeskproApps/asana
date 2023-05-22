import { cleanup } from "@testing-library/react";
import { TaskItem } from "../TaskItem";
import { render } from "../../../../testing";
import mockTasks from "../../../../testing/mocks/mockTasks.json";

jest.mock("../../../services/deskpro/getEntityAssociationCountService", () => ({
  getEntityAssociationCountService: () => Promise.resolve(145),
}));

describe("TaskItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = render((
      <TaskItem task={mockTasks.data[1] as never} />
    ), { wrappers: { appSdk: true } });

    expect(await findByText(/Link Asana tasks to ticket DP/i)).toBeInTheDocument();
    expect(await findByText(/Project: Deskpro Asana App/i)).toBeInTheDocument();
    expect(await findByText(/19 May, 2023 14:00/i)).toBeInTheDocument();
    expect(await findByText(/ilia makarov/i)).toBeInTheDocument();
    expect(await findByText(/Not completed/i)).toBeInTheDocument();
    expect(await findByText(/145/i)).toBeInTheDocument();
  });
});
