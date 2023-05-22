import get from "lodash/get";
import { format } from "./date";
import { DATE_FORMAT, TIME_FORMAT } from "../constants";
import type { Task } from "../services/asana/types";

const getTaskDueDate = (task?: Task): string => {
  const dueOn = get(task, ["due_on"]);
  const dueAt = get(task, ["due_at"]);

  if (dueAt) {
    return format(dueAt, `${DATE_FORMAT} ${TIME_FORMAT}`);
  }

  if (dueOn) {
    return format(dueOn);
  }

  return "-";
};

export { getTaskDueDate };
