import { apiRouter } from "@/modules/api/routes.js";
import { Router } from "express";

export const appRouter = Router();

// check app route
appRouter.get("/", (_req, res) => {
  res.json("Welcome to express app.");
});

// check api route
appRouter.use("/api", apiRouter);
