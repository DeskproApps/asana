import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
    },
  },
});

enum QueryKey {
  PROJECTS = "projects",
  WORKSPACES = "workspaces",
  TASKS = "tasks",
  TASK = "task",
  LINKED_TASKS = "linkedTasks",
  SUB_TASKS = "subTasks",
  TASK_STORIES = "taskStories",
}

export { queryClient, QueryKey };
