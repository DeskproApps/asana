import { LoadingSpinner } from "@deskpro/app-sdk";
import { Button } from "@deskpro/deskpro-ui";
// import { useCheckIsAuth } from "./hooks";
import { useEffect, useState, type FC } from "react";

const LoadingAppPage: FC = () => {
  // useCheckIsAuth();
  const [errorState, setErrorState] = useState<string | null>(null)

  useEffect(() => {
    if (errorState === "left") {
      throw new Error("Hello from Asana")
    }

    if (errorState === "right") {
      throw "HI from Asana"
    }
  }, [errorState])

  return (
    <>
      <Button
        text="Left Error"
        onClick={() => { setErrorState("left") }}
      />
      <Button
        text="Right Error"
        onClick={() => { setErrorState("right") }}
      />
      <LoadingSpinner />
    </>
  );
};

export { LoadingAppPage };
