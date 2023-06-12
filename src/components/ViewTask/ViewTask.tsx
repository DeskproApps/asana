import { Details, SubTasks, Comments } from "./blocks";
import type { FC } from "react";
import type { Task, Story } from "../../services/asana/types";

type Props = {
  task: Task;
  subTasks: Task[],
  comments: Story[],
  onCompleteSubtask: (subtaskId: Task["gid"], completed: boolean) => Promise<void>,
  onNavigateToAddComment: () => void,
};

const ViewTask: FC<Props> = ({
  task,
  subTasks,
  comments,
  onCompleteSubtask,
  onNavigateToAddComment,
}) => {
  return (
    <>
      <Details task={task} />
      <SubTasks subTasks={subTasks} onCompleteSubtask={onCompleteSubtask} />
      <Comments comments={comments} onNavigateToAddComment={onNavigateToAddComment} />
    </>
  );
};

export { ViewTask };
