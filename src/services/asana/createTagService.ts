import { baseRequest } from "./baseRequest";
import { TAG_FIElDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Tag, Workspace } from "./types";

const createTagService = (
  client: IDeskproClient,
  workspaceId: Workspace["gid"],
  tag: Tag
) => {
  return baseRequest<Tag>(client, {
    url: "/tags",
    method: "POST",
    queryParams: {
      opt_fields: TAG_FIElDS.join(","),
    },
    data: {
      data: { workspace: workspaceId, ...tag },
    },
  });
};

export { createTagService };
