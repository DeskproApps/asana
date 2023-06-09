import { useMemo } from "react";
import get from "lodash/get";
import size from "lodash/size";
import replace from "lodash/fp/replace";
import flow from "lodash/fp/flow";
import { P5, Stack } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { getProjectName, getTaskDueDate, addBlankTargetToLinks } from "../../../utils";
import {
  Tag,
  Status,
  Member,
  Property,
  AsanaLogo,
  Container,
} from "../../common";
import type { FC } from "react";
import type { Task } from "../../../services/asana/types";

type Props = {
  task: Task;
};

const Details: FC<Props> = ({ task }) => {
  const tags = useMemo(() => (get(task, ["tags"], []) || []), [task]);
  const description = flow(
    replace("<body>", ""),
    replace("</body>", ""),
  )(get(task, ["html_notes"]));

  return (
    <>
      <Container>
        <Title
          title={get(task, ["name"], "-")}
          icon={<AsanaLogo />}
          link={get(task, ["permalink_url"], "#")}
        />
        <Property
          label="Proect"
          text={getProjectName(task)}
        />
        <Property
          label="Assignee"
          text={get(task, ["assignee"], "-") && (
            <Member
              name={get(task, ["assignee", "name"], "")}
              avatarUrl={get(task, ["assignee", "photo", "image_60x60"], "")}
            />
          )}
        />
        <Property
          label="Description"
          text={(
            <P5
              dangerouslySetInnerHTML={{ __html: addBlankTargetToLinks(description) || "-" }}
              style={{ whiteSpace: "pre-wrap" }}
            />
          )}
        />
        <Property
          label="Status"
          text={(
            <Status status={get(task, ["completed"]) ? "completed" : "not_completed"} />
          )}
        />
        <Property
          label="Created at"
          text={format(get(task, ["created_at"]))}
        />
        <Property
          label="Due date"
          text={getTaskDueDate(task)}
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
      </Container>
      <HorizontalDivider />
    </>
  );
};

export { Details };
