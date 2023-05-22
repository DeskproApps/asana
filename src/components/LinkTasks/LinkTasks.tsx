import size from "lodash/size";
import { Stack } from "@deskpro/deskpro-ui";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { getOption } from "../../utils";
import {
  Search,
  Button,
  Container,
} from "../common";
import { Workspaces } from "./Workspace";
import { Project } from "./Project";
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
}) => {
  return (
    <>
      <Container>
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
        <Stack justify="space-between" style={{ paddingBottom: "4px" }}>
          <Button
            type="button"
            text="Link Issue"
            disabled={!size(selectedTasks) || isSubmitting}
            loading={isSubmitting}
            onClick={onLinkTasks}
          />
          <Button
            text="Cancel"
            intent="secondary"
            onClick={onCancel}
          />
        </Stack>
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
