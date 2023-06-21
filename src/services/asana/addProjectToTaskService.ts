import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Project } from "./types";

const addProjectToTaskService = (
  client: IDeskproClient,
  taskId: Task["gid"],
  projectId: Project["gid"],
) => {
  return baseRequest<{ project: Project["gid"] }>(client, {
    url: `/tasks/${taskId}/addProject`,
    method: "POST",
    data: {
      data: { project: projectId },
    },
  });
};

export { addProjectToTaskService };
