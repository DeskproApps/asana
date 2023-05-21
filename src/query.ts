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
}

export { queryClient, QueryKey };
