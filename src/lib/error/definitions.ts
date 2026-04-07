import { HttpStatus, httpStatusTextByCode } from "http-status-ts";

/**
 * Custom error for api errors.
 *
 * @param message - public message for use in frontend, summary of output
 * @param status - HttpStatus enum for use in error handling
 * @param path - request path
 * @param messages - public message for use in frontend, specific errors encountered
 * @param log - object with details for server logging
 * @returns custom Error object
 *
 * @example
 * ```
 * TODO: Write me later.
 * ```
 */
export class ApiError extends Error {
  statusCode: HttpStatus;
  path?: string;
  messages?: object | string[];
  log?: IErrorLog;

  constructor(args: IApiErrorArgs) {
    super(args.message, args.options);
    this.name = this.constructor.name;
    this.statusCode = args.statusCode;
    if (args.path) this.path = args.path;
    this.messages = args.messages || [];
    this.log = {
      messages: args.log?.messages || args.messages || [],
      data: JSON.stringify(args.log?.data),
    };
  }

  get response() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      messages: this.messages,
    };
  }
}

export class ApiAuthenticationError extends ApiError {
  constructor(args: IApiErrorOptionalArgs) {
    super({
      ...args,
      statusCode: args.statusCode || HttpStatus.UNAUTHORIZED,
      message: args.message || httpStatusTextByCode(HttpStatus.UNAUTHORIZED),
    });
  }
}

export class ApiAuthorizationError extends ApiError {
  constructor(args: IApiErrorOptionalArgs) {
    super({
      ...args,
      statusCode: args.statusCode || HttpStatus.FORBIDDEN,
      message: args.message || httpStatusTextByCode(HttpStatus.FORBIDDEN),
    });
  }
}

export class ApiValidationError extends ApiError {
  constructor(args: IApiErrorOptionalArgs) {
    super({
      ...args,
      statusCode: args.statusCode || HttpStatus.BAD_REQUEST,
      message: args.message || httpStatusTextByCode(HttpStatus.BAD_REQUEST),
    });
  }
}

export class ApiDbError extends ApiError {
  constructor(args: IApiErrorOptionalArgs) {
    super({
      ...args,
      statusCode: args.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      message:
        args.message || httpStatusTextByCode(HttpStatus.INTERNAL_SERVER_ERROR),
    });
  }
}

export class NotFoundError extends ApiError {
  constructor(args: IApiErrorOptionalArgs) {
    super({
      ...args,
      statusCode: args.statusCode || HttpStatus.NOT_FOUND,
      message: args.message || httpStatusTextByCode(HttpStatus.NOT_FOUND),
    });
  }
}

export interface IErrorLog {
  messages?: object | string[];
  data?: object | string;
}

export interface IApiErrorArgs {
  message: string;
  statusCode: HttpStatus;
  path?: string;
  messages?: object | string[];
  log?: IErrorLog;
  options?: ErrorOptions;
}

export interface IApiErrorOptionalArgs {
  path?: string;
  message?: string;
  messages?: object | string[];
  statusCode?: HttpStatus;
  errors?: object | string[];
  log?: IErrorLog;
  options?: ErrorOptions;
}
