import { useParams } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useTask } from "./hooks";
import { ViewTask } from "../../components";
import type { FC } from "react";
import type { Task } from "../../services/asana/types";

const ViewTaskPage: FC = () => {
  const { taskId } = useParams();
  const { isLoading, task, subTasks, comments } = useTask(taskId);

  useSetTitle("Asana");

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
      <LoadingSpinner/>
    );
  }

  return (
    <ViewTask
      task={task as Task}
      subTasks={subTasks}
      comments={comments}
    />
  );
};

export { ViewTaskPage };
