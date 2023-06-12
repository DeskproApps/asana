import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";

/**
 * @param client {object}
 * @param data {FormData} - with structure { resource_subtype: "asana", file: File, parent: number }
 */
const uploadTaskAttachmentService = (client: IDeskproClient, data: FormData) => {
  return baseRequest(client, {
    url: `/attachments`,
    method: "POST",
    data,
  });
};

export { uploadTaskAttachmentService };
