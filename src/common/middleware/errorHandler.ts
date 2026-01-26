import * as express from "express";
import { ApiError } from "../definitions/error.js";
import { logger } from "../services/logger.js";

export function errorHandler(
  err: Error,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  logger.error(err);

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json(err.response);
  }

  res.status(500);
  res.send({ message: "Internal server error." });
}
