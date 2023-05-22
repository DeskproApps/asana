import { baseRequest } from "./baseRequest";
import { PROJECT_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Workspace } from "./types";

const getProjectsService = (client: IDeskproClient, workspaceId: Workspace["gid"]) => {
  return baseRequest(client, {
    url: "/projects",
    queryParams: {
      limit: "100",
      workspace: workspaceId,
      opt_fields: PROJECT_FIELDS.join(","),
    },
  });
};

export { getProjectsService };
