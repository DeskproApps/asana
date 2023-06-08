import { baseRequest } from "./baseRequest";
import { TAG_FIElDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Tag, Workspace } from "./types";

const getTagsService = (
  client: IDeskproClient,
  workspaceId: Workspace["gid"],
) => {
  return baseRequest<Tag[]>(client, {
    url: "/tags",
    queryParams: {
      limit: "100",
      workspace: workspaceId,
      opt_fields: TAG_FIElDS.join(","),
    },
  });
};

export { getTagsService };
