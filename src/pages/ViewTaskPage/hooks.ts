import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getTaskService,
  getSubTasksService,
  getTaskStoriesService,
} from "../../services/asana";
import { QueryKey } from "../../query";
import type { Maybe } from "../../types";
import type { Task, Story } from "../../services/asana/types";

type UseTask = (taskId?: Task["gid"]) => {
  isLoading: boolean,
  task: Maybe<Task>,
  subTasks: Task[],
  comments: Story[],
};

const useTask: UseTask = (taskId) => {
  const task = useQueryWithClient(
    [QueryKey.TASK, taskId as Task["gid"]],
    (client) => getTaskService(client, taskId as Task["gid"]),
    { enabled: Boolean(taskId) },
  );

  const subTasks = useQueryWithClient(
    [QueryKey.SUB_TASKS, taskId as Task["gid"]],
    (client) => getSubTasksService(client, taskId as Task["gid"]),
    { enabled: Boolean(taskId) },
  );

  const comments = useQueryWithClient(
    [QueryKey.TASK_STORIES, taskId as Task["gid"]],
    (client) => getTaskStoriesService(client, taskId as Task["gid"]),
    {
      enabled: Boolean(taskId),
      select: (data) => {
        return (get(data, ["data"], []) || []).filter(({ type }) => type === "comment");
      },
    },
  );

  return {
    isLoading: [task, subTasks, comments].some(({ isFetching }) => isFetching),
    task: get(task, ["data", "data"]) || null,
    subTasks: get(subTasks, ["data", "data"], []) || [],
    comments: get(comments, ["data"], []) || [] as Story[],
  };
};

export { useTask };
