import { baseRequest } from "./baseRequest";
import { TASK_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Dict } from "../../types";
import type { Task } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createTaskService = (client: IDeskproClient, data: Dict<any>) => {
  return baseRequest<Task>(client, {
    url: `/tasks`,
    method: "POST",
    queryParams: {
      opt_fields: TASK_FIELDS.join(","),
    },
    data: { data },
  });
};

export { createTaskService };
