import { baseRequest } from "./baseRequest";
import { MEMBER_FIELDS } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Maybe, Settings } from "../../types";
import type { Member } from "./types";

const params = {
  url: "/users/me",
  queryParams: { opt_fields: MEMBER_FIELDS.join(",") }
};

const getCurrentUserService = (
  client: IDeskproClient,
  settings?: Maybe<Settings>,
) => {
  return baseRequest<Member>(client, { ...params, settings });
};

export { getCurrentUserService };
