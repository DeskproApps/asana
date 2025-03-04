import { useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { P1, TSpan, Stack } from "@deskpro/deskpro-ui";
import { useDeskproAppEvents, useDeskproAppClient } from "@deskpro/app-sdk";
import { nbsp } from "../../constants";
import { getCurrentUserService } from "../../services/asana";
import { Button } from "../../components/common";
import type { FC } from "react";
import type { Settings } from "../../types";
import type { Member } from "../../services/asana/types";

const Invalid = styled(TSpan)`
  color: ${({ theme }) => theme.colors.red100};
`;

const Valid = styled.span`
  color: ${({ theme }) => theme.colors.grey100};
`;

const VerifySettings: FC = () => {
  const { client } = useDeskproAppClient();

  const [currentUser, setCurrentUser] = useState<Member|null>(null);
  const [settings, setSettings] = useState<Settings>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const errorMessage = useMemo(() => "Failed to connect to Asana, settings seem to be invalid", []);

  const onVerifySettings = useCallback(() => {
    if (!client || !settings.use_access_token || !settings.access_token) {
      return;
    }

    setIsLoading(true);
    setError("");
    setCurrentUser(null);

    return getCurrentUserService(client, settings)
      .then(({ data }) => setCurrentUser(data))
      .catch(() => setError(errorMessage))
      .finally(() => setIsLoading(false));
  }, [client, settings, errorMessage]);

  useDeskproAppEvents({
    onAdminSettingsChange: setSettings,
  }, [client]);

  return (
    <Stack align="baseline">
      <Button
        text="Verify Settings"
        intent="secondary"
        onClick={onVerifySettings}
        loading={isLoading}
        disabled={!settings.access_token?.length || isLoading}
      />
      {nbsp}
      {currentUser
        ? <P1>Verified as <Valid>{`<${currentUser?.email}>`}</Valid></P1>
        : error ? <Invalid type="p1">{error}</Invalid> : ''
      }
    </Stack>
  );
};

export { VerifySettings };
