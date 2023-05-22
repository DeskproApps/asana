import { useNavigate } from "react-router-dom";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { getCurrentUserService } from "../../services/asana";
import { useAsyncError } from "../../hooks";

type UseCheckIsAuth = () => void;

const useCheckIsAuth: UseCheckIsAuth = () => {
  const navigate = useNavigate();
  const { asyncErrorHandler } = useAsyncError();

  useInitialisedDeskproAppClient((client) => {
    getCurrentUserService(client)
      .then(() => navigate("/link"))
      .catch(asyncErrorHandler);
  }, [navigate]);
};

export { useCheckIsAuth };
