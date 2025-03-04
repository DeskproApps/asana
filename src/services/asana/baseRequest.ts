import has from "lodash/has";
import isEmpty from "lodash/isEmpty";
import { proxyFetch, adminGenericProxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, logInTypes, placeholders } from "../../constants";
import { getQueryParams } from "../../utils";
import { AsanaError } from "./AsanaError";
import type { Request } from "../../types";

const baseRequest: Request = async (client, {
  url,
  rawUrl,
  data = {},
  method = "GET",
  queryParams = {},
  settings = {},
  headers: customHeaders,
}) => {
  const dpFetch = await (has(settings, ["access_token"]) ? adminGenericProxyFetch : proxyFetch)(client);

  const baseUrl = rawUrl ? rawUrl : `${BASE_URL}${url}`;
  const params = getQueryParams(queryParams);
  const logInTypeState = settings?.use_access_token ? logInTypes.ACCESS_TOKEN : logInTypes.OAUTH2;
  let token;

  if (logInTypeState === logInTypes.ACCESS_TOKEN) {
    token = settings?.access_token || placeholders.ACCESS_TOKEN;
  } else {
    token =  placeholders.OAUTH2_TOKEN;
  };

  const requestUrl = `${baseUrl}${params}`;
  const options: RequestInit = {
    method,
    headers: {
      "Authorization": `Bearer ${token}`,
      ...customHeaders,
    },
  };

  if (data instanceof FormData) {
    options.body = data;
  } else if (!isEmpty(data)) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  }

  const res = await dpFetch(requestUrl, options);

  if (res.status < 200 || res.status > 399) {
    throw new AsanaError({
      status: res.status,
      data: await res.json(),
    });
  }

  try {
    return await res.json();
  } catch (e) {
    return {};
  }
};

export { baseRequest };
