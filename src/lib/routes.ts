import { Router } from "express";
import { pernDemoRouter } from "../modules/pernDemo/lib/routes.js";

export const appRouter = Router();

appRouter.get("/", (_req, res) => {
  res.json("Welcome to express app.");
});

appRouter.use("/pern-demo", pernDemoRouter);
