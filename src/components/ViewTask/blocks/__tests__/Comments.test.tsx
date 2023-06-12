import { cleanup, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../../testing";
import { Comments } from "../Comments";

const mockComments = [
  {
    "gid": "story017",
    "created_at": "2023-05-29T21:07:47.787Z",
    "created_by": {
      "gid": "user001",
      "email": "ilia.makarov@me.com",
      "name": "ilia makarov",
      "photo": {
        "image_60x60": "https://story017.com/60x60.png",
      }
    },
    "html_text": "<body>Comment one</body>",
    "type": "comment"
  },
  {
    "gid": "story018",
    "created_at": "2023-05-29T21:08:46.711Z",
    "created_by": {
      "gid": "user001",
      "email": "ilia.makarov@me.com",
      "name": "ilia makarov",
      "photo": {
        "image_60x60": "https://story018.com/60x60.png",
      }
    },
    "html_text": "<body>comment two</body>",
    "type": "comment"
  }
];

jest.mock('react-time-ago', () => jest.fn().mockReturnValue('7h 30m'));

describe("ViewTask", () => {
  describe("Comments", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = render((
        <Comments comments={mockComments as never} onNavigateToAddComment={jest.fn()} />
      ), { wrappers: { theme: true } });

      expect(await findByText(/Comments \(2\)/i)).toBeInTheDocument();
      expect(await findByText(/Comment one/i)).toBeInTheDocument();
      expect(await findByText(/Comment two/i)).toBeInTheDocument();
    });

    test("empty comments", async () => {
      const { findByText } = render((
        <Comments comments={[]} onNavigateToAddComment={jest.fn()} />
      ), { wrappers: { theme: true } });

      expect(await findByText(/Comments \(0\)/i)).toBeInTheDocument();
    });

    test("should navigate to add new comments", async () => {
      const mockOnNavigateToAddComment = jest.fn();

      const { findByRole } = render((
        <Comments comments={[]} onNavigateToAddComment={mockOnNavigateToAddComment} />
      ), { wrappers: { theme: true } });

      const navigateButton = await findByRole("button");

      await act(async () => {
        await userEvent.click(navigateButton as Element);
      });

      expect(mockOnNavigateToAddComment).toHaveBeenCalledTimes(1);
    });
  });
});
