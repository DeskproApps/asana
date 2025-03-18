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

  const isUsingOAuth2 = context?.settings.use_access_token !== true;

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();
    registerElement("refresh", { type: "refresh_button" });
    registerElement("plus", {
      type: "plus_button",
      payload: { type: "changePage", path: "/link" },
    });
    isUsingOAuth2 && registerElement('menuButton', {
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