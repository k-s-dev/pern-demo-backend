import * as express from "express";
import { logger } from "../logger/service.js";
import { ApiError } from "./definitions.js";

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
