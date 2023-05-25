import get from "lodash/get";
import size from "lodash/size";
import {
  useQueryWithClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useQueriesWithClient } from "../../hooks";
import { getEntityListService } from "../../services/deskpro";
import { getTaskService } from "../../services/asana";
import { QueryKey } from "../../query";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { TicketContext } from "../../types";
import type { Task } from "../../services/asana/types";

type UseTasks = () => {
  isLoading: boolean;
  tasks: Task[];
};

const useTasks: UseTasks = () => {
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const ticketId = get(context, ["data", "ticket", "id"]);

  const linkedIds = useQueryWithClient(
    [QueryKey.LINKED_TASKS],
    (client) => getEntityListService(client, ticketId),
    { enabled: Boolean(ticketId) }
  );

  const tasks = useQueriesWithClient((get(linkedIds, ["data"], []) || []).map((taskId) => ({
    queryKey: [QueryKey.TASK, taskId],
    queryFn: (client: IDeskproClient) => getTaskService(client, taskId),
    enabled: Boolean(size(linkedIds)),
    useErrorBoundary: false,
  })));

  return {
    isLoading: [linkedIds, ...tasks].some(({ isLoading }) => isLoading),
    tasks: tasks.map(({ data }) => get(data, ["data"])).filter(Boolean) as Task[],
  };
};

export { useTasks };
