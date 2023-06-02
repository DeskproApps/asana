import { useState, useCallback } from "react";
import get from "lodash/get";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { deleteEntityService } from "../services/deskpro";
import type { TicketContext } from "../types";
import type { Task } from "../services/asana/types";

type UseUnlinkTask = () => {
  isLoading: boolean,
  unlinkTask: (taskId: Task["gid"]) => void,
};

const useUnlinkTask: UseUnlinkTask = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ticketId = get(context, ["data", "ticket", "id"]);

  const unlinkTask = useCallback((taskId?: Task["gid"]) => {
    if (!client || !taskId) {
      return;
    }

    setIsLoading(true);

    Promise
      .all([
        deleteEntityService(client, ticketId, taskId),
      ])
      .then(() => {
        setIsLoading(false);
        navigate("/home");
      });
  }, [client, ticketId, navigate]);

  return { isLoading, unlinkTask }
};

export { useUnlinkTask };
