import { Router } from "express";
import { nextDemoRouter } from "../modules/nextDemo/lib/routes.js";

export const appRouter = Router();

appRouter.get("/", (_req, res) => {
  res.json("Welcome to express app.");
});

appRouter.use("/next-demo", nextDemoRouter);
