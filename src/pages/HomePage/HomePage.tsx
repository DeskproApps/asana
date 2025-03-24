import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproLatestAppContext
} from "@deskpro/app-sdk";
import { useSetTitle, useLinkedTasks, useSetBadgeCount } from "../../hooks";
import { Home } from "../../components";
import type { FC } from "react";
import type { Task } from "../../services/asana/types";
import { Settings } from '../../types';

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { isLoading, tasks } = useLinkedTasks();
  const { context } = useDeskproLatestAppContext<unknown, Settings>();

  const onNavigateToTask = useCallback((taskId: Task["gid"]) => {
    navigate(`/view/${taskId}`);
  }, [navigate]);

  useSetTitle("Asana");
  useSetBadgeCount(tasks);

  const isUsingOAuth = context?.settings.use_access_token === false || context?.settings.use_advanced_connect === false;

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/link" },
    });
    isUsingOAuth && registerElement('menuButton', {
      type: 'menu',
      items: [
        {
          title: 'Log Out',
          payload: {
            type: 'logOut'
          }
        }
      ]
    });
  }, [isUsingOAuth]);

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