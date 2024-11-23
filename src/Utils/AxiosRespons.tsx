import { AxiosResponse } from "axios";

export const OnSuccess = (type: string, response: AxiosResponse) => {
  console.info(type);
  return response;
};

export const OnError = (type: string, error: AxiosResponse) => {
  console.error(type, error);
  return error;
};

export const SortResponse = (response: AxiosResponse) => {
  switch (response.status) {
    case 200:
      OnSuccess("Success", response);
      return response;
    case 201:
      OnSuccess("Created", response);
      return response;
    case 400:
      OnError("Bad request", response);
      return response;
    case 403:
      OnError("Forbidden", response);
      return response;
    case 404:
      OnError("Not Found", response);
      return response;
    case 405:
      OnError("Method not allowd", response);
      return response;
    case 415:
      OnError("Unsupported Media Type", response);
      return response;
    case 500:
      OnError("Internal server error", response);
      return response;
    default:
      OnError("Unknown error", response);
      return response;
  }
};
