import { ENTITY } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Task } from "../asana/types";
import type { TicketData, EntityMetadata } from "../../types";

const setEntityService = (
    client: IDeskproClient,
    ticketId: TicketData["ticket"]["id"],
    entity: Task["gid"],
    metaData?: EntityMetadata,
) => {
    return client
        .getEntityAssociation(ENTITY, ticketId)
        .set(entity, metaData);
};

export { setEntityService };
