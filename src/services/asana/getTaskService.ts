import { baseRequest } from "./baseRequest";
import { TASK_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task } from "./types";

const getTaskService = (client: IDeskproClient, taskId: Task["gid"]) => {
  return baseRequest<Task>(client, {
    url: `/tasks/${taskId}`,
    queryParams: {
      opt_fields: TASK_FIELDS.join(","),
    },
  });
};

export { getTaskService };
