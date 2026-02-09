import { fromNodeHeaders } from "better-auth/node";
import { nextDemoAuth } from "./auth.js";
import { ApiAuthenticationError } from "#/src/lib/error/definitions.js";
import type { NextFunction, Request, Response } from "express";
import type { TSessionUser } from "../definitions/auth/generic.js";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = await nextDemoAuth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    throw new ApiAuthenticationError({
      path: req.path,
    });
  }

  res.locals.session = session.session;
  res.locals.user = session.user as TSessionUser;

  next();
}
