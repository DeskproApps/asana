import { baseRequest } from "./baseRequest";
import { ATTACHMENT_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Attachment } from "./types";

const getTaskAttachmentsService = (
  client: IDeskproClient,
  taskId: Task["gid"],
) => {
  return baseRequest<Attachment[]>(client, {
    url: "/attachments",
    queryParams: {
      limit: "100",
      parent: taskId,
      opt_fields: ATTACHMENT_FIELDS.join(","),
    },
  });
};

export { getTaskAttachmentsService };
