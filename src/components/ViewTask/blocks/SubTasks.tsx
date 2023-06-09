import { useCallback } from "react";
import size from "lodash/size";
import { Stack, Checkbox } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NoFound } from "../../common";
import type { FC } from "react";
import type { Task } from "../../../services/asana/types";

type Props = {
  subTasks: Task[],
  onCompleteSubtask: (subtaskId: Task["gid"], completed: boolean) => Promise<void>,
};

type SubtaskProps =
  & Pick<Task, "gid"|"name"|"completed">
  & Pick<Props, "onCompleteSubtask">;

const Subtask: FC<SubtaskProps> = ({ gid, name, completed, onCompleteSubtask }) => {
  const onChange = useCallback(() => {
    onCompleteSubtask(gid, !completed);
  }, [gid, completed, onCompleteSubtask])

  return (
    <Checkbox
      id={gid}
      key={gid}
      size={14}
      label={name}
      containerStyle={{ alignSelf: "start", marginTop: 3, marginRight: 4 }}
      checked={completed}
      onChange={onChange}
    />
  );
};

const SubTasks: FC<Props> = ({ subTasks, onCompleteSubtask }) => {
  return (
    <>
      <Container>
        <Title title="Subtasks"/>

        <Stack vertical gap={10}>
          {(!Array.isArray(subTasks) || !size(subTasks))
            ? <NoFound text="No subtasks found"/>
            : subTasks.map((subTask) => (
              <Subtask
                key={subTask.gid}
                onCompleteSubtask={onCompleteSubtask}
                {...subTask}
              />
            ))
          }
        </Stack>
      </Container>
      <HorizontalDivider/>
    </>
  );
};

export { SubTasks };
