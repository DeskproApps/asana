import get from "lodash/get";
import size from "lodash/size";
import { useNavigate } from "react-router-dom";
import {
  useDeskproLatestAppContext,
  useInitialisedDeskproAppClient,
} from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { getCurrentUserService } from "../../services/asana";
import { useAsyncError } from "../../hooks";
import type { TicketContext } from "../../types";

type UseCheckIsAuth = () => void;

const useCheckIsAuth: UseCheckIsAuth = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { asyncErrorHandler } = useAsyncError();

  const ticketId = get(context, ["data", "ticket", "id"]);

  useInitialisedDeskproAppClient((client) => {
    if (!ticketId) {
      return;
    }

    getCurrentUserService(client)
      .then(() => getEntityListService(client, ticketId))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/link"))
      .catch(asyncErrorHandler);
  }, [navigate, ticketId]);
};

export { useCheckIsAuth };
