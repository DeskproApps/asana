import size from "lodash/size";
import { Stack, Checkbox } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NoFound } from "../../common";
import type { FC } from "react";
import type { Task } from "../../../services/asana/types";

type Props = {
  subTasks: Task[],
};

const SubTasks: FC<Props> = ({ subTasks }) => {
  return (
    <>
      <Container>
        <Title title="Subtasks"/>

        <Stack vertical gap={10}>
          {(!Array.isArray(subTasks) || !size(subTasks))
            ? <NoFound text="No subtasks found"/>
            : subTasks.map(({ gid, name, completed }) => (
              <Checkbox
                id={gid}
                key={gid}
                label={name}
                containerStyle={{ alignSelf: "start", marginTop: 3, marginRight: 4 }}
                checked={completed}
                disabled
                size={14}
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
