import { useCallback, useMemo } from "react";
import get from "lodash/get";
import noop from "lodash/noop";
import isEmpty from "lodash/isEmpty";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import {
  getTagsService,
  createTagService,
  addTagToTaskService,
  removeTagFromTaskService,
} from "../services/asana";
import { getDeskproTag } from "../utils";
import { DESKPRO_TAG } from "../constants";
import type { TicketContext } from "../types";
import type { Task, Tag } from "../services/asana/types";

type UseDeskproTag = () => {
  addDeskproTag: (task: Task) => Promise<void|{ data: { tag: Tag["gid"] } }>,
  removeDeskproTag: (task: Task) => Promise<void|{ data: { tag: Tag["gid"] } }>,
};

const useDeskproTag: UseDeskproTag = () => {
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };

  const isAddDeskproTag = useMemo(() => {
    return get(context, ["settings", "add_deskpro_tag"]) === true
  }, [context]);

  const addDeskproTag = useCallback((task: Task) => {
    if (!client || !isAddDeskproTag || isEmpty(task)) {
      return Promise.resolve();
    }

    return getTagsService(client, task.workspace.gid)
      .then<{ data: Tag }>(({ data: tags }) => {
        const deskproTag = getDeskproTag(tags);

        return deskproTag
          ? Promise.resolve({ data: deskproTag })
          : createTagService(client, task.workspace.gid, DESKPRO_TAG as Tag)
      })
      .then<void|{ data: { tag: Tag["gid"] } }>((data) => {
        const tagId = get(data, ["data", "gid"]);
        return tagId ? addTagToTaskService(client, task.gid, tagId) : Promise.resolve();
      })
      .catch(noop);
  }, [client, isAddDeskproTag]);

  const removeDeskproTag = useCallback((task: Task) => {
    if (!client || !isAddDeskproTag) {
      return Promise.resolve();
    }

    const deskproTag = getDeskproTag(get(task, ["tags"]));

    return (deskproTag
      ? removeTagFromTaskService(client, task.gid, deskproTag.gid)
      : Promise.resolve()
    ).catch(noop)
  }, [client, isAddDeskproTag]);

  return { addDeskproTag, removeDeskproTag };
};

export { useDeskproTag };
