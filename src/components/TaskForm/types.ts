import { z } from "zod";
import { validationSchema } from "./utils";
import type { Maybe } from "../../types";
import type { Task, Workspace, Project } from "../../services/asana/types";

export type FormValidationSchema = z.infer<typeof validationSchema>;

export type TaskValues = {
  name: Task["name"],
  workspace: Workspace["gid"]
  projects: Array<Project["gid"]>,
  completed: Task["completed"],
  notes?: Task["notes"],
  assignee?: Task["assignee"]["gid"],
  due_on?: Task["due_on"],
};

export type Props = {
  onSubmit: (data: FormValidationSchema) => Promise<void>,
  onCancel?: () => void,
  isEditMode?: boolean,
  task?: Task,
  error?: Maybe<string|string[]>,
};
