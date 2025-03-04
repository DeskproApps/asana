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
import {
  useSetTitle,
  useReplyBox,
  useAsyncError,
  useDeskproTag,
  useLinkedAutoComment,
} from "../../hooks";
import { searchTasks, getEntityMetadata } from "../../utils";
import { useTasks } from "./hooks";
import { LinkTasks } from "../../components";
import type { FC, ChangeEvent } from "react";
import type { Settings } from '../../types';
import type { Workspace, Project, Task } from "../../services/asana/types";

const LinkPage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<unknown, Settings>();
  const { addLinkComment } = useLinkedAutoComment();
  const { setSelectionState } = useReplyBox();
  const { addDeskproTag } = useDeskproTag();
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

  const onNavigateToCreateTask = useCallback(() => navigate("/create"), [navigate]);

  const onLinkTasks = useCallback(() => {
    if (!client || !size(selectedTasks) || !ticketId) {
      return;
    }

    setIsSubmitting(true);
    Promise.all([
      ...selectedTasks.map((task) => setEntityService(client, ticketId, task.gid, getEntityMetadata(task))),
      ...selectedTasks.map((task) => addLinkComment(task.gid)),
      ...selectedTasks.map((task) => addDeskproTag(task)),
      ...selectedTasks.map((task) => setSelectionState(task.gid, true, "email")),
      ...selectedTasks.map((task) => setSelectionState(task.gid, true, "note")),
    ])
      .then(() => {
        setIsSubmitting(false);
        navigate("/home")
      })
      .catch(asyncErrorHandler);
  }, [client, ticketId, selectedTasks, navigate, asyncErrorHandler, addLinkComment, setSelectionState, addDeskproTag]);

  useSetTitle("Link Tasks");

  const isUsingOAuth2 = context?.settings.use_access_token !== true;

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements();

    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
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
      tasks={searchTasks(search, tasks)}
      onCancel={onCancel}
      selectedTasks={selectedTasks}
      onChangeSelectedTask={onChangeSelectedTask}
      isSubmitting={isSubmitting}
      onLinkTasks={onLinkTasks}
      isLoading={isLoading}
      onNavigateToCreateTask={onNavigateToCreateTask}
    />
  );
};

export { LinkPage };