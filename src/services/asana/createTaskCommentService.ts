import { baseRequest } from "./baseRequest";
import { TASK_STORY_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Dict } from "../../types";
import type { Task } from "./types";

const createTaskCommentService = (
  client: IDeskproClient,
  taskId: Task["gid"],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Dict<any>,
) => {
  return baseRequest<Task>(client, {
    url: `/tasks/${taskId}/stories`,
    method: "POST",
    queryParams: {
      opt_fields: TASK_STORY_FIELDS.join(","),
    },
    data: { data },
  });
};

export { createTaskCommentService };
