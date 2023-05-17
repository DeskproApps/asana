import { LoadingSpinner } from "@deskpro/app-sdk";
import { useCheckIsAuth } from "./hooks";
import type { FC } from "react";

const LoadingAppPage: FC = () => {
  useCheckIsAuth();

  return (
    <LoadingSpinner/>
  );
};

export { LoadingAppPage };
