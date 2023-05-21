import { Label, Select } from "../common";
import type { FC } from "react";
import type { Option, Maybe } from "../../types";
import type { Project as ProjectType } from "../../services/asana/types";

type Props = {
  value: Maybe<ProjectType["gid"]>,
  options: Array<Option<ProjectType["gid"]>>,
  onChange: (projectId: Option<ProjectType["gid"]>) => void,
};

const Project: FC<Props> = ({
  value,
  onChange,
  options,
}) => {
  return (
    <Label label="Project">
      <Select
        id="project"
        value={value}
        showInternalSearch
        onChange={onChange}
        options={options}
        noFoundText="No project(s) found"
      />
    </Label>
  );
};

export { Project };
