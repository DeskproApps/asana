import size from "lodash/size";
import { HorizontalDivider } from "@deskpro/app-sdk";
import { NoFound, Container } from "../common";
import { TaskItem } from "../TaskItem";
import type { FC } from "react";
import type { Task } from "../../services/asana/types";

type Props = {
  tasks: Task[],
};

const Home: FC<Props> = ({ tasks }) => {
  return (
    <Container>
      {!Array.isArray(tasks)
        ? <NoFound/>
        : !size(tasks)
        ? <NoFound text="No Asana tasks found"/>
        : tasks.map((task) => (
          <>
            <TaskItem key={task.gid} task={task} />
            <HorizontalDivider style={{ marginTop: 10, marginBottom: 10 }}/>
          </>
        ))
      }
    </Container>
  );
};

export { Home };
