import React from "react";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Avatar, TSpan, P11, Stack } from "@deskpro/deskpro-ui";
import { DPNormalize } from "../Typography";
import type { AnyIcon } from "@deskpro/deskpro-ui";
import type { FC } from "react";

const TimeAgo = styled(ReactTimeAgo)`
  color: ${({theme}) => theme.colors.grey80};
`;

const Author = styled(Stack)`
  width: 35px;
`;

const Body = styled(TSpan)`
  width: calc(100% - 35px);
`;

type Props = {
  date: Date,
  name: string,
  text: string,
  avatarUrl?: string,
};

const Comment: FC<Props> = ({ name, avatarUrl, text, date }) => {
  return (
    <Stack wrap="nowrap" gap={6} style={{ marginBottom: 10 }}>
      <Author vertical>
        <Avatar
          size={18}
          name={name}
          backupIcon={faUser as AnyIcon}
          imageUrl={avatarUrl}
        />
        <P11>
          <TimeAgo date={date} timeStyle="mini"/>
        </P11>
      </Author>
      <Body type="p1">
        <DPNormalize text={text}/>
      </Body>
    </Stack>
  );
};

export { Comment };
