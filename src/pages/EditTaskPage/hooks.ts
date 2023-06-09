import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { QueryKey } from "../../query";
import { getTaskService } from "../../services/asana";
import type { Task } from "../../services/asana/types";

type UseTaskDeps = (taskId?: Task["gid"]) => {
  isLoading: boolean,
  task: Task,
};

const useTaskDeps: UseTaskDeps = (taskId) => {
  const task = useQueryWithClient(
    [QueryKey.TASK, taskId as Task["gid"]],
    (client) => getTaskService(client, taskId as Task["gid"]),
    { enabled: Boolean(taskId) },
  );

  return {
    isLoading: [task].every(({ isLoading }) => isLoading),
    task: get(task, ["data", "data"]) as Task,
  };
};

export { useTaskDeps };
