import { Fragment } from "react";
import get from "lodash/get";
import size from "lodash/size";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { addBlankTargetToLinks } from "../../../utils";
import { Container, Comment } from "../../common";
import type { FC } from "react";
import type { Story } from "../../../services/asana/types";

type Props = {
  comments: Story[],
  onNavigateToAddComment: () => void,
};

const Comments: FC<Props> = ({ comments, onNavigateToAddComment }) => {
  return (
    <Container>
      <Title
        title={`Comments (${size(comments)})`}
        onClick={onNavigateToAddComment}
      />

      {comments.map(({ created_at, created_by, html_text, gid }) => (
        <Fragment key={gid}>
          <Comment
            name={created_by.name}
            date={new Date(created_at)}
            avatarUrl={get(created_by, ["photo", "image_60x60"])}
            text={addBlankTargetToLinks(html_text)}
          />
          <HorizontalDivider style={{ marginBottom: 10 }} />
        </Fragment>
      ))}
    </Container>
  );
};

export { Comments };
