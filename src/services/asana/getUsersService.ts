import { baseRequest } from "./baseRequest";
import { MEMBER_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Member, Workspace } from "./types";

const getUsersService = (
  client: IDeskproClient,
  workspaceId: Workspace["gid"],
) => {
  return baseRequest<Member[]>(client, {
    url: "/users",
    queryParams: {
      limit: "100",
      workspace: workspaceId,
      opt_fields: MEMBER_FIELDS.join(","),
    },
  });
};

export { getUsersService };
