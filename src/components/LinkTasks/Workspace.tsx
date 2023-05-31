import { Label, Select } from "../common";
import type { FC } from "react";
import type { Option, Maybe } from "../../types";
import type { Workspace } from "../../services/asana/types";

type Props = {
  value: Maybe<Workspace["gid"]>,
  options: Array<Option<Workspace["gid"]>>,
  onChange: (workspaceId: Option<Workspace["gid"]>) => void,
};

const Workspaces: FC<Props> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <Label label="Workspace" required>
      <Select<Workspace["gid"]>
        id="workspace"
        value={value}
        showInternalSearch
        onChange={onChange}
        options={options}
        noFoundText="No workspace(s) found"
      />
    </Label>
  );
};

export { Workspaces };
