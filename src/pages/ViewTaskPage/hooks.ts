import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import {
  getTaskService,
  getSubTasksService,
  getTaskStoriesService,
  getTaskAttachmentsService,
} from "../../services/asana";
import { QueryKey } from "../../query";
import type { Maybe } from "../../types";
import type { Task, Story, Attachment } from "../../services/asana/types";

type UseTask = (taskId?: Task["gid"]) => {
  isLoading: boolean,
  task: Maybe<Task>,
  subTasks: Task[],
  comments: Story[],
  attachments: Attachment[],
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore // need to fix typing in the app-sdk
  const comments = useQueryWithClient<{ data: Story[] }, undefined, Story[]>(
    [QueryKey.TASK_STORIES, taskId as Task["gid"]],
    (client) => getTaskStoriesService(client, taskId as Task["gid"]),
    {
      enabled: Boolean(taskId),
      select: (data) => {
        return (get(data, ["data"], []) || []).filter(({ type }) => type === "comment");
      },
    },
  );

  const attachments = useQueryWithClient(
    [QueryKey.ATTACHMENTS, taskId as Task["gid"]],
    (client) => getTaskAttachmentsService(client, taskId as Task["gid"]),
    { enabled: Boolean(taskId) },
  );

  return {
    isLoading: [task, subTasks, comments].some(({ isFetching }) => isFetching),
    task: get(task, ["data", "data"]) || null,
    subTasks: get(subTasks, ["data", "data"], []) || [],
    comments: (get(comments, ["data"], []) || []) as Story[],
    attachments: get(attachments, ["data", "data"], []) || [],
  };
};

export { useTask };
