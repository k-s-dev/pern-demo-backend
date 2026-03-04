import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/authentication.middleware.js";

export const pernDemoApiRouter = Router();

pernDemoApiRouter.get("/", (_req, res) => {
  res.json("Welcome to express app:pernDemo:api.");
});

pernDemoApiRouter.get("/test-auth/", isAuthenticated, (_req, res) => {
  res.json({
    message: "Test protected endpoint.",
    user: res.locals.user,
  });
});
