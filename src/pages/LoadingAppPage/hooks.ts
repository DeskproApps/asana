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
import type { Settings, TicketData } from '../../types';
import { IS_USING_OAUTH2 } from "../../constants";

type UseCheckIsAuth = () => void;

const useCheckIsAuth: UseCheckIsAuth = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext<TicketData, Settings>();
  const { asyncErrorHandler } = useAsyncError();

  const ticketId = get(context, ["data", "ticket", "id"]);

  useInitialisedDeskproAppClient(async client => {
    if (!ticketId) {
      return;
    }

    const isUsingOAuth = context?.settings.use_access_token === false || context?.settings.use_advanced_connect === false;

    await client.setUserState(IS_USING_OAUTH2, isUsingOAuth);

    getCurrentUserService(client)
      .then(() => getEntityListService(client, ticketId))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/link"))
      .catch(error => {
        asyncErrorHandler(error);

        navigate('/log_in');
      });
  }, [navigate, ticketId]);
};

export { useCheckIsAuth };
