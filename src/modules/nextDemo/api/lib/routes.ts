import { ApiValidationError } from "@/lib/error/definitions.js";
import { Router } from "express";
import { nextDemoAuth } from "../../lib/auth/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { isAuthenticated } from "../../lib/auth/authentication.middleware.js";

export const nextDemoApiRouter = Router();

// check app route
nextDemoApiRouter.get("/", (_req, res) => {
  res.json("Welcome to express app:nextDemo:api.");
});

// check error handler route
nextDemoApiRouter.get("/error", () => {
  throw new ApiValidationError({ path: "/error", log: { data: { id: 1 } } });
});

// check auth session route
nextDemoApiRouter.get("/me", async (req, res) => {
  const session = await nextDemoAuth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(session);
});

// check authenticated middleware
nextDemoApiRouter.get(
  "/is-authenticated",
  isAuthenticated,
  async (_req, res) => {
    res.json({
      authenticated: true,
      session: res.locals.session,
      user: res.locals.user,
    });
  },
);
