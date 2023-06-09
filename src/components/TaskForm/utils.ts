import map from "lodash/map";
import get from "lodash/get";
import size from "lodash/size";
import parse from "date-fns/parse";
import { z } from "zod";
import { getOption } from "../../utils";
import { format } from "../../utils/date";
import { DATE_ON_FORMAT } from "../../constants";
import type { DateOn } from "../../types";
import type { Task } from "../../services/asana/types";
import type { FormValidationSchema, TaskValues } from "./types";

const validationSchema = z.object({
  workspace: z.string().nonempty(),
  project: z.string().optional(),
  name: z.string().nonempty(),
  description: z.string().optional(),
  status: z.string().nonempty(),
  assignee: z.string().optional(),
  dueDate: z.date().optional(),
  tags: z.array(z.string()),
});

const getInitValues = (task?: Task): FormValidationSchema => {
  const dueDate = get(task, ["due_on"], null);

  return {
    workspace: get(task, ["workspace", "gid"], ""),
    project: get(task, ["projects", 0, "gid"], ""),
    name: get(task, ["name"], ""),
    description: get(task, ["notes"], ""),
    status: get(task, ["completed"]) ? "completed" : "not_completed",
    assignee: get(task, ["assignee", "gid"], ""),
    dueDate: !dueDate ? undefined : parse(dueDate as DateOn, DATE_ON_FORMAT, new Date()),
    tags: map(get(task, ["tags"], []), "gid"),
  };
};

const getTaskValues = (values: FormValidationSchema, isEditMode?: boolean): TaskValues => {
  const description = get(values, ["description"], "");
  const assignee = get(values, ["assignee"]);
  const dueDate = get(values, ["dueDate"]);
  const project = get(values, ["project"]);

  return {
    workspace: values.workspace,
    ...((isEditMode || !project) ? {} : { projects: [project] }),
    name: values.name,
    completed: values.status === "completed",
    ...(!description ? {} : { notes: description }),
    ...(!assignee ? {} : { assignee }),
    ...(!dueDate ? {} : { due_on: format(dueDate, DATE_ON_FORMAT) }),
    ...((isEditMode || !size(values.tags)) ? {} : { tags: values.tags }),
  };
};

const getStatusOptions = () => [
  getOption("completed", "Completed"),
  getOption("not_completed", "Not completed"),
];

export {
  getInitValues,
  getTaskValues,
  validationSchema,
  getStatusOptions,
};
