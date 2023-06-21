import size from "lodash/size";
import { addTagToTaskService } from "./addTagToTaskService";
import { removeTagFromTaskService } from "./removeTagFromTaskService";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Tag } from "./types";

const updateTaskTagsService = (
  client: IDeskproClient,
  taskId: Task["gid"],
  { addIds, removeIds }: { addIds: Array<Tag["gid"]>, removeIds: Array<Tag["gid"]> },
): Array<Promise<{ data: { tag: Tag["gid"] }}|void>> => {
  return [
    ...(!size(addIds) ? [Promise.resolve()] : addIds.map(
      (tagId) => addTagToTaskService(client, taskId, tagId)
    )),
    ...(!size(removeIds) ? [Promise.resolve()] : removeIds.map(
      (tagId) => removeTagFromTaskService(client, taskId, tagId)
    )),
  ];
};

export { updateTaskTagsService };
