import { Router } from "express";

export const apiRouter = Router();

apiRouter.get("/", async (_req, res) => {
  res.json("Welcome to express app: API.");
});



