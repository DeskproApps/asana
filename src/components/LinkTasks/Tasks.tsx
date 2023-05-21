import { Fragment } from "react";
import size from "lodash/size";
import { Checkbox } from "@deskpro/deskpro-ui";
import { HorizontalDivider, LoadingSpinner } from "@deskpro/app-sdk";
import { NoFound, Card, CardBody, CardMedia } from "../common";
import { TaskItem } from "../TaskItem";
import type { Task } from "../../services/asana/types";

import type { FC } from "react";

type Props = {
  tasks: Task[],
  isLoading: boolean,
  selectedTasks: Task[],
  onChangeSelectedTask: (task: Task) => void,
};

const Tasks: FC<Props> = ({
  tasks,
  isLoading,
  selectedTasks,
  onChangeSelectedTask,
}) => {
  return isLoading
    ? (<LoadingSpinner/>)
    : (
      <>
        {!Array.isArray(tasks)
          ? <NoFound/>
          : !size(tasks)
          ? <NoFound text="No Asana tasks found"/>
          : tasks.map((task) => (
            <Fragment key={task.gid}>
              <Card>
                <CardMedia>
                  <Checkbox
                    size={12}
                    checked={selectedTasks.some(({ gid }) => task.gid === gid)}
                    onChange={() => onChangeSelectedTask(task)}
                    containerStyle={{ marginTop: 2 }}
                  />
                </CardMedia>
                <CardBody>
                  <TaskItem task={task} onClickTitle={() => onChangeSelectedTask(task)} />
                </CardBody>
              </Card>
              <HorizontalDivider style={{ marginBottom: 10 }} />
            </Fragment>
          ))
        }
      </>
    );
};

export { Tasks };
