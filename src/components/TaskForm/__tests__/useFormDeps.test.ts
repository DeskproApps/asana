import { cleanup, renderHook } from "@testing-library/react";
import {
  getTagsService,
  getUsersService,
  getProjectsService,
  getWorkspacesService,
} from "../../../services/asana";
import { useFormDeps } from "../hooks";
import { wrappers } from "../../../../testing";
import type { Result } from "../hooks";

jest.mock("../../../services/asana/getTagsService");
jest.mock("../../../services/asana/getUsersService");
jest.mock("../../../services/asana/getProjectsService");
jest.mock("../../../services/asana/getWorkspacesService");

describe("useFormDeps", () => {
  (getTagsService as jest.Mock).mockResolvedValue(() => Promise.resolve());
  (getUsersService as jest.Mock).mockResolvedValue(() => Promise.resolve());
  (getProjectsService as jest.Mock).mockResolvedValue(() => Promise.resolve());
  (getWorkspacesService as jest.Mock).mockResolvedValue(() => Promise.resolve());

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("load only workspaces", () => {
    renderHook<Result, unknown>(() => useFormDeps(), {
      wrapper: ({ children }) => wrappers(children, { query: true }),
    });

    expect(getWorkspacesService).toHaveBeenCalled();
    expect(getTagsService).not.toHaveBeenCalled();
    expect(getUsersService).not.toHaveBeenCalled();
    expect(getProjectsService).not.toHaveBeenCalled();
  });

  test("load all dependencies", () => {
    renderHook<Result, unknown>(() => useFormDeps("w001"), {
      wrapper: ({ children }) => wrappers(children, { query: true }),
    });

    expect(getWorkspacesService).toHaveBeenCalled();
    expect(getTagsService).toHaveBeenCalled();
    expect(getUsersService).toHaveBeenCalled();
    expect(getProjectsService).toHaveBeenCalled();
  });
});
