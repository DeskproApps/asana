import type { AsanaAPIError } from "./types";

export type InitData = {
  status: number,
  data: AsanaAPIError,
};

class AsanaError extends Error {
  status: number;
  data: AsanaAPIError;

  constructor({ status, data }: InitData) {
    const message = "Asana Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { AsanaError };
