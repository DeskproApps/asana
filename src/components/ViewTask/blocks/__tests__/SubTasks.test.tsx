import { cleanup } from "@testing-library/react";
import { SubTasks } from "../SubTasks";
import { render, mockSubtasks } from "../../../../../testing";

describe("ViewTask", () => {
  describe("SubTasks", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <SubTasks subTasks={ mockSubtasks.data as never} />
      ), { wrappers: { theme: true } });

      expect(await findByText(/\[Create\] is it need to create new tag/i)).toBeInTheDocument();
      expect(await findByText(/\[Home\]\[Details\] is need show status \(done or no\)/i)).toBeInTheDocument();
    });

    test("should trigger update subtask status", async () => {
      const { container } = render((
        <SubTasks subTasks={ mockSubtasks.data as never} />
      ), { wrappers: { theme: true } });

      const input = container.querySelector("input[id=subtask001]");
      expect(input).toHaveAttribute("disabled");
    });
  });
});
