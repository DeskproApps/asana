import size from "lodash/size";
import { addProjectToTaskService } from "./addProjectToTaskService";
import { removeProjectFromTaskService } from "./removeProjectFromTaskService";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Project } from "./types";

const updateTaskProjectsService = (
  client: IDeskproClient,
  taskId: Task["gid"],
  { addIds, removeIds }: { addIds: Array<Project["gid"]>, removeIds: Array<Project["gid"]> },
): Array<Promise<{ data: { project: Project["gid"] }}|void>> => {
  return [
    ...(!size(addIds) ? [Promise.resolve()] : addIds.map(
      (projectId) => addProjectToTaskService(client, taskId, projectId)
    )),
    ...(!size(removeIds) ? [Promise.resolve()] : removeIds.map(
      (projectId) => removeProjectFromTaskService(client, taskId, projectId)
    )),
  ];
};

export { updateTaskProjectsService };
