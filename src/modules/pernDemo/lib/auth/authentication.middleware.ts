import { fromNodeHeaders } from "better-auth/node";
import { pernDemoAuth } from "./auth.js";
import { ApiAuthenticationError } from "#/src/lib/error/definitions.js";
import type { NextFunction, Request, Response } from "express";
import type { TSessionUser } from "../definitions/auth/user.js";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = await pernDemoAuth.api.getSession({
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
