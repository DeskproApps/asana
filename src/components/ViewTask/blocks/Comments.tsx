import get from "lodash/get";
import size from "lodash/size";
import { Title, HorizontalDivider } from "@deskpro/app-sdk";
import { Container, Comment } from "../../common";
import type { FC } from "react";
import type { Story } from "../../../services/asana/types";

type Props = {
  comments: Story[],
};

const Comments: FC<Props> = ({ comments }) => {
  return (
    <Container>
      <Title title={`Comments (${size(comments)})`}/>

      {comments.map(({ created_at, created_by, html_text, gid }) => (
        <Comment
          key={gid}
          name={created_by.name}
          date={new Date(created_at)}
          avatarUrl={get(created_by, ["photo", "image_60x60"])}
          text={html_text}
        />
      ))}
      <HorizontalDivider />
    </Container>
  );
};

export { Comments };
