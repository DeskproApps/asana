import { Details, SubTasks, Comments } from "./blocks";
import type { FC } from "react";
import type { Task, Story } from "../../services/asana/types";

type Props = {
  task: Task;
  subTasks: Task[],
  comments: Story[],
  onCompleteSubtask: (subtaskId: Task["gid"], completed: boolean) => Promise<void>,
};

const ViewTask: FC<Props> = ({ task, subTasks, comments, onCompleteSubtask }) => {
  return (
    <>
      <Details task={task} />
      <SubTasks subTasks={subTasks} onCompleteSubtask={onCompleteSubtask} />
      <Comments comments={comments} />
    </>
  );
};

export { ViewTask };
