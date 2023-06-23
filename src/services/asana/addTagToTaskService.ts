import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Tag, Task } from "./types";

const addTagToTaskService = (
  client: IDeskproClient,
  taskId: Task["gid"],
  tagId: Tag["gid"],
) => {
  return baseRequest<{ tag: Tag["gid"] }>(client, {
    url: `/tasks/${taskId}/addTag`,
    method: "POST",
    data: {
      data: { tag: tagId },
    },
  });
};

export { addTagToTaskService };
