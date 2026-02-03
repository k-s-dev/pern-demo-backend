import { Router } from "express";
import { nextDemoApiRouter } from "../api/lib/routes.js";

export const nextDemoRouter = Router();

// check app route
nextDemoRouter.get("/", (_req, res) => {
  res.json("Welcome to express app:nextDemo.");
});

nextDemoRouter.use("/api", nextDemoApiRouter);
