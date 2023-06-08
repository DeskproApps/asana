import { HorizontalDivider } from "@deskpro/app-sdk";
import { getOption } from "../../utils";
import {
  Search,
  Container,
  Navigation,
} from "../common";
import { Workspaces } from "./Workspace";
import { Project } from "./Project";
import { Buttons } from "./Buttons";
import { Tasks } from "./Tasks";
import type { FC, Dispatch } from "react";
import type { Maybe } from "../../types";
import type { Props as SearchProps } from "../../components/common/Search";
import type { Workspace, Project as ProjectType, Task } from "../../services/asana/types";

type Props = {
  tasks: Task[],
  search: SearchProps["value"],
  onChangeSearch: SearchProps["onChange"],
  onClearSearch: SearchProps["onClear"],
  workspaces: Workspace[],
  selectedWorkspaceId: Maybe<Workspace["gid"]>,
  onChangeWorkspace: Dispatch<Workspace["gid"]>,
  projects: ProjectType[],
  selectedProjectId: Maybe<ProjectType["gid"]>,
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
  search,
  projects,
  onCancel,
  isLoading,
  workspaces,
  onLinkTasks,
  isSubmitting,
  onClearSearch,
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
        <Search
          value={search}
          onChange={onChangeSearch}
          onClear={onClearSearch}
        />
        <Workspaces
          value={selectedWorkspaceId}
          options={workspaces.map(({ gid, name }) => getOption(gid, name))}
          onChange={(o)=> onChangeWorkspace(o.value)}
        />
        <Project
          value={selectedProjectId}
          options={projects.map(({ gid, name }) => getOption(gid, name))}
          onChange={(o) => onChangeProject(o.value)}
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
