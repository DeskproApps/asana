import { act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Buttons } from "../Buttons";
import { render } from "../../../../testing";
import mockTasks from "../../../../testing/mocks/mockTasks.json";

describe("LinkTasks", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByRole } = render((
      <Buttons
        selectedTasks={[]}
        isSubmitting={false}
        onLinkTasks={jest.fn()}
        onCancel={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    expect(await findByRole("button", { name: /Link Issue/i })).toBeInTheDocument();
    expect(await findByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("should disabled button 'Link Issue' if tasks no selected", async () => {
    const { findByRole } = render((
      <Buttons
        selectedTasks={[]}
        isSubmitting={false}
        onLinkTasks={jest.fn()}
        onCancel={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    const linkButton = await findByRole("button", { name: /Link Issue/i });
    expect(linkButton).toHaveAttribute("disabled");
  });

  test("shouldn't disabled button 'Link Issue' if tasks selected", async () => {
    const { findByRole } = render((
      <Buttons
        selectedTasks={mockTasks.data[1] as never}
        isSubmitting={false}
        onLinkTasks={jest.fn()}
        onCancel={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    const linkButton = await findByRole("button", { name: /Link Issue/i });
    expect(linkButton).not.toHaveAttribute("disabled");
  });

  test("should trigger `onLinkTasks`", async () => {
    const mockOnLinkTasks = jest.fn();
    const { findByRole } = render((
      <Buttons
        selectedTasks={mockTasks.data[1] as never}
        isSubmitting={false}
        onLinkTasks={mockOnLinkTasks}
        onCancel={jest.fn()}
      />
    ), { wrappers: { theme: true } });

    const linkButton = await findByRole("button", { name: /Link Issue/i });

    await act(async () => {
      await userEvent.click(linkButton);
    });

    expect(mockOnLinkTasks).toHaveBeenCalledTimes(1);
  });

  test("should trigger `onCancel`", async () => {
    const mockOnCancel = jest.fn();
    const { findByRole } = render((
      <Buttons
        selectedTasks={mockTasks.data[1] as never}
        isSubmitting={false}
        onLinkTasks={jest.fn()}
        onCancel={mockOnCancel}
      />
    ), { wrappers: { theme: true } });

    const cancelButton = await findByRole("button", { name: /Cancel/i });

    await act(async () => {
      await userEvent.click(cancelButton);
    });

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
