import find from "lodash/find";
import { DESKPRO_TAG } from "../constants";
import type { Tag } from "../services/asana/types";

const getDeskproTag = (tags: Tag[]): Tag|void => {
  if (!Array.isArray(tags)) {
    return;
  }

  return find(tags, { name: DESKPRO_TAG.name });
};

export { getDeskproTag };
