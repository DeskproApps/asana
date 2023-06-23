import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import get from "lodash/get";
import map from "lodash/map";
import size from "lodash/size";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useSetTitle, useAsyncError } from "../../hooks";
import { useTaskDeps } from "./hooks";
import { setEntityService } from "../../services/deskpro";
import {
  updateTaskService,
  updateTaskTagsService,
  updateTaskProjectsService,
} from "../../services/asana";
import { getEntityMetadata } from "../../utils";
import { getTaskValues, getProjectsToUpdate, getTagsToUpdate, } from "../../components/TaskForm";
import { EditTask } from "../../components";
import type { FC } from "react";
import type { Maybe, TicketContext } from "../../types";
import type { FormValidationSchema } from "../../components/TaskForm";

const EditTaskPage: FC = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { asyncErrorHandler } = useAsyncError();
  const { isLoading, task } = useTaskDeps(taskId);
  const [error, setError] = useState<Maybe<string|string[]>>(null);

  const ticketId = get(context, ["data", "ticket", "id"]);

  const onCancel = useCallback(() => {
    if (!taskId) {
      return;
    }

    navigate(`/view/${taskId}`)
  }, [navigate, taskId]);

  const onSubmit = useCallback((values: FormValidationSchema) => {
    if (!client || !taskId || !ticketId) {
      return Promise.resolve();
    }

    setError(null);

    return updateTaskService(client, taskId, getTaskValues(values, true))
      .then(({ data: task }) => Promise.all([
        setEntityService(client, ticketId, task.gid, getEntityMetadata(task)),
        ...updateTaskTagsService(client, taskId, getTagsToUpdate(task, values)),
        ...updateTaskProjectsService(client, taskId, getProjectsToUpdate(task, values)),
      ]))
      .then(() => navigate(`/view/${taskId}`))
      .catch((err) => {
        const errors = map(get(err, ["data", "errors"]), "message").filter(Boolean);

        if (size(errors)) {
          setError(errors);
        } else {
          asyncErrorHandler(err);
        }
      });
  }, [client, taskId, navigate, asyncErrorHandler, ticketId]);

  useSetTitle("Edit Task");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <EditTask
      error={error}
      onSubmit={onSubmit}
      onCancel={onCancel}
      task={task}
    />
  );
};

export { EditTaskPage };
