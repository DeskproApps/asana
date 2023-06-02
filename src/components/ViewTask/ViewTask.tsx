import { Details, SubTasks, Comments } from "./blocks";
import type { FC } from "react";
import type { Task, Story } from "../../services/asana/types";

type Props = {
  task: Task;
  subTasks: Task[],
  comments: Story[],
};

const ViewTask: FC<Props> = ({ task, subTasks, comments }) => {
  return (
    <>
      <Details task={task} />
      <SubTasks subTasks={subTasks} />
      <Comments comments={comments} />
    </>
  );
};

export { ViewTask };
