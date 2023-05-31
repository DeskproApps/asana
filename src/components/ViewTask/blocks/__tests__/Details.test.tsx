import { cleanup } from "@testing-library/react";
import { Details } from "../Details";
import { render, mockTask } from "../../../../../testing";

describe("ViewTask", () => {
  describe("Details", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Details task={mockTask.data as never} />
      ), { wrappers: { theme: true } });

      expect(await findByText(/Link Asana tasks to ticket DP/i)).toBeInTheDocument();
      expect(await findByText(/Project: Deskpro Asana App/i)).toBeInTheDocument();
      expect(await findByText(/ilia makarov/i)).toBeInTheDocument();
      expect(await findByText(/this is description/i)).toBeInTheDocument();
      expect(await findByText(/Not completed/i)).toBeInTheDocument();
      expect(await findByText(/15 May, 2023/i)).toBeInTheDocument();
      expect(await findByText(/19 May, 2023 14:00/i)).toBeInTheDocument();
    });
  });
});
