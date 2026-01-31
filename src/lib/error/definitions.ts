import { HttpStatus, httpStatusTextByCode } from "http-status-ts";

/**
 * Custom error for api errors.
 *
 * @param message - public message for use in frontend
 * @param status - HttpStatus enum for use in error handling
 * @param path - request path
 * @param log - object with details for server logging
 * @returns custom Error object
 *
 * @example
 * ```
 * TODO: Write me later.
 * ```
 */
export class ApiError extends Error {
  success: boolean;
  path: string;
  statusCode: HttpStatus;
  errors?: object | string[];
  log?: IErrorLog;

  constructor(args: IApiErrorArgs) {
    super(args.message, args.options);
    this.name = this.constructor.name;
    this.success = false;
    this.path = args.path;
    this.statusCode = args.statusCode;
    this.errors = args.errors || {};
    this.log = {
      message: args.log?.message || args.message,
      data: JSON.stringify(args.log?.data),
    };
  }

  get response() {
    return {
      success: this.success,
      statusCode: this.statusCode,
      message: this.message,
      errors: this.errors,
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
  message?: string;
  data?: object | string;
}

export interface IApiErrorArgs {
  path: string;
  message: string;
  statusCode: HttpStatus;
  errors?: object | string[];
  log?: IErrorLog;
  options?: ErrorOptions;
}

export interface IApiErrorOptionalArgs {
  path: string;
  message?: string;
  statusCode?: HttpStatus;
  errors?: object | string[];
  log?: IErrorLog;
  options?: ErrorOptions;
}
