import { fromNodeHeaders } from "better-auth/node";
import { ApiAuthenticationError } from "#/src/lib/error/definitions.js";
import type { NextFunction, Request, Response } from "express";
import type { TSessionUser } from "../definitions/auth/user.js";
import { pernDemoAuth } from "../auth/auth.js";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const sessionData = await pernDemoAuth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!sessionData) {
    throw new ApiAuthenticationError({
      path: req.path,
    });
  }

  res.locals.session = sessionData.session;
  res.locals.user = sessionData.user as TSessionUser;

  next();
}
