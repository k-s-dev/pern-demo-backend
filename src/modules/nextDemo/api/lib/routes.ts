import { Router } from "express";

export const nextDemoApiRouter = Router();

nextDemoApiRouter.get("/", (_req, res) => {
  res.json("Welcome to express app:nextDemo:api.");
});
