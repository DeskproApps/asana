import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Maybe, Settings } from "../../types";
import type { Me } from "./types";

const params = {
  url: "/users/me",
  queryParams: { opt_fields: ["email", "name", "photo"].join(",") }
};

const getCurrentUserService = (
  client: IDeskproClient,
  settings?: Maybe<Settings>,
) => {
  return baseRequest<Me>(client, { ...params, settings });
};

export { getCurrentUserService };
