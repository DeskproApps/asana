import { match } from "ts-pattern";
import { Tag as TagUI } from "@deskpro/deskpro-ui";
import { useDeskproAppTheme } from "@deskpro/app-sdk";
import type { FC } from "react";

type Props = {
  name: string,
  color:
    | "dark-red"
    | "dark-orange"
    | "light-orange"
    | "dark-brown"
    | "light-green"
    | "dark-green"
    | "light-teal"
    | "dark-teal"
    | "light-blue"
    | "dark-purple"
    | "light-purple"
    | "light-pink"
    | "dark-pink"
    | "light-red"
    | "light-warm-gray"
  ,
};

const Tag: FC<Props> = ({ color, name }) => {
  const { theme } = useDeskproAppTheme();

  const tagColors = match(color)
    .with("dark-red", () => theme.standardLabelColors.red)
    .with("dark-orange", () => theme.standardLabelColors.orange)
    .with("light-orange", () => theme.standardLabelColors.ochre)
    .with("dark-brown", () => theme.standardLabelColors.yellow)
    .with("light-green", () => theme.standardLabelColors.lime)
    .with("dark-green", () => theme.standardLabelColors.green)
    .with("light-teal", () => theme.standardLabelColors.turquoise)
    .with("dark-teal", () => theme.standardLabelColors.sky_blue)
    .with("light-blue", () => theme.standardLabelColors.cyan)
    .with("dark-purple", () => theme.standardLabelColors.violet)
    .with("light-purple", () => theme.standardLabelColors.purple)
    .with("light-pink", () => theme.standardLabelColors.magenta)
    .with("dark-pink", () => theme.standardLabelColors.rose_dawn)
    .with("light-red", () => theme.standardLabelColors.pink)
    .with("light-warm-gray", () => theme.standardLabelColors.grey_black)
    .otherwise(() => theme.standardLabelColors.grey);

  return (
    <TagUI label={name} color={tagColors} />
  );
};

export { Tag };
