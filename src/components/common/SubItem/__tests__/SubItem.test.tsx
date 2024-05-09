import { cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockSubtasks } from "../../../../../testing";
import { SubItem } from "../SubItem";
import type { Props } from "../SubItem";

const mockCompletedSubtask = mockSubtasks.data[0];
const mockUnCompletedSubtask = mockSubtasks.data[1];

const renderSubItem = (props?: Partial<Props>) => render((
  <SubItem
    item={props?.item || mockCompletedSubtask as never}
    onComplete={props?.onComplete}
  />
), { wrappers: { theme: true } });

describe("SubItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderSubItem();
    expect(await findByText(/\[Create\] is it need to create new tag/i)).toBeInTheDocument();
  });

  test("render completed item", async () => {
    const { container } = renderSubItem({ item: mockCompletedSubtask as never });
    const checkbox = container.querySelector("input[type=checkbox]") as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });

  test("render uncompleted item", async () => {
    const { container } = renderSubItem({ item: mockUnCompletedSubtask as never });
    const checkbox = container.querySelector("input[type=checkbox]") as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
  });

  test("should handle click", async () => {
    const mockOnComplete = jest.fn().mockResolvedValue(null);
    const { container } = renderSubItem({ onComplete: mockOnComplete });
    const checkbox = container.querySelector("input[type=checkbox]") as HTMLInputElement;

    await act(async () => await userEvent.click(checkbox));

    expect(mockOnComplete).toHaveBeenCalledWith("subtask001", false);
  });

  test("should be disabled input if no pass onComplete", async () => {
    const { container } = renderSubItem({ onComplete: undefined });
    const checkbox = container.querySelector("input[type=checkbox]") as HTMLInputElement;

    expect(checkbox.disabled).toBe(true);
  });
});
