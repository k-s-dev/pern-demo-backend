import { Router } from "express";
import { nextDemoApiRouter } from "../nextDemo/lib/routes.js";

export const apiRouter = Router();

apiRouter.get("/", async (_req, res) => {
  res.json("Welcome to express app: API.");
});

apiRouter.use("/next-demo", nextDemoApiRouter);
