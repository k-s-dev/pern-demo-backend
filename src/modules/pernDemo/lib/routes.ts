import { Router } from "express";
import { pernDemoApiRouter } from "../api/lib/routes.js";

export const pernDemoRouter = Router();

pernDemoRouter.get("/", (_req, res) => {
  res.json("Welcome to express app:pernDemo.");
});

pernDemoRouter.use("/api", pernDemoApiRouter);
