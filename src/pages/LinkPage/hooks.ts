import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { QueryKey } from "../../query";
import {
  getTasksService,
  getProjectsService,
  getWorkspacesService,
} from "../../services/asana";
import type { Maybe } from "../../types";
import type { Workspace, Project, Task } from "../../services/asana/types";

type UseTasks = (
  workspaceId?: Maybe<Workspace["gid"]>,
  projectId?: Maybe<Project["gid"]>,
) => {
  isLoading: boolean,
  workspaces: Workspace[],
  projects: Project[],
  tasks: Task[],
};

const useTasks: UseTasks = (workspaceId, projectId) => {
  const workspaces = useQueryWithClient(
    [QueryKey.WORKSPACES],
    (client) => getWorkspacesService(client),
  );

  const projects = useQueryWithClient(
    [QueryKey.PROJECTS, workspaceId as Workspace["gid"]],
    (client) => getProjectsService(client, workspaceId as Workspace["gid"]),
    {
      enabled: Boolean(workspaceId),
      useErrorBoundary: false,
    },
  );

  const tasks = useQueryWithClient(
    [QueryKey.TASKS, workspaceId as Workspace["gid"], projectId as Project["gid"]],
    (client) => getTasksService(client, projectId as Project["gid"]),
    {
      enabled: Boolean(workspaceId) && Boolean(projectId),
      useErrorBoundary: false,
    },
  );

  return {
    isLoading: [workspaces, projects, tasks].some(({ isLoading }) => isLoading),
    workspaces: get(workspaces, ["data", "data"], []) || [],
    projects: get(projects, ["data", "data"], []) || [],
    tasks: get(tasks, ["data", "data"], []) || [],
  };
};

export { useTasks };
