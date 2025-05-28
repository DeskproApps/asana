import { get } from "lodash";
import { Stack } from "@deskpro/deskpro-ui";
import { AsanaError } from "../../services/asana";
import { DEFAULT_ERROR } from "../../constants";
import { ErrorBlock } from "./ErrorBlock";
import { Container } from "../common";
import { FallbackRender } from "@sentry/react";

const ErrorFallback: FallbackRender = ({ error }) => {
  let message = DEFAULT_ERROR;
  let consoleMessage;

  if (error instanceof AsanaError) {
    message = get(error, ["data", "errors", 0, "message"]) || DEFAULT_ERROR;
  }

  // eslint-disable-next-line no-console
  console.error(consoleMessage || error);

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
