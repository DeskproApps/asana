import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@deskpro/deskpro-ui";
import { P5, Stack } from "@deskpro/app-sdk";
import type { FC } from "react";
import type { AvatarProps, ImageAvatarProps, AnyIcon } from "@deskpro/deskpro-ui";
import type { Maybe } from "../../../types";

type Props = {
  name: AvatarProps["name"],
  icon?: AvatarProps["backupIcon"],
  avatarUrl?: Maybe<ImageAvatarProps["imageUrl"]>,
};

const Member: FC<Props> = ({ name, icon, avatarUrl }) => (
  <Stack gap={6}>
    <Avatar
      size={18}
      name={name}
      backupIcon={icon || faUser as AnyIcon}
      {...(avatarUrl ? { imageUrl: avatarUrl } : {})}
    />
    <P5>{name}</P5>
  </Stack>
);

export { Member };
