import { AxiosError } from "axios";

const extractResponseMessage = (error: AxiosError<{ message: string }>) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message;
};

export const getResponseError = (error: unknown) => {
  const message = extractResponseMessage(
    error as AxiosError<{ message: string }>
  );

  return message;
};
