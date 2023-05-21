import { baseRequest } from "./baseRequest";
import { WORKSPACE_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Workspace } from "./types";

const getWorkspacesService = (client: IDeskproClient) => {
  return baseRequest<Workspace[]>(client, {
    url: "/workspaces",
    queryParams: {
      limit: "100",
      opt_fields: WORKSPACE_FIELDS.join(","),
    },
  });
};

export { getWorkspacesService };
