import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Tag, Task } from "./types";

const removeTagFromTaskService = (
  client: IDeskproClient,
  taskId: Task["gid"],
  tagId: Tag["gid"],
) => {
  return baseRequest<void>(client, {
    url: `/tasks/${taskId}/removeTag`,
    method: "POST",
    data: {
      data: { tag: tagId },
    },
  });
};

export { removeTagFromTaskService };
