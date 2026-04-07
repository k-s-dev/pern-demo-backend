import * as express from "express";
import { logger } from "../logger/service.js";
import { ApiError } from "./definitions.js";
import { Prisma } from "#/src/modules/pernDemo/lib/definitions/prisma/client.js";
import { HttpStatus } from "http-status-ts";
import { prepareApiResponse } from "../utils/response.js";

export function errorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  logger.error(err);

  // Default to a 500 Internal Server Error
  let statusCode = 500;
  let message = err.message ? err.message : "Internal server error.";

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    err.path = req.path;
    return res.status(err.statusCode).json(prepareApiResponse(null, err));
  }

  // Handle specific Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": // Unique constraint failed
        statusCode = HttpStatus.CONFLICT;
        message =
          // @ts-expect-error err.meta may be undefined
          `Duplicate field value: ${err.meta.driverAdapterError.cause.originalMessage || ""}`;
        break;
      case "P2014": // Invalid ID
        statusCode = HttpStatus.BAD_REQUEST;
        message =
          // @ts-expect-error err.meta may be undefined
          `Invalid ID: ${err.meta.driverAdapterError.cause.originalMessage}`;
        break;
      case "P2025": // Record not found
        statusCode = HttpStatus.NOT_FOUND;
        message = "Record not found.";
        break;
      // Add other cases as needed (see Prisma docs for full list)
    }
  }

  const error = new ApiError({ statusCode, message });

  res.status(statusCode);
  res.json(prepareApiResponse(null, error));
}
