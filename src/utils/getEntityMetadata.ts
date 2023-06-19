import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import type { Task } from "../services/asana/types";
import type { EntityMetadata } from "../types";

const getEntityMetadata = (task?: Task): undefined|EntityMetadata => {
  if (isEmpty(task)) {
    return;
  }

  return {
    id: get(task, ["gid"], ""),
    name: get(task, ["name"], ""),
    workspace: get(task, ["workspace", "name"], ""),
    projects: (get(task, ["projects"], []) || []).map(({ name }) => name).join(", "),
  };
};

export { getEntityMetadata };
