import { Select } from "@deskpro/app-sdk";
import { Label } from "../common";
import type { FC } from "react";
import type { Option } from "../../types";
import type { Workspace } from "../../services/asana/types";

type Props = {
  value: Workspace["gid"],
  options: Array<Option<Workspace["gid"]>>,
  onChange: (workspaceId: Workspace["gid"]) => void,
};

const Workspaces: FC<Props> = ({ value, onChange, options }) => {
  return (
    <Label label="Workspace" required>
      <Select<Workspace["gid"]>
        id="workspace"
        value={value}
        showInternalSearch
        onChange={onChange as () => void}
        options={options}
      />
    </Label>
  );
};

export { Workspaces };
