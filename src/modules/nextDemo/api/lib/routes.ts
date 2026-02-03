import { ApiValidationError } from "@/lib/error/definitions.js";
import { Router } from "express";

export const nextDemoApiRouter = Router();

// check app route
nextDemoApiRouter.get("/", (_req, res) => {
  res.json("Welcome to express app:nextDemo:api.");
});

// check error handler route
nextDemoApiRouter.get("/error", () => {
  throw new ApiValidationError({ path: "/error", log: { data: { id: 1 } } });
});

