import { Fragment } from "react";
import size from "lodash/size";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { NoFound, Container } from "../common";
import { TaskItem } from "../TaskItem";
import type { FC } from "react";
import type { Task } from "../../services/asana/types";

type Props = {
  tasks: Task[],
  onNavigateToTask: (taskId: Task["gid"]) => void,
};

const Home: FC<Props> = ({ tasks, onNavigateToTask }) => {
  return (
    <Container>
      {!Array.isArray(tasks)
        ? <NoFound/>
        : !size(tasks)
        ? <NoFound text="No Asana tasks found"/>
        : tasks.map((task) => (
          <Fragment key={task.gid}>
            <TaskItem task={task} onNavigateToTask={onNavigateToTask}/>
            <HorizontalDivider style={{ marginTop: 10, marginBottom: 10 }}/>
          </Fragment>
        ))
      }
    </Container>
  );
};

export { Home };
