import { apiRouter } from "@/modules/api/routes.js";
import { Router } from "express";
import {
  ApiAuthenticationError,
  ApiValidationError,
} from "./definitions/error.js";

export const appRouter = Router();

// check app route
appRouter.get("/", (_req, res) => {
  res.json("Welcome to express app.");
});

// check error handler route
appRouter.get("/error", () => {
  throw new ApiValidationError({ path: "/error", log: { data: { id: 1 } } });
});

// check api route
appRouter.use("/api", apiRouter);
