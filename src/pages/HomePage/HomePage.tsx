import { useState } from "react";
import get from "lodash/get";
import noop from "lodash/noop";
import size from "lodash/size";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import type { FC } from "react";
import type { TicketContext } from "../../types";
import type { Task } from "../../services/asana/types";

const HomePage: FC = () => {
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const ticketId = get(context, ["data", "ticket", "id"]);

  const [entityIds, setEntityIds] = useState<Array<Task["gid"]>>([]);

  useInitialisedDeskproAppClient((client) => {
    if (!ticketId) {
      return;
    }

    getEntityListService(client, ticketId)
      .then((entities) => {
        if (Array.isArray(entities) && size(entities)) {
          setEntityIds(entities);
        }
      })
      .catch(noop);
  }, [ticketId]);

  return (
    <>{entityIds.join(", ")}</>
  );
};

export { HomePage };
