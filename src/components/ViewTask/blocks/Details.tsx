import { useMemo } from "react";
import get from "lodash/get";
import size from "lodash/size";
import replace from "lodash/fp/replace";
import flow from "lodash/fp/flow";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { Stack, AttachmentTag } from "@deskpro/deskpro-ui";
import { Title, HorizontalDivider, Property, Member } from "@deskpro/app-sdk";
import { format } from "../../../utils/date";
import { getProjectName, getTaskDueDate } from "../../../utils";
import {
  Tag,
  Status,
  AsanaLogo,
  Container,
  DPNormalize,
} from "../../common";
import type { FC } from "react";
import type { AnyIcon } from "@deskpro/deskpro-ui";
import type { Task, Attachment } from "../../../services/asana/types";

type Props = {
  task: Task,
  attachments: Attachment[],
};

const Details: FC<Props> = ({ task, attachments }) => {
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
          label="Workspace"
          text={get(task, ["workspace", "name"], "-")}
        />
        <Property
          label="Projects"
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
            <DPNormalize text={description}/>
          )}
        />
        <Property
          label="Attachments"
          text={!size(attachments)
            ? "-"
            : (
              <Stack gap={6} wrap="wrap">
                {attachments.map((attach) => (
                  <AttachmentTag
                    key={attach.gid}
                    href={attach.download_url}
                    filename={attach.name}
                    fileSize={attach.size}
                    icon={faFile as AnyIcon}
                  />
                ))}
              </Stack>
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
            <Stack gap={6} wrap="wrap">
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
