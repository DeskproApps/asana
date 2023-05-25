import size from "lodash/size";
import { Stack } from "@deskpro/deskpro-ui";
import { Button } from "../common";
import type { FC } from "react";
import type { Task } from "../../services/asana/types";

type Props = {
  selectedTasks: Task[],
  isSubmitting: boolean,
  onLinkTasks: () => void,
  onCancel: () => void,
};

const Buttons: FC<Props> = ({ isSubmitting, selectedTasks, onLinkTasks, onCancel }) => (
  <Stack justify="space-between" style={{ paddingBottom: "4px" }}>
    <Button
      type="button"
      text="Link Issue"
      disabled={!size(selectedTasks) || isSubmitting}
      loading={isSubmitting}
      onClick={onLinkTasks}
    />
    <Button
      text="Cancel"
      intent="secondary"
      onClick={onCancel}
    />
  </Stack>
);

export { Buttons };
