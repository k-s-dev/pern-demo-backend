import { HttpStatus, httpStatusTextByCode } from "http-status-ts";
import { ApiError } from "../error/definitions.js";

type TApiResponseWithData<GData> = GData & {
  messages?: string[];
  error?: never;
};

type TApiResponseWithError = {
  data?: never;
  messages?: never;
  error: ApiError;
};

export type TApiResponse<GData = unknown> =
  | TApiResponseWithData<GData>
  | TApiResponseWithError;

export type TApiResponsePromise<GData = unknown> = Promise<TApiResponse<GData>>;

export function prepareApiResponse<GData>(
  data?: GData | null,
  error?: ApiError,
) {
  if (error) {
    return { error };
  }
  if (data) {
    return data;
  }

  return {
    error: new ApiError({
      message: httpStatusTextByCode(HttpStatus.INTERNAL_SERVER_ERROR),
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    }),
  };
}
