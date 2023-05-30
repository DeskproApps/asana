import { useCallback, useMemo } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { Stack } from "@deskpro/deskpro-ui";
import { Title,  } from "@deskpro/app-sdk";
import { getTaskDueDate, getProjectName } from "../../utils";
import {
  Tag,
  Link,
  Member,
  Status,
  Property,
  AsanaLogo,
  TwoProperties,
  DeskproTickets,
} from "../common";
import type { FC, MouseEvent } from "react";
import type { Task } from "../../services/asana/types";

type Props = {
  task: Task,
  onNavigateToTask?: (taskId: Task["gid"]) => void,
};

const TaskItem: FC<Props> = ({ task, onNavigateToTask }) => {
  const taskName = useMemo(() => get(task, ["name"], "-"), [task]);
  const tags = useMemo(() => (get(task, ["tags"], []) || []), [task]);

  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onNavigateToTask && onNavigateToTask(task.gid);
  }, [onNavigateToTask, task]);

  return (
    <>
      <Title
        title={!onNavigateToTask
          ? taskName
          : (<Link href="#" onClick={onClick}>{taskName}</Link>)
        }
        icon={<AsanaLogo/>}
        link={get(task, ["permalink_url"], "#")}
      />
      <TwoProperties
        leftLabel="Project"
        leftText={getProjectName(task)}
        rightLabel="Due Date"
        rightText={getTaskDueDate(task)}
      />
      <TwoProperties
        leftLabel="Assignee"
        leftText={get(task, ["assignee"]) && (
          <Member
            name={get(task, ["assignee", "name"], "")}
            avatarUrl={get(task, ["assignee", "photo", "image_60x60"], "")}
          />
        )}
        rightLabel="Status"
        rightText={(
          <Status status={get(task, ["completed"]) ? "completed" : "not_completed"} />
        )}
      />
      <Property
        label="Deskpro Tickets"
        text={<DeskproTickets entityId={get(task, ["gid"], "")} />}
      />
      <Property
        label="Tags"
        text={(
          <Stack gap={6}>
            {!size(tags) ? "-" : tags.map((tag) => (
              <Tag key={tag.gid} {...tag} />
            ))}
          </Stack>
        )}
      />
    </>
  );
};

export { TaskItem };
