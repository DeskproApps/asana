import get from "lodash/get";
import size from "lodash/size";
import { z } from "zod";
import { getOption } from "../../utils";
import { format } from "../../utils/date";
import { DATE_ON_FORMAT } from "../../constants";
import type { FormValidationSchema, TaskValues } from "./types";

const validationSchema = z.object({
  workspace: z.string().nonempty(),
  project: z.string().nonempty(),
  name: z.string().nonempty(),
  description: z.string(),
  status: z.string().nonempty(),
  assignee: z.string(),
  dueDate: z.date().nullable(),
  tags: z.array(z.string()),
});

const getInitValues = () => {
  return {
    workspace: "",
    project: "",
    name: "",
    description: "",
    status: "not_completed",
    assignee: "",
    dueDate: null,
    tags: [],
  };
};

const getTaskValues = (values: FormValidationSchema): TaskValues => {
  const description = get(values, ["description"], "");
  const assignee = get(values, ["assignee"]);
  const dueDate = get(values, ["dueDate"]);

  return {
    workspace: values.workspace,
    projects: [values.project],
    name: values.name,
    completed: values.status === "completed",
    ...(!description ? {} : { notes: description }),
    ...(!assignee ? {} : { assignee }),
    ...(!dueDate ? {} : { due_on: format(dueDate, DATE_ON_FORMAT) }),
    ...(!size(values.tags) ? {} : { tags: values.tags }),
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
