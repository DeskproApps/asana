import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
} from "@deskpro/app-sdk";
import { useSetTitle, useSetBadgeCount } from "../../hooks";
import { useTasks } from "./hooks";
import { Home } from "../../components";
import type { FC } from "react";
import type { Task } from "../../services/asana/types";

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { isLoading, tasks } = useTasks();

  const onNavigateToTask = useCallback((taskId: Task["gid"]) => {
    navigate(`/view/${taskId}`);
  }, [navigate]);

  useSetTitle("Asana");
  useSetBadgeCount(tasks);

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/link" },
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home
      tasks={tasks}
      onNavigateToTask={onNavigateToTask}
    />
  );
};

export { HomePage };
