import { useState } from "react";
import { P5 } from "@deskpro/deskpro-ui";
import { useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { getEntityAssociationCountService } from "../../../services/deskpro";
import type { FC } from "react";

type Props = { entityId: string };

const DeskproTickets: FC<Props> = ({ entityId }) => {
  const [ticketCount, setTicketCount] = useState<number>(0);

  useInitialisedDeskproAppClient((client) => {
    getEntityAssociationCountService(client, `${entityId}`).then(setTicketCount);
  });

  return <P5>{ticketCount}</P5>;
};

export { DeskproTickets };
