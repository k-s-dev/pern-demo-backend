import * as express from "express";

export function errorHandler(
  err: Error,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.send({ error: err, message: "Internal server error." });
}
