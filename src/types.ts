import type { To, ParamKeyValuePair } from "react-router-dom";
import type { DropdownValueType, } from "@deskpro/deskpro-ui";
import type { Context, IDeskproClient } from "@deskpro/app-sdk";
import type { Task, Project, Workspace } from "./services/asana/types";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

/** An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateAt = string;

/** The date, in the format "yyyy-mm-dd" */
export type DateOn = string;

/** Request types */
export type ApiRequestMethod = "GET" | "POST" | "PUT";

export type RequestParams = {
  url?: string,
  rawUrl?: string,
  method?: ApiRequestMethod,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  headers?: Dict<string>,
  queryParams?: string | Dict<string> | ParamKeyValuePair[],
  settings?: Maybe<Settings>,
};

export type NextPage = {
  offset: string,
  path: string,
  uri: string
}
export type Request = <T>(
  client: IDeskproClient,
  params: RequestParams,
) => Promise<{ data: T, next_page?: null | NextPage }>;

/** Deskpro types */
export type Settings = {
  use_advanced_connect?: boolean,
  use_access_token?: boolean,
  access_token?: string,
  client_id?: string,
  add_comment_when_linking?: boolean,
};

export type TicketData = {
  ticket: {
    id: string,
    subject: string,
    permalinkUrl: string,
  },
};

export type TicketContext = Context<TicketData, Maybe<Settings>>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type EventPayload =
  | NavigateToChangePage
  | { type: "unlink", task: Task }
  | { type: 'logOut' }
  ;

export type EntityMetadata = {
  id: Task["gid"],
  name: Task["name"],
  workspace: Workspace["name"],
  projects: Project["name"],
};

/** Entities */
