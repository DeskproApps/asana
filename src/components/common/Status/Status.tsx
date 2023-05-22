import { match } from "ts-pattern";
import { Pill } from "@deskpro/deskpro-ui";
import { useDeskproAppTheme } from "@deskpro/app-sdk";
import type { FC } from "react";

type Props = {
  status?: "completed"|"not_completed",
};

const Status: FC<Props> = ({ status }) => {
  const { theme } = useDeskproAppTheme();
  const options = match(status)
    .with("completed", () => ({
      label: "Completed",
      bg: theme.colors.green100,
    }))
    .with("not_completed", () => ({
      label: "Not completed",
      bg: theme.colors.yellow100,
    }))
    .otherwise(() => null)

  return !options
    ? (<>-</>)
    : (
      <Pill
        label={options.label}
        textColor={theme.colors.white}
        backgroundColor={options.bg}
      />
    );
};

export { Status };
