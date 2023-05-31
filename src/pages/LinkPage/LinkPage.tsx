import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import get from "lodash/get";
import size from "lodash/size";
import cloneDeep from "lodash/cloneDeep";
import {
  useDeskproElements,
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { setEntityService } from "../../services/deskpro";
import { useSetTitle, useAsyncError } from "../../hooks";
import { useTasks } from "./hooks";
import { LinkTasks } from "../../components";
import type { FC, ChangeEvent } from "react";
import type { TicketContext } from "../../types";
import type { Workspace, Project, Task } from "../../services/asana/types";

const LinkPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { asyncErrorHandler } = useAsyncError();

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<Workspace["gid"]|null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<Project["gid"]|null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { isLoading, workspaces, projects, tasks } = useTasks(selectedWorkspaceId, selectedProjectId);

  const ticketId = get(context, ["data", "ticket", "id"]);

  const onChangeSearch = useCallback(({ target: { value: q }}: ChangeEvent<HTMLInputElement>) => {
    setSearch(q);
  }, []);

  const onClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  const onCancel = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onChangeSelectedTask = useCallback((task: Task) => {
    let newSelectedTasks = cloneDeep(selectedTasks);

    if (selectedTasks.some(({ gid }) => task.gid === gid)) {
      newSelectedTasks = selectedTasks.filter((selectedTask) => selectedTask.gid !== task.gid);
    } else {
      newSelectedTasks.push(task);
    }

    setSelectedTasks(newSelectedTasks);
  }, [selectedTasks]);

  const onLinkTasks = useCallback(() => {
    if (!client || !size(selectedTasks)) {
      return;
    }

    setIsSubmitting(true);
    Promise.all([
      ...selectedTasks.map((task) => {
        return setEntityService(client, ticketId, task.gid)
      }),
    ])
      .then(() => {
        setIsSubmitting(false);
        navigate("/home")
      })
      .catch(asyncErrorHandler);
  }, [client, ticketId, selectedTasks, navigate, asyncErrorHandler]);

  useSetTitle("Link Tasks");

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  // At the beginning, we choose the first workspace
  useEffect(() => {
    setSelectedWorkspaceId(get(workspaces, [0, "gid"], null));
    setSelectedProjectId(null);
  }, [workspaces]);

  // At the beginning, we choose the first project
  useEffect(() => {
    setSelectedProjectId(get(projects, [0, "gid"], null));
  }, [projects]);

  return (
    <LinkTasks
      search={search}
      onChangeSearch={onChangeSearch}
      onClearSearch={onClearSearch}
      workspaces={workspaces}
      selectedWorkspaceId={selectedWorkspaceId}
      onChangeWorkspace={setSelectedWorkspaceId}
      projects={projects}
      selectedProjectId={selectedProjectId}
      onChangeProject={setSelectedProjectId}
      tasks={tasks}
      onCancel={onCancel}
      selectedTasks={selectedTasks}
      onChangeSelectedTask={onChangeSelectedTask}
      isSubmitting={isSubmitting}
      onLinkTasks={onLinkTasks}
      isLoading={isLoading}
    />
  );
};

export { LinkPage };
