import { useState, useCallback } from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { deleteEntityService } from "../services/deskpro";
import { useLinkedAutoComment } from "./useLinkedAutoComment";
import { useReplyBox } from "./useReplyBox";
import { useDeskproTag } from "./useDeskproTag";
import type { TicketContext } from "../types";
import type { Task } from "../services/asana/types";

type UseUnlinkTask = () => {
  isLoading: boolean,
  unlinkTask: (task: Task) => void,
};

const useUnlinkTask: UseUnlinkTask = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { addUnlinkComment } = useLinkedAutoComment();
  const { removeDeskproTag } = useDeskproTag();
  const { deleteSelectionState } = useReplyBox();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ticketId = get(context, ["data", "ticket", "id"]);

  const unlinkTask = useCallback((task?: Task) => {
    if (!client || isEmpty(task)) {
      return;
    }

    setIsLoading(true);

    Promise
      .all([
        deleteEntityService(client, ticketId, task.gid),
        addUnlinkComment(task.gid),
        removeDeskproTag(task),
        deleteSelectionState(task.gid, "note"),
        deleteSelectionState(task.gid, "email"),
      ])
      .then(() => {
        setIsLoading(false);
        navigate("/home");
      });
  }, [client, ticketId, navigate, addUnlinkComment, deleteSelectionState, removeDeskproTag]);

  return { isLoading, unlinkTask }
};

export { useUnlinkTask };
