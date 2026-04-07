import { Router } from "express";
import { orgRouter } from "./org/routes.js";
import { isAuthenticated } from "../../lib/middleware/auth.js";

// path: "/pernDemo/api/v1"
export const pernDemoApiV1Router = Router({ mergeParams: true });

pernDemoApiV1Router.get("/", (_req, res) => {
  res.json("Welcome to express app:pernDemo:api:v1.");
});

pernDemoApiV1Router.use("/org", orgRouter);

pernDemoApiV1Router.get("/test-auth/", isAuthenticated, (_req, res) => {
  res.json({
    message: "Test protected endpoint.",
    user: res.locals.user,
  });
});
