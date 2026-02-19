import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/authentication.middleware.js";

export const nextDemoApiRouter = Router();

nextDemoApiRouter.get("/", (_req, res) => {
  res.json("Welcome to express app:nextDemo:api.");
});

nextDemoApiRouter.get("/test-auth/", isAuthenticated, (_req, res) => {
  res.json({
    message: "Test protected endpoint.",
    user: res.locals.user,
  });
});
