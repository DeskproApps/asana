import { useState, useCallback } from "react";
import get from "lodash/get";
import map from "lodash/map";
import size from "lodash/size";
import { useNavigate } from "react-router-dom";
import {
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useSetTitle, useLinkedAutoComment } from "../../hooks";
import { setEntityService } from "../../services/deskpro";
import { createTaskService } from "../../services/asana";
import { getEntityMetadata } from "../../utils";
import { useAsyncError } from "../../hooks";
import { getTaskValues } from "../../components/TaskForm";
import { CreateTask } from "../../components";
import type { FC } from "react";
import type { Maybe, TicketContext } from "../../types";
import type { FormValidationSchema } from "../../components/TaskForm";

const CreateTaskPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { addLinkComment } = useLinkedAutoComment();
  const { asyncErrorHandler } = useAsyncError();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const ticketId = get(context, ["data", "ticket", "id"]);

  const onNavigateToLinkTask = useCallback(() => navigate("/link"), [navigate]);

  const onSubmit = useCallback((values: FormValidationSchema) => {
    if (!client || !ticketId) {
      return Promise.resolve();
    }

    setError(null);

    return createTaskService(client, getTaskValues(values))
      .then(({ data: task }) => Promise.all([
        setEntityService(client, ticketId, task.gid, getEntityMetadata(task)),
        addLinkComment(task.gid),
      ]))
      .then(() => navigate("/home"))
      .catch((err) => {
        const errors = map(get(err, ["data", "errors"]), "message").filter(Boolean);

        if (size(errors)) {
          setError(errors);
        } else {
          asyncErrorHandler(err);
        }
      });
  }, [client, ticketId, asyncErrorHandler, navigate, addLinkComment]);

  useSetTitle("Link Tasks");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateTask
      onSubmit={onSubmit}
      error={error}
      onNavigateToLinkTask={onNavigateToLinkTask}
    />
  );
};

export { CreateTaskPage };
