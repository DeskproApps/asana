import { useCallback } from "react";
import noop from "lodash/noop";
import { useParams, useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useTask } from "./hooks";
import { queryClient } from "../../query";
import { updateTaskService } from "../../services/asana";
import { ViewTask } from "../../components";
import type { FC } from "react";
import type { Task } from "../../services/asana/types";

const ViewTaskPage: FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { client } = useDeskproAppClient();
  const { isLoading, task, subTasks, comments, attachments } = useTask(taskId);

  const onCompleteSubtask = useCallback((subtaskId: Task["gid"], completed: boolean) => {
    if (!client) {
      return Promise.resolve();
    }

    return updateTaskService(client, subtaskId, { completed })
      .then(() => queryClient.invalidateQueries())
      .catch(noop);
  }, [client]);

  const onNavigateToAddComment = useCallback(() => {
    navigate(`/view/${taskId}/comments/new`);
  }, [navigate, taskId]);

  useSetTitle("Asana");

  useDeskproElements(({ clearElements, registerElement }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
    registerElement("edit", {
      type: "edit_button",
      payload: { type: "changePage", path: `/edit/${taskId}` }
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink task",
        payload: { type: "unlink", taskId },
      }],
    });
  }, [taskId]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <ViewTask
      task={task as Task}
      subTasks={subTasks}
      comments={comments}
      attachments={attachments}
      onCompleteSubtask={onCompleteSubtask}
      onNavigateToAddComment={onNavigateToAddComment}
    />
  );
};

export { ViewTaskPage };
