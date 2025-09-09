import { baseRequest } from "./baseRequest";
import { BASE_URL, TASK_FIELDS } from "@/constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Project, Task } from "./types";
import { NextPage } from "@/types";

interface GetTasksOptions {
  maxPages?: number
}
export async function getTasksService(client: IDeskproClient, projectId: Project["gid"], options?: Readonly<GetTasksOptions>) {

  const { maxPages = 20 } = options ?? {}
  if (!projectId) {
    return Promise.resolve({ data: [] as Task[] });
  }

  const allTasks: Task[] = []

  let nextPageUrl: string | null = `${BASE_URL}/tasks?` + new URLSearchParams({
    limit: "100",
    project: projectId,
    opt_fields: TASK_FIELDS.join(","),
  }).toString()

  const visitedUrls = new Set<string>()
  let pageCount = 0
  while (nextPageUrl && pageCount < maxPages) {

    if (visitedUrls.has(nextPageUrl)) {
      break;
    }

    visitedUrls.add(nextPageUrl);

    const tasksResponse: { data: Task[], next_page?: null | NextPage } = await baseRequest<Task[]>(client, {
      rawUrl: nextPageUrl
    })

    allTasks.push(...tasksResponse.data ?? []);
    nextPageUrl = tasksResponse.next_page?.uri ?? null;

    pageCount++;
  }

  return { data: allTasks }
};
