import { createElement } from "react";
import get from "lodash/get";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { QueryKey } from "../../query";
import {
  getTagsService,
  getUsersService,
  getProjectsService,
  getWorkspacesService,
} from "../../services/asana";
import { getOption } from "../../utils";
import { Tag, Member } from "../common";
import type { Option } from "../../types";
import type {
  Project,
  Workspace,
  Tag as TagType,
  Member as MemberType,
} from "../../services/asana/types";

export type Result = {
  isLoading: boolean,
  workspaceOptions: Array<Option<Workspace["gid"]>>,
  projectOptions: Array<Option<Project["gid"]>>,
  userOptions: Array<Option<MemberType["gid"]>>,
  tagOptions: Array<Option<TagType["gid"]>>,
};

const useFormDeps = (workspaceId?: Workspace["gid"]): Result => {
  const workspaces = useQueryWithClient(
    [QueryKey.WORKSPACES],
    (client) => getWorkspacesService(client),
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore // need to fix typing in the @deskpro/app-sdk
      select: (data) => {
        return (get(data, ["data"], []) || []).map((workspace) => getOption(workspace.gid, workspace.name));
      },
    }
  );

  const projects = useQueryWithClient(
    [QueryKey.PROJECTS, workspaceId as Workspace["gid"]],
    (client) => getProjectsService(client, workspaceId as Workspace["gid"]),
    {
      enabled: Boolean(workspaceId),
      useErrorBoundary: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore // need to fix typing in the @deskpro/app-sdk
      select: (data) => {
        return (get(data, ["data"], []) || []).map((project) => getOption(project.gid, project.name));
      },
    },
  );

  const users = useQueryWithClient(
    [QueryKey.USERS, workspaceId as Workspace["gid"]],
    (client) => getUsersService(client, workspaceId as Workspace["gid"]),
    {
      enabled: Boolean(workspaceId),
      useErrorBoundary: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore // need to fix typing in the @deskpro/app-sdk
      select: (data) => {
        return (get(data, ["data"], []) || []).map((member) => {
          const label = createElement(Member, {
            name: get(member, ["name"], ""),
            avatarUrl: get(member, ["photo", "image_60x60"], ""),
          });

          return getOption(member.gid, label, get(member, ["name"], ""));
        })
      },
    }
  );

  const tags = useQueryWithClient(
    [QueryKey.TAGS, workspaceId as Workspace["gid"]],
    (client) => getTagsService(client, workspaceId as Workspace["gid"]),
    {
      enabled: Boolean(workspaceId),
      useErrorBoundary: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore // need to fix typing in the @deskpro/app-sdk
      select: (data) => {
        return (get(data, ["data"], []) || []).map(({ gid, name, color }: TagType) => {
          return getOption(gid, createElement(Tag, { name, color, key: gid }), name);
        });
      },
    }
  );

  return {
    isLoading: [workspaces].every(({ isLoading }) => isLoading),
    workspaceOptions: (get(workspaces, ["data"], []) || []) as Array<Option<Workspace["gid"]>>,
    projectOptions: (get(projects, ["data"], []) || []) as Array<Option<Project["gid"]>>,
    userOptions: (get(users, ["data"], []) || []) as Array<Option<MemberType["gid"]>>,
    tagOptions: (get(tags, ["data"], []) || []) as Array<Option<TagType["gid"]>>,
  };
};

export { useFormDeps };
