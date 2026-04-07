import { Router } from "express";
import { pernDemoApiV1Router } from "../api/v1/routes.js";

// path: "/pernDemo"
export const pernDemoRouter = Router();

pernDemoRouter.get("/", (_req, res) => {
  res.json("Welcome to express app:pernDemo.");
});

pernDemoRouter.use("/api/v1", pernDemoApiV1Router);
