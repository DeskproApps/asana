import { Select } from "@deskpro/app-sdk";
import { Label } from "../common";
import type { FC } from "react";
import type { Option } from "../../types";
import type { Project as ProjectType } from "../../services/asana/types";

type Props = {
  value: ProjectType["gid"],
  options: Array<Option<ProjectType["gid"]>>,
  onChange: (projectId: ProjectType["gid"]) => void,
};

const Project: FC<Props> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <Label label="Project" required>
      <Select
        id="project"
        value={value}
        showInternalSearch
        onChange={onChange as () => void}
        options={options}
      />
    </Label>
  );
};

export { Project };
