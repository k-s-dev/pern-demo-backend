import { Router } from "express";
import { ApiValidationError } from "./error/definitions.js";
import { nextDemoRouter } from "../modules/nextDemo/lib/routes.js";

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
appRouter.use("/next-demo", nextDemoRouter);
