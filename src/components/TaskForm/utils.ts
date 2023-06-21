import map from "lodash/map";
import get from "lodash/get";
import size from "lodash/size";
import difference from "lodash/difference";
import parse from "date-fns/parse";
import { z } from "zod";
import { getOption } from "../../utils";
import { format } from "../../utils/date";
import { DATE_ON_FORMAT } from "../../constants";
import type { DateOn } from "../../types";
import type {Project, Task} from "../../services/asana/types";
import type { FormValidationSchema, TaskValues } from "./types";

const validationSchema = z.object({
  workspace: z.string().nonempty(),
  projects: z.array(z.string()),
  name: z.string().nonempty(),
  description: z.string().optional(),
  status: z.string().nonempty(),
  assignee: z.string().optional(),
  dueDate: z.date().optional(),
  tags: z.array(z.string()),
});

const getInitValues = (task?: Task): FormValidationSchema => {
  const projects = get(task, ["projects"], []) || [];
  const dueDate = get(task, ["due_on"], null);

  return {
    workspace: get(task, ["workspace", "gid"], ""),
    projects: map(projects, "gid"),
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
  const projects = get(values, ["projects"]);

  return {
    workspace: values.workspace,
    ...((isEditMode || !projects) ? {} : { projects }),
    name: values.name,
    completed: values.status === "completed",
    ...(!description ? {} : { notes: description }),
    ...(!assignee ? {} : { assignee }),
    ...(!dueDate ? {} : { due_on: format(dueDate, DATE_ON_FORMAT) }),
    ...((isEditMode || !size(values.tags)) ? {} : { tags: values.tags }),
  };
};

const getProjectsToUpdate = (task: Task, values: FormValidationSchema): {
  addProjects: Array<Project["gid"]>,
  removeProjects: Array<Project["gid"]>,
} => {
  const oldProjects = map(get(task, ["projects"], []) || [], "gid");
  const updateProjects = get(values, ["projects"], []) || [];

  return {
    addProjects: difference(updateProjects, oldProjects),
    removeProjects: difference(oldProjects, updateProjects),
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
  getProjectsToUpdate,
};
