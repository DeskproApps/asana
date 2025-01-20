import { baseRequest } from "./baseRequest";
import { TASK_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project, Task } from "./types";

const getTasksService = (
  client: IDeskproClient,
  projectId: Project["gid"],
) => {
  if (!projectId) {
    return Promise.resolve({ data: [] });
  }

  return baseRequest<Task[]>(client, {
    url: "/tasks",
    queryParams: {
      limit: "100",
      project: projectId,
      opt_fields: TASK_FIELDS.join(","),
    },
  });
};

export { getTasksService };
