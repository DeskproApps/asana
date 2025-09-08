import { baseRequest } from "./baseRequest";
import { BASE_URL, TASK_FIELDS } from "@/constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project, Task } from "./types";
import { NextPage } from "@/types";

export async function getTasksService(client: IDeskproClient, projectId: Project["gid"]) {
  if (!projectId) {
    return Promise.resolve({ data: [] as Task[] });
  }

  const allTasks: Task[] = []

  let nextPageUrl: string | null = `${BASE_URL}/tasks?` + new URLSearchParams({
    limit: "100",
    project: projectId,
    opt_fields: TASK_FIELDS.join(","),
  }).toString()


  while (nextPageUrl) {
    const tasksResponse: { data: Task[], next_page?: null | NextPage } = await baseRequest<Task[]>(client, {
      rawUrl: nextPageUrl
    })

    allTasks.push(...tasksResponse.data ?? []);


    if (tasksResponse.next_page?.uri) {
      nextPageUrl = tasksResponse.next_page.uri;
    } else {
      nextPageUrl = null;
    }
  }

  return { data: allTasks }
};
