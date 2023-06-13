import { z } from "zod";
import get from "lodash/get";
import { noEmptyFormValidator } from "./validators";
import type { FormValidationSchema, CommentValues } from "./types";
import type { Task } from "../../services/asana/types";

const validationSchema = z.object({
  comment: z.string(),
  attachments: z.array(z.any()),
})
  .refine(noEmptyFormValidator, {
    message: "Empty form",
    path: ["root"],
  });

const getInitValues = () => ({
  comment: "",
  attachments: [],
});

const getValues = (data: FormValidationSchema): CommentValues => ({
  text: get(data, ["comment"], ""),
});

const getAttachments = (
  data: FormValidationSchema,
): FormValidationSchema["attachments"] => {
  return get(data, ["attachments"], []) || [];
};

const getAttachFormData = (taskId: Task["gid"], file: File): FormData => {
  const form = new FormData();

  form.append("file", file);
  form.append("resource_subtype", "asana");
  form.append("parent", taskId);

  return form;
};

export {
  getValues,
  getInitValues,
  getAttachments,
  validationSchema,
  getAttachFormData,
};
