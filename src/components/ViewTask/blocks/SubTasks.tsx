import size from "lodash/size";
import { Stack } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NoFound, SubItem } from "../../common";
import type { FC } from "react";
import type { Task } from "../../../services/asana/types";

type Props = {
  subTasks: Task[],
  onCompleteSubtask: (subtaskId: Task["gid"], completed: boolean) => Promise<void>,
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
              <SubItem
                key={subTask.gid}
                item={subTask}
                onComplete={onCompleteSubtask}
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
