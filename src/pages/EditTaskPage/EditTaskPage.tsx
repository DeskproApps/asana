import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import get from "lodash/get";
import map from "lodash/map";
import size from "lodash/size";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle, useAsyncError } from "../../hooks";
import { useTaskDeps } from "./hooks";
import { updateTaskService } from "../../services/asana";
import { getTaskValues } from "../../components/TaskForm";
import { EditTask } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/TaskForm";

const EditTaskPage: FC = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { asyncErrorHandler } = useAsyncError();
  const { isLoading, task } = useTaskDeps(taskId);
  const [error, setError] = useState<Maybe<string|string[]>>(null);

  const onCancel = useCallback(() => {
    if (!taskId) {
      return;
    }

    navigate(`/view/${taskId}`)
  }, [navigate, taskId]);

  const onSubmit = useCallback((values: FormValidationSchema) => {
    if (!client || !taskId) {
      return Promise.resolve();
    }

    setError(null);

    return updateTaskService(client, taskId, getTaskValues(values, true))
      .then(() => navigate(`/view/${taskId}`))
      .catch((err) => {
        const errors = map(get(err, ["data", "errors"]), "message").filter(Boolean);

        if (size(errors)) {
          setError(errors);
        } else {
          asyncErrorHandler(err);
        }
      });
  }, [client, taskId, navigate, asyncErrorHandler]);

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
