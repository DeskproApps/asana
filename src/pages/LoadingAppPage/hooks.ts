import { useNavigate } from "react-router-dom";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";

type UseCheckIsAuth = () => void;

const useCheckIsAuth: UseCheckIsAuth = () => {
  const navigate = useNavigate();

  useInitialisedDeskproAppClient(() => {
    // ...
  }, [navigate]);
};

export { useCheckIsAuth };
