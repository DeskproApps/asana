import { Search, HorizontalDivider } from "@deskpro/app-sdk";
import { getOption } from "../../utils";
import { Container, Navigation } from "../common";
import { Workspaces } from "./Workspace";
import { Project } from "./Project";
import { Buttons } from "./Buttons";
import { Tasks } from "./Tasks";
import type { FC, Dispatch } from "react";
import type { Workspace, Project as ProjectType, Task } from "../../services/asana/types";

type Props = {
  tasks: Task[],
  onChangeSearch: (q: string) => void,
  workspaces: Workspace[],
  selectedWorkspaceId: Workspace["gid"],
  onChangeWorkspace: Dispatch<Workspace["gid"]>,
  projects: ProjectType[],
  selectedProjectId: ProjectType["gid"],
  onChangeProject: Dispatch<ProjectType["gid"]>,
  onCancel: () => void,
  selectedTasks: Task[],
  onChangeSelectedTask: (task: Task) => void,
  isSubmitting: boolean,
  onLinkTasks: () => void,
  isLoading: boolean,
  onNavigateToCreateTask: () => void,
};

const LinkTasks: FC<Props> = ({
  tasks,
  onCancel,
  projects,
  isLoading,
  workspaces,
  onLinkTasks,
  isSubmitting,
  selectedTasks,
  onChangeSearch,
  onChangeProject,
  onChangeWorkspace,
  selectedProjectId,
  selectedWorkspaceId,
  onChangeSelectedTask,
  onNavigateToCreateTask,
}) => {
  return (
    <>
      <Container>
        <Navigation selected="one" onTwoNavigate={onNavigateToCreateTask}/>
        <Search onChange={onChangeSearch} />
        <Workspaces
          value={selectedWorkspaceId}
          options={workspaces.map(({ gid, name }) => getOption(gid, name))}
          onChange={onChangeWorkspace}
        />
        <Project
          value={selectedProjectId}
          options={projects.map(({ gid, name }) => getOption(gid, name))}
          onChange={onChangeProject}
        />
        <Buttons
          onCancel={onCancel}
          onLinkTasks={onLinkTasks}
          isSubmitting={isSubmitting}
          selectedTasks={selectedTasks}
        />
      </Container>
      <HorizontalDivider />
      <Container>
        <Tasks
          tasks={tasks}
          isLoading={isLoading}
          selectedTasks={selectedTasks}
          onChangeSelectedTask={onChangeSelectedTask}
        />
      </Container>
    </>
  );
};

export { LinkTasks };
