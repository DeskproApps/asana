import get from "lodash/get";
import size from "lodash/size";
import type { Task } from "../services/asana/types";

const getProjectName = (task: Task): string => {
  const projects = get(task, ["projects"]);

  if (!Array.isArray(projects)) {
    return "-";
  }

  if (!size(projects)) {
    return "-";
  }

  return projects
    .map(({ name }) => name)
    .filter((projectName) => Boolean(projectName))
    .join(", ");
};

export { getProjectName };
