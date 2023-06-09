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

      expect(await findByText(/Mock Task/i)).toBeInTheDocument();
      expect(await findByText(/Project: Deskpro Asana App/i)).toBeInTheDocument();
      expect(await findByText(/Armen Tamzarian/i)).toBeInTheDocument();
      expect(await findByText(/this is description/i)).toBeInTheDocument();
      expect(await findByText(/Not completed/i)).toBeInTheDocument();
      expect(await findByText(/09 Jun, 2023/i)).toBeInTheDocument();
      expect(await findByText(/01 Jul, 2023/i)).toBeInTheDocument();
    });
  });
});
