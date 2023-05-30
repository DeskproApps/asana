import { baseRequest } from "./baseRequest";
import { TASK_STORY_FIELDS } from "../../constants";
import { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Story } from "./types";

const getTaskStoriesService = (client: IDeskproClient, taskId: Task["gid"]) => {
  return baseRequest<Story[]>(client, {
    url: `/tasks/${taskId}/stories`,
    queryParams: {
      limit: "100",
      opt_fields: TASK_STORY_FIELDS.join(","),
    },
  });
};

export { getTaskStoriesService };
