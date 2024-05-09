import { cleanup, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
        <SubTasks subTasks={ mockSubtasks.data as never} onCompleteSubtask={jest.fn()} />
      ), { wrappers: { theme: true } });

      expect(await findByText(/\[Create\] is it need to create new tag/i)).toBeInTheDocument();
      expect(await findByText(/\[Home\]\[Details\] is need show status \(done or no\)/i)).toBeInTheDocument();
    });

    test("should trigger update subtask status", async () => {
      const onMockCompleteSubtask = jest.fn().mockResolvedValue(null);

      const { container } = render((
        <SubTasks subTasks={ mockSubtasks.data as never} onCompleteSubtask={onMockCompleteSubtask} />
      ), { wrappers: { theme: true } });

      const checkbox = container.querySelector("input[id=subtask001]");

      await act(async () => await userEvent.click(checkbox as Element));

      await waitFor(() => {
        expect(onMockCompleteSubtask).toHaveBeenCalled();
      });
    });
  });
});
