import { baseRequest } from "./baseRequest";
import { TASK_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task } from "./types";

const getSubTasksService = (client: IDeskproClient, taskId: Task["gid"]) => {
  return baseRequest<Task>(client, {
    url: `/tasks/${taskId}/subtasks`,
    queryParams: {
      opt_fields: TASK_FIELDS.join(","),
    },
  });
};

export { getSubTasksService };
